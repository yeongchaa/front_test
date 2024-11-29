// 입력 필드 컴포넌트

import React, { useState, useEffect } from "react";
import InputTitle from "@/components/login/InputTitle";

interface InputTxtProps {
  type: "email" | "password" | "name"; // 타입 정의
  placeholder?: string; // placeholder 값
  value: string; // 입력 값
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력 이벤트 핸들러
  title?: string; // InputTitle 제목
}

const InputTxt: React.FC<InputTxtProps> = ({
  type,
  placeholder,
  value,
  onChange,
  title,
}) => {
  const [isFilled, setIsFilled] = useState<boolean>(false); // 입력 여부 상태
  const [error, setError] = useState<string>(""); // 에러 메시지 상태

  useEffect(() => {
    // 입력값이 존재하면 `isFilled` 상태를 true로 설정
    setIsFilled(value.trim() !== "");

    // 유효성 검사
    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setError("이메일 주소를 정확히 입력해주세요.");
      } else {
        setError("");
      }
    } else if (type === "password") {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
      if (value && !passwordRegex.test(value)) {
        setError("영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)");
      } else {
        setError("");
      }
    }
  }, [value, type]);

  const inputType = type === "password" ? "password" : "text";
  const inputPlaceholder =
    type === "email" ? "예) kream@kream.co.kr" : placeholder || "";

  return (
    <div className="flex flex-col w-full">
      {/* InputTitle */}
      <InputTitle title={title} isFilled={isFilled} />

      {/* 입력 필드 */}
      <input
        type={inputType}
        placeholder={inputPlaceholder}
        value={value}
        onChange={onChange}
        className={`border-b-2 ${
          isFilled ? "border-red-500" : "border-gray-300"
        } focus:outline-none py-2 text-sm`}
      />

      {/* 에러 메시지 */}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputTxt;
