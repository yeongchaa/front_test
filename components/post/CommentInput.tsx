import React, { useRef } from "react";
import Image from "next/image";

interface CommentInputProps {
  onChange: (value: string) => void; // 텍스트 입력 변경 이벤트
  value: string; // 입력된 값
}

const CommentInput: React.FC<CommentInputProps> = ({ onChange, value }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textArea = textAreaRef.current;
    if (textArea) {
      // 높이 초기화 후 다시 계산
      textArea.style.height = "41px"; // 한 줄 높이로 초기화
      const minHeight = 41; // 최소 높이
      const maxHeight = textArea.scrollHeight; // 내용 높이에 따라 계산
      textArea.style.height = `${Math.max(minHeight, maxHeight)}px`; // 높이 재계산
    }
    onChange(event.target.value);
  };

  const isMultiline =
    textAreaRef.current?.scrollHeight && textAreaRef.current.scrollHeight > 41;

  return (
    <div className="relative w-full flex items-end pb-4">
      {/* 프로필 이미지 */}
      <div className="w-[34px] h-[34px]">
        <Image
          src="/default.png"
          alt="Profile"
          width={34}
          height={34}
          className="rounded-full object-cover"
        />
      </div>

      {/* 텍스트 입력 필드 */}
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={handleInput}
        placeholder="댓글을 남기세요..."
        className={`w-full ml-4 bg-[#fafafa] border border-[#f6f6f6] p-[10px_52px_10px_12px] resize-none outline-none placeholder-gray-400 text-sm ${
          isMultiline ? "rounded-[20px]" : "rounded-full"
        }`}
        style={{
          height: value ? `${textAreaRef.current?.scrollHeight || 41}px` : "41px",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default CommentInput;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       