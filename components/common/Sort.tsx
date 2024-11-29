"use client";
import React, { useState } from "react"; // React에서 useState를 불러옴

const Sort: React.FC = () => {
  const [selected, setSelected] = useState<string>("인기순"); // 현재 선택된 상태 관리

  return (
    <div className="h-[41px] py-3 px-4">
      <ul className="flex justify-end text-[14px] space-x-3">
        <li className="relative">
          <a
            href="#"
            onClick={() => setSelected("인기순")} // 클릭 시 '인기순'으로 상태 업데이트
            className={`choice ${
              selected === "인기순" ? "font-bold" : "font-normal"
            }`} // 선택된 항목에 따라 클래스 적용
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
            onClick={() => setSelected("최신순")} // 클릭 시 '최신순'으로 상태 업데이트
            className={`choice ${
              selected === "최신순" ? "font-bold" : "font-normal"
            }`} // 선택된 항목에 따라 클래스 적용
          >
            최신순
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sort;
