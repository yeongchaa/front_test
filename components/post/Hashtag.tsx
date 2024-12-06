"use client";
import React from "react";

interface HashtagProps {
  href?: string; // 해시태그 링크
  text: string; // 해시태그 텍스트
}

const Hashtag: React.FC<HashtagProps> = ({ href, text }) => {
  return (
    <a
      href={href}
      className="text-blue-500 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
};

export default Hashtag;
