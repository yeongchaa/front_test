import React, { useState } from "react";

interface TagInputProps {
  onTagsChange: (tags: string[]) => void; // 부모 컴포넌트에 태그 리스트 전달
}

export default function TagInput({ onTagsChange }: TagInputProps) {
  const [tags, setTags] = useState<string[]>([]); // 태그 리스트 상태
  const [inputValue, setInputValue] = useState<string>(""); // 입력 필드 상태

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      const newTags = [...tags, trimmedValue];
      setTags(newTags);
      onTagsChange(newTags); // 부모 컴포넌트에 태그 업데이트
      setInputValue(""); // 입력 필드 초기화
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onTagsChange(newTags); // 부모 컴포넌트에 태그 업데이트
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 Enter 동작 방지
      addTag();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Input 영역 */}
      <div className="flex items-center gap-2 border p-2 rounded-md">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="태그 입력..."
          className="flex-1 border-none outline-none"
        />
        <button
          onClick={addTag}
          className="px-2 py-1 bg-gray-300 text-white rounded-md hover:bg-gray-500"
        >
          +
        </button>
      </div>

      {/* 태그 리스트 영역 */}
      <div className="flex items-center gap-2 flex-wrap mt-3s">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-white text-black px-2 py-1 rounded-lg border border-gray-300"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="text-gray-300 hover:text-gray-800 pl-1 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
