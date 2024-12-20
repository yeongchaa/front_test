"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import InputTitle from "@/components/login/InputTitle";
import BackButton from "@/components/common/BackButton";
import InputTxt from "@/components/login/InputTxt";
import LinkText from "@/components/common/LinkText";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태

  const { data: session, status } = useSession();
  void session; // eslint를 우회하면서 의미상 변수는 남겨둠
  const searchParams = useSearchParams();
  const router = useRouter();

  // 에러 메시지 파라미터 처리
  useEffect(() => {
    if (searchParams.has("error")) {
      setError(decodeURIComponent(searchParams.get("error") || ""));
    }
  }, [searchParams]);

  // 폼 제출 이벤트 처리 (API 연결)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // 에러 메시지 초기화

    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error); // 오류 메시지 설정
    } else {
      // 로그인 성공 시 상태 초기화 및 메인 페이지 이동
      setEmail("");
      setPassword("");
      setError(null);
      router.push("/"); // 메인 페이지 이동
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // 이전 페이지가 있으면 뒤로 가기
    } else {
      router.push("/"); // 이전 페이지가 없으면 홈으로 이동
    }
  };

  // 세션 상태 처리 (로그인된 상태)
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

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
          <div className="pt-3 pb-4">
            <InputTitle title="이메일 주소" />
            <InputTxt
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="pt-3 pb-4">
            <InputTitle title="비밀번호" />
            <InputTxt
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
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
