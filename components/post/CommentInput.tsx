import React, { useRef, useEffect } from "react";
import Image from "next/image";

interface CommentInputProps {
  onChange: (value: string) => void; // 텍스트 입력 변경 이벤트
  value: string; // 입력된 값
  onSubmit: () => void; // 등록 버튼 클릭 이벤트 핸들러
  inputRef?: React.RefObject<HTMLDivElement>; // 부모로부터 전달받은 ref (optional)
}

const CommentInput: React.FC<CommentInputProps> = ({
  onChange,
  value,
  onSubmit,
  inputRef, // 부모로부터 전달받은 ref
}) => {
  const internalInputRef = useRef<HTMLDivElement>(null); // 내부 ref 생성
  const ref = inputRef || internalInputRef; // 전달받은 ref가 없으면 내부 ref 사용

  // 입력 필드 높이 자동 조절
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "40.6px"; // 초기 높이 설정
      ref.current.style.height = `${ref.current.scrollHeight}px`; // 컨텐츠 높이에 맞게 조정
    }
  }, [value, ref]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const text = target.innerText;

    onChange(text); // 상위 컴포넌트로 텍스트 전달
  };

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (value.trim() === "") return; // 빈 값은 처리하지 않음

    onChange(""); // 입력 필드 초기화
    onSubmit(); // 댓글 등록 처리
  };

  return (
    <div className="border-t border-[rgb(240, 240, 240)] bg-white sticky bottom-0">
      <div className="w-full">
        <div className="py-[6px] px-4 flex items-start">
          {/* 프로필 이미지 */}
          <div className="w-[34px] h-[34px] mr-2">
            <Image
              src="/default.png"
              alt="Profile"
              width={34}
              height={34}
              className="rounded-full object-cover border border-[rgba(34,34,34,0.1)]"
            />
          </div>

          {/* 텍스트 입력 필드 */}
          <div className="flex items-center bg-[#fafafa] border border-[rgba(34,34,34,0.1)] rounded-full w-full px-4 py-2 relative h-[40.6px]">
            {/* Placeholder */}
            {value === "" && (
              <div className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                댓글을 남기세요...
              </div>
            )}

            {/* 입력 필드 */}
            <div
              ref={ref} // 부모로부터 전달받은 ref 또는 내부 ref
              contentEditable
              suppressContentEditableWarning
              onInput={handleInput}
              className="flex-1 bg-transparent outline-none text-sm overflow-hidden flex items-center"
              style={{
                minHeight: "40.6px", // 초기 높이 설정
                lineHeight: "40.6px",
                whiteSpace: "pre-wrap", // 줄바꿈 허용
                wordWrap: "break-word", // 긴 단어 줄바꿈
              }}
            ></div>

            {/* 등록 버튼 */}
            {value && (
              <a
                href="#"
                onClick={handleSubmit}
                className="text-[14px] font-medium ml-2"
              >
                등록
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
