"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/common/BackButton";
import HeaderTitle from "@/components/common/HeaderTitle";
import { StyleOption, StyleSelector } from "@/components/post/StyleSelector";
import { GenderOption, GenderSelector } from "@/components/post/GenderSelector";
import TagInput from "@/components/post/TagInput";
import PhotoUpload from "@/components/post/PhotoUpload";
import Textarea from "@/components/post/Textarea";

export default function CreatePostPage() {
  const { data: session, status } = useSession();
  const router = useRouter(); // useRouter 훅 가져오기
  const [file_ids, setFileIds] = useState<string[]>([]); // 파일 ID 저장
  const [title, setTitle] = useState(""); // 제목 저장
  const [content, setContent] = useState(""); // 내용 저장
  const [selectedGender, setSelectedGender] = useState<GenderOption | null>(
    null
  );
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);
  const [tags, setTags] = useState<string[]>([]); // 태그 리스트 상태

  useEffect(() => {
    // 세션 상태가 'unauthenticated'이면 로그인 페이지로 이동
    if (status === "unauthenticated") {
      router.replace("/auth/login"); // 로그인 페이지로 리다이렉트
    }
  }, [status, router]);

  // 로딩 중일 때 빈 화면 반환
  if (status === "loading") {
    return null;
  }

  // 파일 업로드 핸들러
  const handleFileUpload = async (file: File) => {
    const MAX_FILE_SIZE = 3 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      console.error("파일이 너무 큽니다. 3MB 이하 파일만 업로드 가능합니다.");
      alert("파일이 너무 큽니다. 3MB 이하 파일만 업로드 가능합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = session?.accessToken;
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setFileIds((prevIds) => [...prevIds, result.file.id]);
        console.log("파일 업로드 성공:", result.file);
      } else {
        console.error("파일 업로드 실패:", await response.text());
      }
    } catch (error) {
      console.error("API 호출 중 오류:", error);
    }
  };

  // 게시글 등록 핸들러
  const handleSubmitPost = async () => {
    const postData = {
      title,
      content,
      tags,
      file_ids,
      type: selectedGender,
      style: selectedStyle,
      comments: [],
    };

    console.log("게시글 데이터 준비됨:", postData);

    try {
      const token = session?.accessToken; // 인증 토큰 확인
      if (!token) {
        alert("로그인이 필요합니다.");
        return; // 근데 이게 필요한 가? 위에서 세션 검사하는디
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("게시글 생성 성공:", result);

        // 성공 시 alert 메시지 출력
        alert("게시글이 생성되었습니다.");

        // 생성된 게시글의 상세페이지로 이동
        router.push(`/styles/post/${result.post_id}`); // API 응답의 게시글 ID 사용
      } else {
        const errorData = await response.text();
        console.error("게시글 생성 실패:", errorData);
      }
    } catch (error) {
      console.error("API 호출 중 오류:", error);
    }
  };

  return (
    <div>
      {/* 상단 헤더 */}
      <div className="my-2 mr-2 ml-4 h-[44px] flex items-center bg-white relative justify-between">
        <BackButton onBack={() => router.back()} />
        <HeaderTitle title="스타일 올리기" />
        <button onClick={handleSubmitPost} className="font-bold">
          등록
        </button>
      </div>

      {/* 내용 작성 부분 */}
      <div className="px-6">
        <PhotoUpload onFileUpload={handleFileUpload} />
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full placeholder-gray-400 mb-2 focus:outline-none"
            placeholder="제목을 입력해주세요..."
          />
        </div>
        <div className="h-24 text-sm">
          <Textarea
            value={content} // 상태 전달
            onChange={(value) => setContent(value)} // 상태 업데이트
          />
        </div>

        {/* 태그 입력 */}
        <div className="mb-1">
          <TagInput
            onTagsChange={(tags) => {
              console.log("태그 리스트:", tags);
              setTags(tags);
            }}
          />
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-[1px] border-gray-100"></div>

      {/* 유형 선택 */}
      <div className="p-6">
        <div className="mb-8">
          <p className="font-semibold mb-4">유형</p>
          <GenderSelector
            options={["남성", "여성"]}
            onChange={(selectedOption) => setSelectedGender(selectedOption)}
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
            onChange={(selectedOption) => setSelectedStyle(selectedOption)}
          />
        </div>
      </div>
    </div>
  );
}
