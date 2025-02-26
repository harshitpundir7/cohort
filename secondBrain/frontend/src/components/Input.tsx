import React, { useState, useEffect } from 'react';

interface InputProps {
  onContentAdded?: () => void;
}

interface YouTubeData {
  title: string;
  thumbnail: string;
  likes: string;
}

interface TweetData {
  text: string;
  media: string;
  likes: number;
}

function Input({ onContentAdded }: InputProps) {
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('todo'); // Default to todo instead of youtube
  const [preview, setPreview] = useState<YouTubeData | TweetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL ='http://localhost:3000';

  const tags = [
    { id: 'youtube', label: 'YouTube', requiresLink: true },
    { id: 'tweet', label: 'Tweet', requiresLink: true },
    { id: 'important', label: 'Important', requiresLink: false },
    { id: 'movie', label: 'Movie', requiresLink: false },
    { id: 'todo', label: 'Todo', requiresLink: false },
    { id: 'otherLink', label: 'Other Link', requiresLink: true },
    { id: 'entertainment', label: 'Entertainment', requiresLink: false }
  ];

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const extractYouTubeId = (url: string) => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  useEffect(() => {
    const fetchPreview = async () => {
      const selectedTag = tags.find(t => t.id === tag);
      const isLinkRequired = selectedTag?.requiresLink;

      // Only fetch preview if the tag requires a link and content looks like a URL
      if (!isLinkRequired || !content || !isValidUrl(content)) {
        setPreview(null);
        setError('');
        return;
      }

      setLoading(true);
      setError('');

      try {
        if (tag === 'youtube') {
          const videoId = extractYouTubeId(content);
          if (videoId) {
            const response = await fetch(
              `${API_URL}/preview/youtube/${videoId}`,
              { credentials: 'include' }
            );
             
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setPreview(data);
          } else {
            setError('Invalid YouTube URL');
          }
        } else if (tag === 'tweet' && content.includes('twitter.com')) {
          const tweetId = content.split('/status/')[1]?.split('?')[0];
          if (tweetId) {
            const response = await fetch(
              `${API_URL}/preview/tweet/${tweetId}`,
              { credentials: 'include' }
            );
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setPreview(data);
          }
        }
      } catch (error) {
        console.error('Error fetching preview:', error);
        setError('Failed to fetch preview');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchPreview, 500);
    return () => clearTimeout(debounceTimer);
  }, [content, tag, API_URL]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const selectedTag = tags.find(t => t.id === tag);
    const isLinkRequired = selectedTag?.requiresLink;

    // Validate if URL is required but not provided
    if (isLinkRequired && !isValidUrl(content)) {
      setError('This tag requires a valid URL');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/content/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          content,
          tags: tag,
          preview: isLinkRequired ? preview : null // Only include preview for link posts
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setContent('');
      setPreview(null);
      setError('');
      if (onContentAdded) {
        onContentAdded();
      }
    } catch (error) {
      console.error('Error posting content:', error);
      setError('Failed to post content');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block mb-2">
            {tags.find(t => t.id === tag)?.requiresLink 
              ? 'Enter URL:' 
              : 'Enter Content:'}
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border rounded"
            rows={4}
            placeholder={tags.find(t => t.id === tag)?.requiresLink 
              ? 'Paste your link here...' 
              : 'Write your content here...'}
          />
        </div>

        <div className="space-y-2">
          <label className="block mb-2">Tag:</label>
          <div className="grid grid-cols-2 gap-2">
            {tags.map(({ id, label }) => (
              <div key={id} className="flex items-center">
                <input
                  type="radio"
                  id={id}
                  name="tag"
                  value={id}
                  checked={tag === id}
                  onChange={(e) => setTag(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-red-500 mt-2">{error}</div>
        )}

        {loading && (
          <div className="text-gray-500 mt-2">Loading preview...</div>
        )}

        {preview && (
          <div className="border rounded p-4 mt-4">
            <h3 className="font-bold mb-2">Preview:</h3>
            {'title' in preview ? (
              <div>
                <img src={preview.thumbnail} alt="Video thumbnail" className="w-full mb-2" />
                <h4 className="font-semibold">{preview.title}</h4>
                <p>Likes: {preview.likes}</p>
              </div>
            ) : (
              <div>
                <p>{preview.text}</p>
                {preview.media && <img src={preview.media} alt="Tweet media" className="w-full mt-2" />}
                <p className="mt-2">Likes: {preview.likes}</p>
              </div>
            )}
          </div>
        )}

        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Input;