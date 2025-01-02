import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

interface LikeProps {
  size?: "small" | "large"; // 크기 타입
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
  const [toggleHeart, setToggleHeart] = useState(initialLiked); // 좋아요 상태
  const [count, setCount] = useState(initialCount); // 좋아요 수
  const { data: session } = useSession(); // 세션 데이터 가져오기

  // 크기에 따라 동적으로 Tailwind 클래스 설정
  const sizeClass = size === "small" ? "h-4 w-4" : "h-6 w-6";
  const fontSize =
    size === "small"
      ? "text-[12px] text-[rgba(34,34,34,0.8)]"
      : "text-[13px] text-gray-800";

  const handleClick = async () => {
    if (!session) {
      alert("로그인이 필요합니다.");
      return;
    }

    const newLiked = !toggleHeart;

    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`, // 인증 토큰 추가
        },
        body: JSON.stringify({ liked: newLiked }),
      });

      if (!response.ok) {
        throw new Error("Failed to update like status");
      }

      const data = await response.json();

      // 응답 데이터에 따라 상태 업데이트
      setToggleHeart(newLiked);
      setCount(data.like_count); // like_count를 업데이트
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <div onClick={handleClick} className="flex items-center cursor-pointer">
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
