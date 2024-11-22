// 뒤로가기 버튼 컴포넌트(Header 섹션에서 사용)
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface BackButtonProps {
  onBack: () => void; // 클릭 시 실행할 함수
}

const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  return (
    <button onClick={onBack} className="flex items-center">
      <ArrowLeftIcon className="w-6 h-6" />
    </button>
  );
};

export default BackButton;
