import React from "react";
import InputTitle from "@/components/login/InputTitle";
import InputTxt from "@/components/login/InputTxt";

interface InputFieldProps {
  type: "email" | "password" | "name"; // 입력 필드 타입
  placeholder?: string; // 입력 필드 placeholder
  value: string; // 입력값 상태
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력 이벤트 핸들러
  title: string; // 제목 텍스트
  error?: string | null; // 에러 메시지
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  title,
  error,
}) => {
  return (
    <div className="pt-3 pb-4">
      {/* InputTitle: 제목 표시 */}
      <InputTitle title={title} error={error} />
      {/* InputTxt: 입력 필드 */}
      <InputTxt
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
      />
    </div>
  );
};

export default InputField;
