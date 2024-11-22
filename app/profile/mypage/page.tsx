// 마이페이지 화면
"use client";

import BottomNavigation from "@/components/common/BottomNavigation"; // BottomNavigation 컴포넌트 경로에 맞게 설정
import Button from "@/components/common/Button";
import Image from "next/image";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function MyPage() {
  // 예시 userName 데이터
  const userName = "chachalee";
  return (
    <div className="flex flex-col min-h-screen items-center">
      {/** Header */}
      <div className="relative w-full py-4 px-4">
        <p className="text-[18px] font-bold text-center">내 쇼핑</p>
        <ShoppingBagIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-black" />
      </div>

      <div className="flex flex-col items-center space-y-4">
        {/** 프로필 사진 */}
        <Image
          src="/default.png"
          width={90}
          height={90}
          alt="profile photo"
          className="rounded-full"
        />

        {/** userName */}
        <p className="text-[18px] font-bold">{userName}</p>

        {/** 프로필 관리 & 로그아웃 버튼 */}
        <div className="flex space-x-2">
          <Button label="프로필 관리" />
          <Button
            label="로그아웃"
            onLogout={() => {
              console.log("로그아웃 처리 중 ... ");
              // 로그아웃 API 호출 등 추가 로직 작성해야 함.
            }}
          />
        </div>
      </div>
      <div className="w-full mt-6 border-t border-gray-300"></div>

      {/* 하단 네비게이션 */}
      <div className="mt-auto sticky bottom-0 w-full">
        <BottomNavigation />
      </div>
    </div>
  );
}
