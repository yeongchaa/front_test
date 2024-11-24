// 프로필 관리 화면
"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import BottomNavigation from "@/components/common/BottomNavigation";
import EditableName from "@/components/login/EditableName";

export default function MyProfile() {
  return (
    <div>
      {/** Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white">
        {/** 왼쪽 버튼: 뒤로가기 */}
        <a href="#" className="flex items-center">
          <ArrowLeftIcon className="w-6 h-6 text-black"></ArrowLeftIcon>
        </a>
        {/** 중앙 타이틀 */}
        <h1 className="text-lg font-bold">프로필 관리</h1>

        {/* 오른쪽 버튼: 홈 */}
        <a href="#" className="flex items-center">
          <Image src="/bottom-home.svg" width={24} height={24} alt="home" />
        </a>
      </div>

      <div className="min-h-screen flex flex-col">
        {/** 프로필 사진 */}
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/default.png"
            width={90}
            height={90}
            alt="profile photo"
            className="rounded-full mt-5 "
          />
        </div>

        <div className="px-6 pt-7">
          {/** 페이지 타이틀 */}
          <p className="text-[18px] font-bold">프로필 정보</p>

          {/** 이름 변경란 */}
          <EditableName />
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="mt-auto sticky bottom-0 w-full">
        <BottomNavigation />
      </div>
    </div>
  );
}
