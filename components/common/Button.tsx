// 댓글쓰기, 로그아웃, 프로필 관리, 변경 버튼
// 크기, 테두리 색상 별로 나누기

"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  label: "프로필 관리" | "로그아웃"; // 버튼 라벨
  onLogout?: () => void; // 로그아웃 핸들러 (선택)
}

const Button: React.FC<ButtonProps> = ({ label, onLogout }) => {
  const handleClick = () => {
    if (label === "로그아웃" && onLogout) {
      onLogout(); // 로그아웃 로직 실행
    }
  };

  return (
    <Link
      href={label === "프로필 관리" ? "/profile/myprofile" : "/profile/mypage"}
    >
      <button
        onClick={handleClick}
        className="w-[150px] text-3 border border-[#d3d3d3] rounded-[10px] py-2 bg-white focus:outline-none hover:shadow-sm transition-shadow"
      >
        {label}
      </button>
    </Link>
  );
};

export default Button;
