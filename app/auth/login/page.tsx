"use client";

import React, { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import BackButton from "@/components/common/BackButton";
import InputField from "@/components/login/InputField";
import LinkText from "@/components/common/LinkText";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [error, setError] = useState<string | null>(null); // API 에러 메시지 상태
  const [emailError, setEmailError] = useState<string | null>(null); // 이메일 유효성 검사 에러
  const [passwordError, setPasswordError] = useState<string | null>(null); // 비밀번호 유효성 검사 에러

  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  // 에러 메시지 파라미터 처리
  useEffect(() => {
    if (searchParams.has("error")) {
      setError(decodeURIComponent(searchParams.get("error") || ""));
    }
  }, [searchParams]);

  // 이메일 유효성 검사
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "유효한 이메일 주소를 입력해주세요.";
    }
    return null;
  };

  // 비밀번호 유효성 검사
  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(value)) {
      return "영문, 숫자, 특수문자를 조합하여 8~16자로 입력해주세요.";
    }
    return null;
  };

  // 폼 제출 이벤트 처리 (API 호출)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // 유효성 검사 상태 확인
    if (emailError || passwordError) {
      console.log("유효성 검사 실패:", { emailError, passwordError });
      return; // 유효성 검사 실패 시 API 호출 중단
    }

    // API 호출
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error); // API 에러 메시지 설정
    } else {
      setEmail("");
      setPassword("");
      setError(null);
      router.push("/"); // 메인 페이지 이동
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  // 세션 상태 처리 (로그인된 상태)
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/");
    }
  }, [status, session, router]);

  // 로그인 UI
  return (
    <div>
      {/* 뒤로가기 버튼 */}
      <div className="h-[44px] flex items-center px-[16px]">
        <BackButton onBack={handleBack} />
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
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            title="이메일 주소"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              setEmailError(validateEmail(value)); // 입력 중에 유효성 검사
            }}
            placeholder="예) kream@kream.co.kr"
            error={emailError}
          />
          <InputField
            type="password"
            title="비밀번호"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              setPasswordError(validatePassword(value)); // 입력 중에 유효성 검사
            }}
            placeholder="영문, 숫자, 특수문자를 조합해주세요."
            error={passwordError}
          />

          {/* API 에러 메시지 */}
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
