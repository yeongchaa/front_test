"use client";

import React, { useState } from "react";
import InputTitle from "@/components/login/InputTitle";
import BackButton from "@/components/common/BackButton"; // 뒤로가기 버튼 컴포넌트 경로
import InputTxt from "@/components/login/InputTxt";
import RegisterButton from "@/components/login/RegisterButton";

export default function RegisterPage() {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [name, setName] = useState(""); // 이름 상태

  // 가입하기 버튼 클릭 시 호출할 함수
  const handleRegister = () => {
    console.log("가입하기 버튼 클릭!");
    // 가입하기 기능 추가 예정
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
            <InputTitle title="이름*" />
            <InputTxt
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div>
          {/* 회원가입 버튼 */}
          <RegisterButton onClick={handleRegister} />
        </div>
      </div>
    </div>
  );
}
