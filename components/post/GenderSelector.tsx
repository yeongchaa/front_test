import { useState } from "react";

// 버튼 타입 정의
export type GenderOption = "남성" | "여성";

// 버튼 인터페이스 정의
interface GenderSelectorProps {
  options: GenderOption[];
  onChange: (selectedOption: GenderOption) => void;
}

// 컴포넌트
export function GenderSelector({ options, onChange }: GenderSelectorProps) {
  const [selectedGender, setSelectedGender] = useState<GenderOption | null>(
    null
  );

  const handleClick = (option: GenderOption) => {
    setSelectedGender(option);
    onChange(option);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleClick(option)}
          className={`px-4 py-2 rounded-full border ${
            selectedGender === option
              ? "bg-black text-white"
              : "bg-white border-gray-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
