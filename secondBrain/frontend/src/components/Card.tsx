interface CardProps {
  contentId: string;
  content: string;
  tags: string;
  preview?: {
    title?: string;
    thumbnail?: string;
    likes?: string;
    text?: string;
    media?: string;
  } | null;
}

function Card({  content, tags, preview }: CardProps) {
  const isUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="w-full max-w-sm p-4 border rounded shadow-md bg-white">
      {/* For link posts with preview */}
      {preview && (
        <div>
          {'title' in preview ? (
            // YouTube preview
            <div>
              <img src={preview.thumbnail} alt={preview.title} className="w-full rounded mb-2" />
              <h3 className="font-semibold text-lg mb-1">{preview.title}</h3>
              <p className="text-gray-600 text-sm mb-2">Likes: {preview.likes}</p>
              <a href={content} className="text-blue-500 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                View on YouTube
              </a>
            </div>
          ) : (
            // Tweet preview
            <div>
              <p className="mb-2">{preview.text}</p>
              {preview.media && (
                <img src={preview.media} alt="Tweet media" className="w-full rounded mb-2" />
              )}
              <p className="text-gray-600 text-sm mb-2">Likes: {preview.likes}</p>
              <a href={content} className="text-blue-500 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                View Tweet
              </a>
            </div>
          )}
        </div>
      )}

      {/* For text-only posts */}
      {!preview && (
        <div>
          {isUrl(content) ? (
            <a href={content} className="text-blue-500 hover:underline break-words" target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          ) : (
            <p className="text-gray-700 break-words">{content}</p>
          )}
        </div>
      )}

      <div className="mt-3">
        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
          {tags}
        </span>
      </div>
    </div>
  );
}

export default Card;