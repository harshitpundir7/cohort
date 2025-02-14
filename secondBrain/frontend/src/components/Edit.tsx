import React, { useState } from "react";
import axios from "axios";

interface EditProps {
  contentId: string;
  content: string;
  onContentUpdate: (updatedContent: string) => void;
}

const Edit: React.FC<EditProps> = ({ contentId, content, onContentUpdate }) => {
  const [newContent, setNewContent] = useState(content);

  const handleSave = async () => {
    try {
      const API_URL = `${import.meta.env.VITE_LOCAL_API_URL}/content/post/${contentId}`;
      await axios.put(
        API_URL,
        { content: newContent },
        { withCredentials: true }
      );

      onContentUpdate(newContent);
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Content</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => onContentUpdate(content)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
