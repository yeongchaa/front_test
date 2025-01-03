// 프로필 이미지 + userName + 좋아요 버튼 + textBox
"use client";

import React from "react";
import TextBox from "./TextBox";
import UserName from "./UserName";
import Like from "./like";
import Img from "./Img";

interface CardDetailProps {
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
}

const CardDetail: React.FC<CardDetailProps> = ({
  profileImage,
  userName,
  like,
  textBox,
}) => {
  return (
    <div className="flex flex-col pt-2 pb-5 px-1">
      <div className="flex items-center">
        <Img {...profileImage} />
        <UserName {...userName} className="flex-1 pl-1 pr-[6px]" />
        <Like {...like} />
      </div>
      <TextBox {...textBox} />
    </div>
  );
};

export default CardDetail;
