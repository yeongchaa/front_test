"use client";
import React, { useState } from "react";

interface SortProps {
  onSortChange: (sortType: string) => void; // 부모로부터 받는 함수의 타입 정의
}

const Sort: React.FC<SortProps> = ({ onSortChange }) => {
  const [selected, setSelected] = useState<string>("popularity");

  // Handle sort click and update selected state
  const handleSortClick = (sortType: string) => {
    setSelected(sortType); // 선택된 정렬 기준 업데이트
    onSortChange(sortType); // 부모 컴포넌트로 전달
  };

  return (
    <div className="h-[41px] py-3 px-4">
      <ul className="flex justify-end text-[14px] space-x-3">
        <li className="relative">
          <a
            href="#"
            onClick={() => handleSortClick("popularity")}
            className={`choice ${
              selected === "popularity" ? "font-bold" : "font-normal"
            }`}
          >
            인기순
          </a>
        </li>
        <li>
          <p className="text-[#ebebeb]">|</p>
        </li>
        <li className="relative">
          <a
            href="#"
            onClick={() => handleSortClick("latest")}
            className={`choice ${
              selected === "latest" ? "font-bold" : "font-normal"
            }`}
          >
            최신순
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sort;
