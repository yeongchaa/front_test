// Header 섹션에 들어갈 제목 컴포넌트
import React from "react";

interface HeaderTitleProps {
  title: string; // 제목 텍스트
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title }) => {
  return <h1 className="text-center text-[18px] font-semibold">{title}</h1>;
};

export default HeaderTitle;
