import { useState } from "react";

// 버튼 타입 정의
export type StyleOption =
  | "로맨틱"
  | "모던"
  | "미니멀"
  | "빈티지"
  | "스트릿"
  | "스포티"
  | "아메카지"
  | "캐주얼"
  | "클래식";

// 버튼 인터페이스 정의
interface StyleSelectorProps {
  options: StyleOption[];
  onChange: (selectedOption: StyleOption) => void;
}

// 컴포넌트
export function StyleSelector({ options, onChange }: StyleSelectorProps) {
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);

  const handleClick = (option: StyleOption) => {
    setSelectedStyle(option);
    onChange(option);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleClick(option)}
          className={`px-4 py-2 rounded-full border ${
            selectedStyle === option
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

export default StyleSelector;
