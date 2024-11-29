// 좋아요 버튼
import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline"; // Heroicons의 Heart 아이콘

const LikeButton: React.FC = () => {
  const [likes, setLikes] = useState(0); // 좋아요 수 상태

  const handleLike = () => {
    setLikes(likes + 1); // 좋아요 수 증가
  };

  return (
    <div className="flex items-center space-x-2">
      {/* 좋아요 아이콘 */}
      <button
        onClick={handleLike}
        className="focus:outline-none"
        aria-label="Like"
      >
        <HeartIcon className="w-6 h-6 text-gray-500 hover:text-red-500 transition-colors" />
      </button>

      {/* 좋아요 수 */}
      <span className="text-sm text-gray-500">{likes}</span>
    </div>
  );
};

export default LikeButton;
