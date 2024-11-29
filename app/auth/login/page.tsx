// 로그인 페이지
/**
 * 수정
 * - 에러메시지
 * - 로그인 버튼 클릭 시 호출함 함수 부분 수정(콘솔 출력 제거)
 */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import InputTitle from "@/components/login/InputTitle";
import BackButton from "@/components/common/BackButton";
import InputTxt from "@/components/login/InputTxt";
import LoginButton from "@/components/login/LoginButton";
import LinkText from "@/components/common/LinkText";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태

  // 로그인 버튼 클릭 시 호출할 함수 (콘솔 빼고)
  const handleLogin = () => {
    console.log("이메일:", email);
    console.log("비밀번호:", password);
    alert("로그인 버튼 클릭(테스트)");
    // 동작 추가해야 함
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
            <Image
              src="/login_title.png"
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
