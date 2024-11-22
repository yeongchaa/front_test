// (styles)
// 스타일 카드 or 스타일 게시글의 본문 제목

// 수정 필요

import React from "react";

interface TitleProps {
  text: string; // 제목 텍스트
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return <h2 className="text-xl font-bold">{text}</h2>;
};

export default Title;
