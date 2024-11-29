// 회원가입 버튼
import React from "react";

interface RegisterButtonProps {
  onClick?: () => void;
  disabled?: boolean; // 버튼 비활성화 여부
}

const RegisterButton: React.FC<RegisterButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined} // 비활성화 상태에서는 클릭 이벤트 비활성화
      disabled={disabled} // HTML disabled 속성
      className={`h-[52px] w-full text-white text-[16px] flex items-center justify-center rounded-[10px] mt-5 ${
        disabled ? "bg-[#a9a9a9] cursor-not-allowed" : "bg-[#d3d3d3]"
      }`}
    >
      본인 인증하고 가입하기
    </button>
  );
};

export default RegisterButton;
