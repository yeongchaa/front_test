"use client";

import Image from "next/image";

interface SocialImgBoxProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const SocialImgBox: React.FC<SocialImgBoxProps> = ({
  src,
  alt,
  width,
  height,
}) => {
  return (
    <div className="w-full overflow-hidden rounded-[10px]">
      <Image
        src={src}
        alt={alt}
        width={width || 300}
        height={height || 300}
        layout="responsive" // 이미지 비율 유지
        className="object-cover"
      />
    </div>
  );
};

export default SocialImgBox;
