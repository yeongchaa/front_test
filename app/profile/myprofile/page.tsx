"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import BottomNavigation from "@/components/common/BottomNavigation";
import EditableName from "@/components/login/EditableName";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyProfile() {
  const { status, data: session } = useSession(); // 세션 정보
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null); // 사용자 이름 상태
  const [profileImage, setProfileImage] = useState("/default.png"); // 프로필 이미지 URL 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 로그인 상태 확인 및 리디렉션
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (session?.user?.email) {
        console.log("사용자 이메일:", session.user.email);

        try {
          const response = await fetch(`/api/users/${session.user.email}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken || ""}`,
              "Cache-Control": "no-cache", // 캐싱 방지
            },
          });

          console.log("사용자 정보 API 응답 상태:", response.status);

          if (!response.ok) {
            throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
          }

          const data = await response.json();
          console.log("사용자 정보 API 응답 데이터:", data);

          setUsername(data.username); // 사용자 이름 설정
          setProfileImage(data.profile_image_url || "/default.png"); // 최신 프로필 이미지 URL 설정
        } catch (error) {
          console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        } finally {
          setLoading(false); // 로딩 완료
        }
      }
    };

    fetchUserInfo();
  }, [session]);

  // 이미지 변경 처리
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file || !session?.user?.email || !username) {
      console.error("파일, 사용자 이메일 또는 사용자 이름이 없습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Step 1: 이미지 업로드 및 profile_image_id 반환 받기
      console.log("이미지 업로드 요청 시작...");
      const uploadResponse = await fetch("/api/upload/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken || ""}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }

      const uploadData = await uploadResponse.json();
      const profileImageId = uploadData.file.id;
      console.log("반환된 profile_image_id:", profileImageId);

      // Step 2: 반환된 profile_image_id를 사용해 프로필 업데이트
      console.log("프로필 업데이트 요청 시작...");
      const updateResponse = await fetch(`/api/users/${session.user.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken || ""}`,
        },
        body: JSON.stringify({
          username: username, // 현재 사용자의 username
          profile_image_id: profileImageId, // 업로드된 profile_image_id
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("프로필 이미지 업데이트에 실패했습니다.");
      }

      console.log("프로필 이미지가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("프로필 이미지 변경 중 오류 발생:", error);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      {/** Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white">
        {/** 왼쪽 버튼: 뒤로가기 */}
        <Link href="/profile/mypage" className="flex items-center">
          <ArrowLeftIcon className="w-6 h-6 text-black"></ArrowLeftIcon>
        </Link>
        {/** 중앙 타이틀 */}
        <h1 className="text-lg font-bold">프로필 관리</h1>

        {/* 오른쪽 버튼: 홈 */}
        <Link href="/" className="flex items-center">
          <Image src="/bottom-home.svg" width={24} height={24} alt="home" />
        </Link>
      </div>

      <div className="min-h-screen flex flex-col">
        {/** 프로필 사진 */}
        <div className="flex pt-[20px] pb-7 px-6">
          <div
            className="rounded-full overflow-hidden mr-3"
            style={{ width: 80, height: 80 }}
          >
            <Image
              src={profileImage}
              alt="profile photo"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div className="mr-3">
            {/** 사용자 이름 */}
            <p className="text-[20px] font-bold mb-3">{username}</p>
            <div className="flex mt-3">
              <label className="bg-white border border-gray-300 rounded-[10px] px-[14px] text-[12px] h-[34px] cursor-pointer flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                이미지 변경
              </label>
              <button className="bg-white border border-gray-300 rounded-[10px] px-[14px] text-[12px] h-[34px] ml-2">
                삭제
              </button>
            </div>
          </div>
        </div>

        <div className="px-6">
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
