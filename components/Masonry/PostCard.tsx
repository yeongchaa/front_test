// 게시글 카드 하나의 UI를 담당하는 컴포넌트
"use client";

import React from "react";
import SocialImgBox from "./SocialImgBox";
import CardDetail from "./CardDetail";
import Image from "next/image";

export interface PostCardProps {
  id: string;
  socialImg: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    imageCount?: number; // 이미지 개수
  };
  cardDetail: {
    profileImage: {
      src: string;
      alt: string;
      width?: number;
      height?: number;
      className?: string;
    };
    userName: {
      text: string;
      type?: "small" | "medium";
      className?: string;
    };
    like: {
      size?: "small" | "large";
      postId: string;
      likeUsers: string[];
      initialCount: number;
    };
    textBox: {
      text: string;
    };
  };
  like_count: number; // 좋아요 개수
  created_at: string; // 생성 시간
  onClick: (postId: string) => void; // 클릭 핸들러 추가
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  socialImg,
  cardDetail,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col bg-white rounded-lg overflow-hidden"
      onClick={() => {
        console.log("PostCard: Clicked ID", id);
        onClick(id);
      }} // 클릭 시 handlePostClick 호출
    >
      <div className="relative">
        {/* 이미지 박스 */}
        <SocialImgBox
          src={socialImg.src}
          alt={socialImg.alt}
          width={socialImg.width}
          height={socialImg.height}
        />
        {/* 여러 장의 이미지가 있을 경우 아이콘 표시 */}
        {socialImg.imageCount && socialImg.imageCount > 1 && (
          <div className="absolute top-2 right-2 flex items-center">
            <Image
              src="/multi.svg" // 사용하려는 아이콘 이미지 경로
              alt="아이콘"
              width={20} // 아이콘 너비
              height={20} // 아이콘 높이
              className="w-5 h-5" // 추가적인 TailwindCSS 스타일
            />
          </div>
        )}
      </div>
      <CardDetail {...cardDetail} />
    </div>
  );
};

export default PostCard;
