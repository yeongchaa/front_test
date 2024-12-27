import React from "react";
interface InputTxtProps {
  type: "email" | "password" | "name"; // 입력 필드 타입
  placeholder?: string; // 입력 필드 placeholder
  value: string; // 입력값 상태
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력 이벤트 핸들러
  error?: string | null; // 에러 메시지
}

const InputTxt: React.FC<InputTxtProps> = ({
  type,
  placeholder,
  value,
  onChange,
  error,
}) => {
  const inputType = type === "password" ? "password" : "text";
  const inputPlaceholder =
    type === "email" ? "예) kream@kream.co.kr" : placeholder || "";

  return (
    <div className="flex flex-col w-full">
      {/* 입력 필드 */}
      <input
        type={inputType}
        placeholder={inputPlaceholder}
        value={value}
        onChange={onChange}
        className={`border-b-2 ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none py-2 text-sm`}
      />
      {/* 에러 메시지 */}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputTxt;
