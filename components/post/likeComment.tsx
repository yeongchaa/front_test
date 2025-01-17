// 댓글, 답글 좋아요 기능 컴포넌트

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface LikeCommentProps {
  type: "icon" | "count"; // 렌더링 타입
  postId: string;
  commentId: string; // 좋아요 기능이 적용되는 댓글 ID
  likeUsers: string[];
  initialCount: number;
}

const LikeComment: React.FC<LikeCommentProps> = ({
  type,
  postId,
  commentId,
  likeUsers,
  initialCount,
}) => {
  const { data: session } = useSession(); // 세션 데이터 가져오기
  const [toggleHeart, setToggleHeart] = useState(false); // 좋아요 상태
  const [count, setCount] = useState(initialCount); // 좋아요 수
  const router = useRouter();

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
  const handleClick = async () => {
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
      const response = await fetch(
        `/api/posts/${postId}/comments/${commentId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`, // 인증 토큰 추가
          },
          body: JSON.stringify({ liked: newLiked }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update like status");
      }

      const data = await response.json();
      setCount(data.comments.like_count); // 서버 응답으로 좋아요 수 업데이트
    } catch (error) {
      console.error("Error updating like:", error);

      // 롤백
      setToggleHeart(!newLiked);
      setCount(newLiked ? newCount - 1 : newCount + 1);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {type === "icon" &&
        (toggleHeart ? (
          <HeartIconSolid className="text-red-500" />
        ) : (
          <HeartIcon className="text-gray-500" />
        ))}
      {type === "count" && <span>{count}</span>}
    </div>
  );
};

export default LikeComment;
