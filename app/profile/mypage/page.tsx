"use client";

import { signOut, useSession } from "next-auth/react"; // signOut 및 useSession 가져오기
import BottomNavigation from "@/components/common/BottomNavigation"; // BottomNavigation 컴포넌트 경로에 맞게 설정
import Button from "@/components/common/Button";
import Image from "next/image";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const { data: session, status } = useSession(); // 세션 정보 가져오기
  const router = useRouter();
  const [username, setUsername] = useState("No username available"); // 사용자 이름 상태
  const [profileImage, setProfileImage] = useState("/default.png"); // 프로필 이미지 상태

  // 로그인 상태 확인 및 리디렉션
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // 세션 데이터 확인 및 사용자 정보 조회
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/users/${session.user.email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.accessToken || ""}`, // 세션에서 액세스 토큰 추가
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch user info: ${response.status}`);
          }

          const data = await response.json();
          setUsername(data.username || "No username available");
          setProfileImage(data.profile_image_url || "/default.png");
        } catch (error) {
          console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        }
      }
    };

    fetchUserInfo();
  }, [session]);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    signOut({
      callbackUrl: "/", // 로그아웃 후 이동할 URL
    });
  };

  return (
    status === "authenticated" && (
      <div className="flex flex-col min-h-screen items-center">
        {/** Header */}
        <div className="relative w-full py-4 px-4">
          <p className="text-[18px] font-bold text-center">내 프로필</p>
          <ShoppingBagIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-black" />
        </div>

        <div className="flex flex-col items-center space-y-4">
          {/** 프로필 사진 */}
          <Image
            src={profileImage}
            width={90}
            height={90}
            alt="profile photo"
            className="rounded-full object-cover"
            style={{ width: "90px", height: "90px" }}
          />

          {/** userName */}
          <p className="text-[18px] font-bold">{username}</p>

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
    )
  );
}
