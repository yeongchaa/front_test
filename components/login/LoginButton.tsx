// 로그인 버튼 컴포넌트
import React from "react";

interface LoginButtonProps {
  onClick?: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-[52px] w-full bg-[#d3d3d3] text-white text-[16px] flex items-center justify-center rounded-[10px] mt-5"
    >
      로그인
    </button>
  );
};

export default LoginButton;
