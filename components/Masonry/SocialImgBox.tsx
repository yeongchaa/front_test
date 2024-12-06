// 스타일 이미지
"use client";

import React from "react";
import Image from "next/image";

interface SocialImgBoxProps {
  src: string;
  alt: string;
}

const SocialImgBox: React.FC<SocialImgBoxProps> = ({ src, alt }) => {
  return (
    <div className="relative pt-[134.77%] rounded-[10px] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        className="absolute top-1/2 left-1/2 h-full w-full transform  object-cover"
        layout="fill"
      />
    </div>
  );
};

export default SocialImgBox;
