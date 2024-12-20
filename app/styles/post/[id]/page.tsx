"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CommentInput from "@/components/post/CommentInput";
import AuthorInfo from "@/components/post/AuthorInfo";
import CommentIcon from "@/components/post/CommentIcon";
import BackButton from "@/components/common/BackButton";
import HeaderTitle from "@/components/common/HeaderTitle";
import HashtagList from "@/components/post/HashtagList"; // HashtagList 컴포넌트 임포트
import CommentButton from "@/components/post/CommentButton";
import SlideCarousel from "@/components/post/SlideCarousel";
import Like from "@/components/Masonry/like";

export default function PostDetailPage() {
  const [postData, setPostData] = useState<any>(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isCommentInputVisible, setCommentInputVisible] = useState(false);
  const [comment, setComment] = useState("");

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // id가 유효한 string인지 확인
  if (typeof id !== "string") {
    throw new Error("Invalid post ID");
  }

  const handleCommentClick = () => {
    setCommentInputVisible(true);
  };

  const handleChange = (value: string) => {
    setComment(value);
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error("Failed to fetch post data");

        const data = await response.json();
        setPostData(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error || !postData) return <div>게시물을 불러올 수 없습니다.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="h-[44px] flex items-center px-[16px] bg-white">
        <div className="flex item-center">
          <BackButton onBack={() => router.back()} />
        </div>
        <div className="flex-grow flex justify-center">
          <HeaderTitle title="게시물" />
        </div>
      </div>

      {/* 작성자 정보 */}
      <div className="py-2 px-4">
        <AuthorInfo
          userName={postData.username}
          createdAt={postData.created_at}
          showTime={true}
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1">
        <SlideCarousel
          images={postData.files.map(
            (file: { file_path: string }) => file.file_path
          )}
        />
      </div>

      {/* 좋아요 버튼 */}
      <div className="py-3 px-4">
        <div className="flex items-center justify-end space-x-4">
          <Like
            size="large"
            postId={id} // 게시물 ID 전달
            initialLiked={postData.liked} // 초기 좋아요 상태 전달
            initialCount={postData.like_count} // 초기 좋아요 수 전달
          />
          <CommentIcon />
        </div>

        {/* 제목 + 내용 */}
        <div className="pt-[13px]">
          <h2 className="text-xl font-bold">{postData.title}</h2>
          <p className="text-gray-700 mt-2">{postData.content}</p>
        </div>

        {/* 해시태그 리스트 */}
        <HashtagList
          hashtags={postData.tags.map((tag: string) => ({
            text: `#${tag}`,
            href: "#",
          }))}
        />
      </div>

      {/* 댓글 섹션 */}
      {!isCommentInputVisible && (
        <div className="pt-2 h-[129px] flex items-center justify-center border-t border-gray-200">
          <div className="text-center py-8">
            <p>첫번째로 댓글을 남겨보세요.</p>
            <CommentButton onClick={handleCommentClick} />
          </div>
        </div>
      )}

      {/* 댓글 입력 컴포넌트 */}
      {isCommentInputVisible && (
        <div className="sticky bottom-0 bg-white p-4 border-t border-gray-300">
          <CommentInput onChange={handleChange} value={comment} />
        </div>
      )}
    </div>
  );
}
