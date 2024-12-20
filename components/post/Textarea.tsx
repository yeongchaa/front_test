import React, { useRef } from "react";

interface TextareaProps {
  value: string; // 현재 입력된 값
  onChange: (value: string) => void; // 값이 변경되었을 때 호출될 함수
}

export default function Textarea({ value, onChange }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const MAX_HEIGHT = 70; // text-sm 기준 4줄 높이 설정

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value); // 부모 컴포넌트에 값 전달

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이를 초기화
      const newHeight = textareaRef.current.scrollHeight;

      if (newHeight <= MAX_HEIGHT) {
        textareaRef.current.style.height = `${newHeight}px`; // 높이를 내용에 맞게 조정
        textareaRef.current.style.overflowY = "hidden"; // 스크롤바 숨김
      } else {
        textareaRef.current.style.height = `${MAX_HEIGHT}px`; // 최대 높이로 고정
        textareaRef.current.style.overflowY = "scroll"; // 스크롤바 활성화
      }
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value} // 부모 컴포넌트에서 전달받은 값 사용
      onChange={handleInput} // 부모 컴포넌트에서 전달받은 onChange 호출
      className="block w-full text-sm placeholder-gray-400 focus:outline-none"
      placeholder="내용을 입력해주세요..."
      style={{ resize: "none" }}
    />
  );
}
