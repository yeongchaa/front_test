import React from "react";

interface MasonryGridProps {
  items: string[]; // 이미지 URL 배열
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-3 gap-4 auto-rows-[10px]">
      {items.map((src, index) => (
        <div
          key={index} // 배열의 인덱스를 key로 사용
          className="overflow-hidden rounded-lg shadow-md bg-gray-200"
        >
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
