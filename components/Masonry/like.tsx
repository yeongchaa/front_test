// 게시글 관련 좋아요 기능 구현

import React, { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LikeProps {
  size?: "small" | "large"; // 크기 타입
  postId: string; // 게시물 ID
  likeUsers: string[]; // 좋아요를 누른 사용자 목록
  initialCount: number; // 초기 좋아요 수
}

const Like: React.FC<LikeProps> = ({
  size = "small",
  postId,
  likeUsers,
  initialCount,
}) => {
  const { data: session } = useSession(); // 세션 데이터 가져오기
  const [toggleHeart, setToggleHeart] = useState(false); // 좋아요 상태
  const [count, setCount] = useState(initialCount); // 좋아요 수
  const router = useRouter();

  // 크기에 따라 동적으로 Tailwind 클래스 설정
  const sizeClass = size === "small" ? "h-4 w-4" : "h-6 w-6";
  const fontSize =
    size === "small"
      ? "text-[12px] text-[rgba(34,34,34,0.8)]"
      : "text-[13px] text-gray-800";

  // 초기 좋아요 상태 설정
  useEffect(() => {
    if (
      session?.user?.id &&
      Array.isArray(likeUsers) &&
      likeUsers.includes(session.user.id)
    ) {
      setToggleHeart(true); // 사용자가 좋아요를 누른 상태라면 빨간 하트로 설정
    }
  }, [session, likeUsers]);

  // 좋아요 버튼 클릭 핸들러
  const handleClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!session) {
      alert("로그인이 필요합니다.");
      router.push("/auth/login");
      return;
    }

    const newLiked = !toggleHeart;
    const newCount = newLiked ? count + 1 : count - 1;

    // 낙관적 업데이트
    setToggleHeart(newLiked);
    setCount(newCount);

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
      setCount(data.like_count); // 서버 응답으로 좋아요 수 업데이트
    } catch (error) {
      console.error("Error updating like:", error);

      // 롤백
      setToggleHeart(!newLiked);
      setCount(newLiked ? newCount - 1 : newCount + 1);
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
