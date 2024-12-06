// 게시글 내용 썸네일
"use client";
import React from "react";

interface TextBoxProps {
  text: string;
}

const TextBox: React.FC<TextBoxProps> = ({ text }) => {
  return (
    <p
      className="h-8 text-[13px] mt-[6px] tracking-[-0.07px] 
    leading-4 overflow-hidden break-words line-clamp-2"
    >
      {text}
    </p>
  );
};

export default TextBox;
