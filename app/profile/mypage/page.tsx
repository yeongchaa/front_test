// 마이페이지 화면
"use client";

import BottomNavigation from "@/components/common/BottomNavigation"; // BottomNavigation 컴포넌트 경로에 맞게 설정
import Button from "@/components/common/Button";
import Image from "next/image";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import PostCard from "@/components/Masonry/PostCard";

export default function MyPage() {
  // 예시 userName 데이터
  const userName = "chachalee";

  // 로그아웃 처리 함수 (단순 동작 처리)
  const handleLogout = () => {
    console.log("로그아웃 처리 중...");
    alert("로그아웃 되었습니다."); // 성공 메시지 출력
    // 로그아웃 후 이동 로직 추가 가능
    window.location.href = "/"; // 홈 페이지로 이동
  };

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

        <PostCard
          socialImg={{
            src: "/image2.jpeg",
            alt: "이주미",
          }}
          cardDetail={{
            profileImage: {
              src: "/profile1.jpeg",
              alt: "User Profile",
              width: 20.4,
              height: 20.4,
            },
            userName: {
              text: "John Doe",
              type: "small",
            },
            like: {
              size: "small",
            },
            textBox: {
              text: "This is an example post with a description apple banana orange kiwi is an example post with a description apple banana orange kiwi.",
            },
          }}
        />

        {/** userName */}
        <p className="text-[18px] font-bold">{userName}</p>

        {/** 프로필 관리 & 로그아웃 버튼 */}
        <div className="flex space-x-2">
          <Button label="프로필 관리" />
          <Button
            label="로그아웃"
            onLogout={handleLogout} // 로그아웃 버튼에 handleLogout 함수 연결
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
