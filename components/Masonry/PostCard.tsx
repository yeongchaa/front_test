"use client";

import React from "react";
import SocialImgBox from "./SocialImgBox";
import CardDetail from "./CardDetail";

export interface PostCardProps {
  socialImg: {
    src: string; // 이미지 경로
    alt: string; // 이미지 설명
    width?: number; // 이미지 너비
    height?: number; // 이미지 높이
  };
  cardDetail: {
    profileImage: {
      src: string; // 프로필 이미지 경로
      alt: string; // 프로필 이미지 설명
      width?: number;
      height?: number;
      className?: string;
    };
    userName: {
      text: string; // 사용자 이름 텍스트
      type?: "small" | "medium"; // 텍스트 크기
      className?: string;
    };
    like: {
      size?: "small" | "large"; // 좋아요 버튼 크기
    };
    textBox: {
      text: string; // 카드 텍스트
    };
  };
}

const PostCard: React.FC<PostCardProps> = ({ socialImg, cardDetail }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden">
      <SocialImgBox
        src={socialImg.src}
        alt={socialImg.alt}
        width={socialImg.width}
        height={socialImg.height}
      />
      <CardDetail {...cardDetail} />
    </div>
  );
};

export default PostCard;
