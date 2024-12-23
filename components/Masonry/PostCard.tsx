// 게시글 카드 하나의 UI를 담당하는 컴포넌트
"use client";

import React from "react";
import SocialImgBox from "./SocialImgBox";
import CardDetail from "./CardDetail";

export interface PostCardProps {
  id: string;
  socialImg: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
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
      userId: string;
    };
    textBox: {
      text: string;
    };
  };
  onClick: (postId: string) => void; // 클릭 핸들러 추가
}

const PostCard: React.FC<PostCardProps> = ({
  socialImg,
  cardDetail,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col bg-white rounded-lg overflow-hidden"
      onClick={() => onClick(cardDetail.like.postId)} // 클릭 시 handlePostClick 호출
    >
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
