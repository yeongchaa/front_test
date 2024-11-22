// 댓글 아이콘 + 텍스트

import React, { useState } from "react";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline"; // Heroicons의 댓글 아이콘

const CommentButton: React.FC = () => {
  const [comments, setComments] = useState(0); // 댓글 수 상태

  const handleComment = () => {
    setComments(comments + 1); // 댓글 수 증가
  };

  return (
    <div className="flex items-center space-x-2">
      {/* 댓글 아이콘 */}
      <button
        onClick={handleComment}
        className="focus:outline-none"
        aria-label="Comment"
      >
        <ChatBubbleOvalLeftIcon className="w-6 h-6 text-gray-500" />
      </button>

      {/* 댓글 수 */}
      <span className="text-sm text-gray-500">{comments}</span>
    </div>
  );
};

export default CommentButton;
