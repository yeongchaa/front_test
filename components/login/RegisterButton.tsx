// 회원가입 버튼 컴포넌트
import React from "react";

interface RegisterButtonProps {
  onClick?: () => void;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-[52px] w-full bg-[#d3d3d3] text-white text-[16px] flex items-center justify-center rounded-[10px] mt-5"
    >
      본인 인증하고 가입하기
    </button>
  );
};

export default RegisterButton;
