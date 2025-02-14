import React, { useState } from "react";
import Edit from "./Edit";

interface CardProps {
  contentId: string;
  content: string;
  tags: string;
}

const Card: React.FC<CardProps> = ({ contentId, content, tags }) => {
  const [currentContent, setCurrentContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleContentUpdate = (updatedContent: string) => {
    setCurrentContent(updatedContent); // Update content without refresh
    setIsEditing(false); // Close modal after update
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200 w-full max-w-sm relative">
      <p className="text-lg font-semibold text-gray-800">{currentContent}</p>
      <span className="text-sm text-blue-500 font-medium mt-2 inline-block">
        #{tags}
      </span>

      {/* Edit Button */}
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-sm rounded"
      >
        Edit
      </button>

      {/* Show Edit Modal */}
      {isEditing && (
        <Edit
          contentId={contentId}
          content={currentContent}
          onContentUpdate={handleContentUpdate}
        />
      )}
    </div>
  );
};

export default Card;
