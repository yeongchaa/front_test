import React, { useRef, useEffect } from "react";
import Image from "next/image";

interface CommentInputProps {
  onChange: (value: string) => void; // 텍스트 입력 변경 이벤트
  value: string; // 입력된 값
  onSubmit: () => void; // 등록 버튼 클릭 이벤트 핸들러
}

const CommentInput: React.FC<CommentInputProps> = ({
  onChange,
  value,
  onSubmit,
}) => {
  const inputRef = useRef<HTMLDivElement>(null);

  // 입력 필드 높이 자동 조절
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"; // 높이를 초기화
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // 컨텐츠 높이에 맞게 조정
    }
  }, [value]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const text = target.innerText;

    onChange(text); // 상위 컴포넌트로 텍스트 전달
  };

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // 등록 버튼을 누르는 순간 입력 필드 초기화
    onChange(""); // value를 즉시 초기화
    onSubmit(); // 댓글 등록 처리
  };

  return (
    <div className="flex items-start w-full pb-4">
      {/* 프로필 이미지 */}
      <div className="w-[34px] h-[34px] mr-2">
        <Image
          src="/default.png"
          alt="Profile"
          width={34}
          height={34}
          className="rounded-full object-cover"
        />
      </div>

      {/* 텍스트 입력 필드 */}
      <div className="flex-1 bg-[#fafafa] border border-[#f6f6f6] rounded-full w-full h-[41px] px-4 py-2 relative">
        <div
          ref={inputRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          className="bg-transparent outline-none placeholder-gray-400 text-sm overflow-hidden text-ellipsis"
          style={{
            minHeight: "40.6px", // 최소 높이 설정
            lineHeight: "1.5rem",
            whiteSpace: "pre-wrap", // 줄바꿈 허용
            wordWrap: "break-word", // 긴 단어 줄바꿈
          }}
        >
          {value === "" && (
            <span className="text-gray-400 absolute left-4 top-2 pointer-events-none">
              댓글을 남기세요...
            </span>
          )}
        </div>
      </div>

      {/* 등록 버튼 */}
      <div className="ml-2">
        {value && (
          <a
            href="#"
            onClick={handleSubmit} // 등록 버튼 클릭 이벤트 처리
            className="text-sm text-black font-medium"
          >
            등록
          </a>
        )}
      </div>
    </div>
  );
};

export default CommentInput;
