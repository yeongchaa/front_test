// 게시글 내용 썸네일
"use client";
import React from "react";

interface TextBoxProps {
  text: string;
}

const TextBox: React.FC<TextBoxProps> = ({ text }) => {
  return (
    <p
      className="h-auto text-[13px] mt-[6px] tracking-[-0.07px] 
    leading-4 break-words line-clamp-2 text-gray-700"
    >
      {text}
    </p>
  );
};

export default TextBox;
