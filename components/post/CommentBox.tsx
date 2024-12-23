import React, { useState } from "react";
import Image from "next/image";
import UserName from "../Masonry/UserName";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface CommentBoxProps {
  userName: string; // 사용자 이름
  content: string; // 댓글 내용
  uploadTime: string; // 댓글 업로드 시간
  likes: number; // 초기 좋아요 수
}

const CommentBox: React.FC<CommentBoxProps> = ({
  userName,
  content,
  uploadTime,
  likes: initialLikes,
}) => {
  const [likes, setLikes] = useState(initialLikes); // 좋아요 수 상태
  const [isLiked, setIsLiked] = useState(false); // 좋아요 여부 상태

  const handleLikeToggle = () => {
    setIsLiked(!isLiked); // 좋아요 상태 토글
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1)); // 좋아요 수 업데이트
  };

  return (
    <div className="px-4 py-3 flex">
      {/* 프로필 이미지 */}
      <div className="mr-[10px]">
        <div
          className="relative rounded-full overflow-hidden"
          style={{ width: "34px", height: "34px", border: "1px solid #dbdbdb" }}
        >
          <Image
            src="/default.png" // 프로필 이미지 경로
            alt="프로필 사진"
            width={34}
            height={34}
            objectFit="cover" // 이미지 크기 조절
          />
        </div>
      </div>

      {/* 댓글 내용 */}
      <div className="flex-1">
        <div className="flex items-center">
          <UserName
            text={userName}
            type="medium"
            className="mr-2 font-bold text-[#000000]"
          />
          <span className="mr-1 text-gray-700">{content}</span>
        </div>
        <div className="mt-[6px] text-xs text-[rgba(34,34,34,0.5)]">
          <span className="mr-1">{uploadTime}</span>
          <span className="mr-1">•</span>
          <a className="mr-3">좋아요 {likes}</a>
          <a className="mr-3 font-bold">답글쓰기</a>
        </div>
      </div>

      {/* 좋아요 아이콘 */}
      <div
        className="pl-[5px] flex items-center cursor-pointer"
        onClick={handleLikeToggle}
      >
        {isLiked ? (
          <HeartIconSolid className="w-6 h-6 text-red-500" /> // 빨간색 꽉 찬 하트
        ) : (
          <HeartIcon className="w-6 h-6 text-gray-400" /> // 회색 테두리 하트
        )}
      </div>
    </div>
  );
};

export default CommentBox;
