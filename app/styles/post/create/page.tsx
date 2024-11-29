// 새 게시글 작성 페이지
"use client";

import React from "react";
import BackButton from "@/components/common/BackButton";
import HeaderTitle from "@/components/common/HeaderTitle";
import Link from "next/link";
import { StyleOption, StyleSelector } from "@/components/post/StyleSelector";
import { GenderOption, GenderSelector } from "@/components/post/GenderSelector";
import TagInput from "@/components/post/TagInput";
import PhotoUpload from "@/components/post/PhotoUpload";

export default function CreatePostPage() {
  const handleStyleChange = (selectedOption: StyleOption) => {
    console.log("선택된 스타일:", selectedOption);
  };
  const handleGenderChange = (selectedOption: GenderOption) => {
    console.log("선택된 성별:", selectedOption);
  };
  const handleTagsChange = (tags: string[]) => {
    console.log("현재 태그 리스트:", tags);
  };

  return (
    <div>
      {/* 상단 헤더: 뒤로가기 버튼 + 제목 + 등록 버튼*/}
      <div>
        <div className="my-2 mr-2 ml-4 h-[44px] flex items-center bg-white relative justify-between">
          {/* 뒤로가기 버튼 (왼쪽) */}
          <div>
            <BackButton onBack={() => console.log("뒤로 가기")} />
          </div>
          {/* 타이틀 (중앙) */}
          <div>
            <HeaderTitle title="스타일 올리기" />
          </div>
          {/* 등록 버튼 (오른쪽) */}
          <div className="font-bold">
            <Link href="/styles/post/page">등록</Link>
          </div>
        </div>
      </div>

      {/* 내용 작성 부분 */}
      <div className="px-6">
        {/* 사진 추가 */}
        <PhotoUpload></PhotoUpload>
        {/* 제목 + 내용 */}
        <div>
          <input
            type="text"
            id="title-input"
            className="block w-full placeholder-gray-400 mb-2"
            placeholder="제목은 최대 20자 가능합니다..."
          />
        </div>
        <div className=" h-24 text-sm">
          <input
            type="text"
            id="title-input"
            className="block w-full placeholder-gray-400"
            placeholder="#아이템과 #스타일을 자랑해보세요..."
          />
        </div>
        {/* 태그 부분 */}
        <div className="mb-1">
          <TagInput onTagsChange={handleTagsChange} />
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-[1px] border-gray-100"></div>

      {/* Radio 버튼 부분 */}
      <div className="p-6">
        <div className="mb-8">
          <p className="font-semibold mb-4">유형</p>
          <GenderSelector
            options={["남성", "여성"]}
            onChange={handleGenderChange}
          />
        </div>
        <div className="mb-8">
          <p className="font-semibold mb-4">스타일</p>
          <StyleSelector
            options={[
              "로맨틱",
              "모던",
              "미니멀",
              "빈티지",
              "스트릿",
              "스포티",
              "아메카지",
              "캐주얼",
              "클래식",
            ]}
            onChange={handleStyleChange}
          />
        </div>
      </div>
    </div>
  );
}
