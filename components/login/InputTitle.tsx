import React from "react";
interface InputTitleProps {
  title?: string;
  error?: string | null; // 에러 메시지 상태
}

const InputTitle: React.FC<InputTitleProps> = ({ title, error }) => {
  return (
    <label
      className={`text-[13px] font-bold ${
        error ? "text-red-500" : "text-black"
      }`}
    >
      {title}
    </label>
  );
};

export default InputTitle;
