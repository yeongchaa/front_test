// [등록]버튼 컴포넌트
import React from "react";

interface SubmitButtonProps {
  onSubmit: () => void; // 클릭 시 실행할 함수
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => {
  return (
    <button onClick={onSubmit} className="text-black text-xl">
      등록
    </button>
  );
};

export default SubmitButton;
