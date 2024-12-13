// 프로필 이미지(Avatar)
import React from "react";
import Image from "next/image"; // next/image 모듈 활용 (className 지원x)

interface ImgProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string; // 선택적 className
}

const Img: React.FC<ImgProps> = ({
  src,
  alt,
  width = 20.4,
  height = 20.4,
  className = "", // 선택적 className
}) => {
  return (
    <div
      className={`relative ${className} rounded-full`}
      style={{ width, height, border: "1px solid #dbdbdb" }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill" // 이미지를 부모 요소 크기에 맞추기 위해
        objectFit="cover" // 이미지를 부모 요소 크기에 맞추기 위해
        className="rounded-full"
      />
    </div>
  );
};

export default Img;
