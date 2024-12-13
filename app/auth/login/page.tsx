// 로그인 페이지 (form 태그 사용)
"use client";

import React, { useState } from "react";
import Image from "next/image";
import InputTitle from "@/components/login/InputTitle";
import BackButton from "@/components/common/BackButton";
import InputTxt from "@/components/login/InputTxt";
import LinkText from "@/components/common/LinkText";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태

  // 폼 제출 이벤트 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    setError(null); // 에러 메시지 초기화

    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    // TODO: 로그인 API 연동
    console.log("로그인 요청:", { email, password });

    // 테스트용 메시지
    alert("로그인 버튼 클릭(테스트)");

    // 입력값 초기화
    setEmail("");
    setPassword("");
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
            <span className="blind">로그인 타이틀</span>
            <Image
              src="/login_title.png"
              alt="로그인 타이틀 이미지"
              layout="intrinsic"
              width={250}
              height={56}
            />
          </h2>
        </div>

        {/* 입력 필드 및 폼 */}
        <form onSubmit={handleSubmit} className="">
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

          {/* 에러 메시지 */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="bg-black w-full text-white p-2 rounded mt-4"
          >
            로그인
          </button>
        </form>

        {/* 회원가입 링크 */}
        <div className="flex items-center justify-center mt-5">
          <LinkText text="이메일 가입" href="/auth/register" />
        </div>
      </div>
    </div>
  );
}
