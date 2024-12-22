import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface LikeProps {
  size?: "small" | "large"; // 버튼 크기
  initialLiked?: boolean; // 초기 좋아요 상태
  initialCount?: number; // 초기 좋아요 수
  postId: string; // 게시물 ID
}

const Like: React.FC<LikeProps> = ({
  size = "small",
  initialLiked = false,
  initialCount = 0,
  postId,
}) => {
  const [toggleHeart, setToggleHeart] = useState(initialLiked); // 초기 좋아요 상태
  const [count, setCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // Tailwind 스타일 설정
  const sizeClass = size === "small" ? "h-4 w-4" : "h-6 w-6";
  const fontSize =
    size === "small"
      ? "text-[12px] text-[rgba(34,34,34,0.8)]"
      : "text-[13px] text-gray-800";

  const handleClick = async () => {
    if (isLoading) return; // 이미 요청 중이면 무시
    const newLiked = !toggleHeart;

    try {
      setIsLoading(true); // 로딩 시작
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liked: newLiked }),
      });

      if (!response.ok) {
        throw new Error("Failed to update like status");
      }

      const data = await response.json();
      if (typeof data.like_count === "number") {
        setToggleHeart(newLiked);
        setCount(data.like_count); // 서버에서 반환된 데이터 사용
      } else {
        throw new Error("Invalid server response");
      }
    } catch (error) {
      console.error("Error updating like:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center cursor-pointer ${isLoading ? "opacity-50 pointer-events-none" : ""
        }`}
    >
      {toggleHeart ? (
        <HeartIconSolid className={`${sizeClass} text-red-500`} />
      ) : (
        <HeartIcon className={`${sizeClass} text-gray-500`} />
      )}
      <span className={`${fontSize} pl-1`}>{count}</span>
    </div>
  );
};

export default Like;
