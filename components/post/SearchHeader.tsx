// 검색창 Header 컴포넌트

import React from "react";
import { CameraIcon } from "@heroicons/react/24/solid"; // Heroicons의 카메라 아이콘 사용
import Link from "next/link";

const SearchHeader: React.FC = () => {
  return (
    <div className="h-[60px] pl-4 pr-2 py-2 flex items-center bg-white">
      {/* 검색창 */}
      <input
        type="text"
        placeholder="브랜드, 상품, 프로필 태그 등"
        className="flex-1 h-[44px] text-sm px-3 pr-10 bg-[#F4F4F4] rounded-[8px] mr-2"
      />

      {/* 카메라 아이콘 */}
      <div className="h-10 w-10 flex items-center justify-center">
        <Link href="/styles/post/create">
          <button className=" p-1 focus:outline-none">
            <CameraIcon className="w-6 h-6 text-black hover:text-black transition-colors" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchHeader;
