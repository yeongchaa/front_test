"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CommentInput from "@/components/post/CommentInput";
import AuthorInfo from "@/components/post/AuthorInfo";
import CommentIcon from "@/components/post/CommentIcon";
import BackButton from "@/components/common/BackButton";
import HeaderTitle from "@/components/common/HeaderTitle";
import HashtagList from "@/components/post/HashtagList";
import SlideCarousel from "@/components/post/SlideCarousel";
import Like from "@/components/Masonry/like";
import CommentBox from "@/components/post/CommentBox";
import { formatDistanceToNow, differenceInDays, format } from "date-fns";
import { ko } from "date-fns/locale";

export default function PostDetailPage() {
  interface Comment {
    id: string;
    username: string;
    content: string;
    created_at: string;
    likes: number;
    parent_id: string | null; // 부모 ID (null이면 댓글, 값이 있으면 답글)
  }

  interface PostData {
    username: string;
    created_at: string;
    title: string;
    content: string;
    tags: string[];
    files: { file_path: string }[];
    like_users: string[];
    like_count: number;
    comments: Comment[];
  }

  const [postData, setPostData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comment, setComment] = useState("");
  const [replyParentId, setReplyParentId] = useState<string | null>(null);
  const [replyToUsername, setReplyToUsername] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { data: session } = useSession();

  const commentInputRef = useRef<HTMLDivElement>(null);

  if (typeof id !== "string") {
    throw new Error("Invalid post ID");
  }

  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) throw new Error("Failed to fetch post data");

      const data = await response.json();
      setPostData(data);
    } catch (err) {
      console.error("Error fetching post:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setComment(value);
  };

  const handleCommentSubmit = async () => {
    const targetId = replyParentId || id; // 답글의 경우 parent_id 사용, 댓글은 게시글 ID 사용
    const scrollPosition = window.scrollY;

    if (!comment.trim()) return;
    if (!session) {
      alert("로그인이 필요합니다.");
      router.push("/auth/login");
      return;
    }

    try {
      const response = await fetch(`/api/posts/${targetId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          content: comment.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("댓글 등록 실패");
      }

      console.log("댓글 등록 성공");

      await fetchPostDetail();

      window.scrollTo(0, scrollPosition);

      setComment("");
      setReplyParentId(null);
      setReplyToUsername(null);
    } catch (err) {
      console.error("댓글 등록 에러:", err);
    }
  };

  const handleReplyClick = (parentId: string, username: string) => {
    console.log("Reply Parent ID:", parentId); // 확인 로그
    console.log("Reply Username:", username); // 확인 로그
    setReplyParentId(parentId); // 답글의 부모 ID 설정
    setReplyToUsername(username); // 답글 대상 사용자 이름 설정

    // 입력 필드에 포커스 및 커서를 끝으로 이동
    if (commentInputRef.current) {
      commentInputRef.current.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(commentInputRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  const handleCancelReply = () => {
    setReplyParentId(null);
    setReplyToUsername(null);
  };

  useEffect(() => {
    console.log("Fetching post details...");
    fetchPostDetail();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error || !postData) return <div>게시물을 불러올 수 없습니다.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-[44px] flex items-center px-[16px] bg-white">
        <div className="flex item-center">
          <BackButton onBack={() => router.back()} />
        </div>
        <div className="flex-grow flex justify-center">
          <HeaderTitle title="게시물" />
        </div>
      </div>

      <div className="py-2 px-4">
        <AuthorInfo
          userName={postData.username}
          createdAt={postData.created_at}
          showTime={true}
        />
      </div>

      <div className="flex-1">
        <SlideCarousel
          images={postData.files.map(
            (file: { file_path: string }) => file.file_path
          )}
        />
      </div>

      <div className="py-3 px-4">
        <div className="flex items-center justify-end space-x-4">
          <Like
            size="large"
            postId={id}
            likeUsers={postData.like_users}
            initialCount={postData.like_count}
          />
          <CommentIcon />
        </div>

        <div className="pt-[13px]">
          <h2 className="text-xl font-bold">{postData.title}</h2>
          <p className="text-gray-700 mt-2">{postData.content}</p>
        </div>

        <HashtagList
          hashtags={postData.tags.map((tag: string) => ({
            text: `#${tag}`,
            href: "#",
          }))}
        />
      </div>

      <div className="pt-2 border-t border-gray-300 bg-white">
        {postData.comments && postData.comments.length > 0 ? (
          postData.comments.map((comment: any) => (
            <CommentBox
              key={comment.id}
              id={comment.id}
              userName={comment.username}
              content={comment.content}
              uploadTime={
                comment.created_at
                  ? differenceInDays(new Date(), new Date(comment.created_at)) >
                    7
                    ? format(new Date(comment.created_at), "yyyy-MM-dd")
                    : formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                        locale: ko,
                      })
                  : "시간 정보 없음"
              }
              likes={comment.likes}
              onReplyClick={(parentId, username) => {
                console.log("onReplyClick called with:", parentId, username);
                handleReplyClick(parentId, username);
              }}
              replies={comment.replies}
            />
          ))
        ) : (
          <div className="flex flex-col items-center py-8">
            <p className="text-[13px] text-[rgba(34,34,34,0.8)]">
              첫번째로 댓글을 남겨보세요.
            </p>
            <button
              className="rounded-[10px] text-[13px] border border-black h-[30px] px-[10px] py-[7px] mt-[10px]"
              onClick={() => {
                setReplyParentId(null); // 댓글 작성이므로 parent_id를 null로
                setReplyToUsername(null); // 답글 대상 사용자 초기화
                commentInputRef.current?.focus(); // 입력 필드에 포커스
              }}
            >
              댓글쓰기
            </button>
          </div>
        )}
      </div>

      <div
        className="sticky bottom-0 bg-white"
        style={{
          borderTop: "0.8px solid rgba(34, 34, 34, 0.05)",
        }}
      >
        {replyToUsername && (
          <div className="px-4 py-2 bg-gray-100 text-sm text-gray-700 flex items-center justify-between">
            <span>@{replyToUsername}님에게 답글쓰기</span>
            <button onClick={handleCancelReply} className="text-red-500">
              X
            </button>
          </div>
        )}
        <CommentInput
          onChange={handleChange}
          value={comment}
          onSubmit={handleCommentSubmit}
          inputRef={commentInputRef}
        />
      </div>
    </div>
  );
}
