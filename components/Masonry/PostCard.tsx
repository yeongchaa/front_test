// 메인화면 썸네일 카드
"use client";

import React from "react";
import SocialImgBox from "./SocialImgBox";
import CardDetail from "./CardDetail";

// PostCard 컴포넌트에 필요한 props 인터페이스
export interface PostCardProps {
  socialImg: {
    src: string; // 이미지 경로
    alt: string; // 이미지 설명
  };
  cardDetail: {
    profileImage: {
      src: string; // 프로필 이미지 경로
      alt: string; // 프로필 이미지 설명
      width?: number; // 너비 (선택적)
      height?: number; // 높이 (선택적)
      className?: string; // 추가 클래스 (선택적)
    };
    userName: {
      text: string; // 사용자 이름 텍스트
      type?: "small" | "medium"; // 텍스트 크기
      className?: string; // 추가 클래스 (선택적)
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
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      {/* 스타일 이미지 */}
      <SocialImgBox {...socialImg} />

      {/* 카드 디테일 */}
      <CardDetail {...cardDetail} />
    </div>
  );
};

export default PostCard;
