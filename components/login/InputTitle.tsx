import React from "react";

interface InputTitleProps {
  title?: string;
  isFilled?: boolean; // 입력 여부
}

const InputTitle: React.FC<InputTitleProps> = ({ title, isFilled = false }) => {
  return (
    <label
      className={`text-[13px] font-bold ${
        isFilled ? "text-red-500" : "text-black" // (수정 필요)안 먹음
      }`}
    >
      {title}
    </label>
  );
};

export default InputTitle;
