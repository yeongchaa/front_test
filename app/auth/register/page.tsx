"use client";

import React, { useState } from "react";
import InputTitle from "@/components/login/InputTitle";
import BackButton from "@/components/common/BackButton";
import InputTxt from "@/components/login/InputTxt";
import RegisterButton from "@/components/login/RegisterButton";
import { createUser } from "@/app/services/createUser";

export default function RegisterPage() {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [username, setUsername] = useState(""); // 사용자 이름 상태
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const handleRegister = async () => {
    setIsLoading(true); // 로딩 상태 시작
    try {
      // 기본 프로필 이미지 경로
      const defaultProfileImageUrl = "/default-profile.png";

      // 회원가입 API 호출
      const response = await createUser(
        username,
        password,
        email,
        defaultProfileImageUrl
      );

      console.log("회원가입 성공:", response);

      window.location.href = "/auth/login"; // home으로
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div>
      {/* 뒤로가기 버튼 */}
      <div className="h-[44px] flex items-center px-[16px]">
        <BackButton onBack={() => console.log("뒤로 가기")} />
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
            />
          </div>
          <div className="pt-3 pb-4">
            <InputTitle title="비밀번호*" />
            <InputTxt
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-3 pb-4">
            <InputTitle title="사용자 이름*" />
            <InputTxt
              type="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div>
          {/* 에러 메시지 출력 */}
          {errorMessage && (
            <p className="text-red-500 text-sm my-2">{errorMessage}</p>
          )}
          {/* 회원가입 버튼 */}
          <RegisterButton onClick={handleRegister} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
