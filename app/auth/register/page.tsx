"use client";

import React, { useState } from "react";
import InputTitle from "@/components/login/InputTitle";
import BackButton from "@/components/common/BackButton";
import InputTxt from "@/components/login/InputTxt";
import RegisterButton from "@/components/login/RegisterButton";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [username, setUsername] = useState(""); // 사용자 이름 상태
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const router = useRouter();

  const handleRegister = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const DEFAULT_PROFILE_IMAGE_ID = "0310e58e-e0e0-4d79-9fa0-76239d76d46d"; // 기본 프로필 이미지 ID

      // 회원가입 API 요청
      const response = await axios.post("/api/users/signup", {
        username,
        password,
        email,
        profile_image_id: DEFAULT_PROFILE_IMAGE_ID, // 기본 프로필 이미지 ID 포함
      });

      if (response.status === 201) {
        alert("회원가입 성공");
        router.push("/auth/login"); // 성공 시 로그인 페이지로 이동
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "회원가입에 실패했습니다."
        );
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 뒤로가기 버튼 */}
      <div className="h-[44px] flex items-center px-[16px]">
        <BackButton onBack={() => router.back()} />
      </div>

      <div className="px-4 pt-5">
        <h1 className="mb-1 text-[30px] font-bold">회원가입</h1>

        {/* 입력 필드 */}
        <div>
          <div className="pt-3 pb-4">
            <InputTitle title="이메일 주소*" />
            <InputTxt
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>
          <div className="pt-3 pb-4">
            <InputTitle title="비밀번호*" />
            <InputTxt
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상 비밀번호 입력"
            />
          </div>
          <div className="pt-3 pb-4">
            <InputTitle title="사용자 이름*" />
            <InputTxt
              type="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="사용할 이름 입력"
            />
          </div>
        </div>

        {/* 에러 메시지 출력 */}
        {errorMessage && (
          <p className="text-red-500 text-sm my-2">{errorMessage}</p>
        )}

        {/* 회원가입 버튼 */}
        <div className="mt-6">
          <RegisterButton
            onClick={handleRegister}
            disabled={isLoading || !email || !password || !username}
          />
        </div>
      </div>
    </div>
  );
}
