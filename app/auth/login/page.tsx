"use client";

import React, { useState } from "react";
import Image from "next/image";
import InputTitle from "@/components/login/InputTitle";
import BackButton from "@/components/common/BackButton";
import InputTxt from "@/components/login/InputTxt";
import LoginButton from "@/components/login/LoginButton";
import LinkText from "@/components/common/LinkText";
import { login } from "@/app/services/userApi";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태

  // 로그인 버튼 클릭 시 호출할 함수
  const handleLogin = async () => {
    try {
      const { token, user } = await login(email, password); // 로그인 API 호출
      console.log("로그인 성공:", user);
      console.log("토큰:", token);
      // 토큰 저장
      localStorage.setItem("authToken", token);
      alert("로그인 성공!");
      window.location.href = "/";
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("로그인 실패:", error.message);
        setErrorMessage(error.message || "로그인 중 오류가 발생했습니다.");
      } else {
        console.error("예기치 못한 오류 발생");
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      {/* 뒤로가기 버튼 */}
      <div className="h-[44px] flex items-center px-[16px]">
        <BackButton onBack={() => console.log("뒤로 가기")} />
      </div>

      <div className="pt-[50px] pb-[87px] px-6">
        {/* 타이틀 영역 */}
        <div className="flex justify-center items-center mb-6">
          <h2 className="login-title relative">
            <span className="blind">로그인 타이틀</span>{" "}
            {/* 스크린 리더용 텍스트 */}
            <Image
              src="/login_title.png" // 이미지 경로
              alt="로그인 타이틀 이미지"
              layout="intrinsic" // 이미지 비율 유지
              width={250} // 실제 이미지 너비
              height={56} // 실제 이미지 높이
            />
          </h2>
        </div>

        {/* 입력 필드 */}
        <div className="">
          <div className="pt-3 pb-4">
            <InputTitle title="이메일 주소" />
            <InputTxt
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pt-3 pb-4">
            <InputTitle title="비밀번호" />
            <InputTxt
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {/* 에러 메시지 */}
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
        <div>
          {/* 로그인 버튼 */}
          <LoginButton onClick={handleLogin} />
        </div>
        <div className="flex items-center justify-center mt-5">
          <LinkText text="이메일 가입" href="/auth/register" />
        </div>
      </div>
    </div>
  );
}
