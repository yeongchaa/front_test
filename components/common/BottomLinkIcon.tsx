// BottomNavigation에서 사용할 아이템(아이콘+텍스트) 컴포넌트
"use client";

import React from "react";

interface BottomLinkIconProps {
  imageSrc: string; // 기본 이미지 경로
  activeImageSrc: string; // 활성화된 상태 이미지 경로
  text: string; // 텍스트
  isActive: boolean; // 활성화 여부
  href: string; // 이동할 URL
}

const BottomLinkIcon: React.FC<BottomLinkIconProps> = ({
  imageSrc,
  activeImageSrc,
  text,
  isActive,
  href,
}) => {
  return (
    <a href={href} className="flex flex-col items-center h-[50px]">
      {/* 이미지 아이콘 */}
      <img
        src={isActive ? activeImageSrc : imageSrc} // 활성화 상태에 따라 이미지 변경
        alt={text}
        className="h-[24px] w-auto object-contain"
      />
      {/* 텍스트 */}
      <span
        className={`text-[9px] mt-1 ${
          isActive ? "text-black" : "text-gray-500"
        }`}
      >
        {text}
      </span>
    </a>
  );
};

export default BottomLinkIcon;
