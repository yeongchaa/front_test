"use client";

import { useState, useEffect, useCallback } from "react";
import SearchHeader from "@/components/post/SearchHeader";
import BottomNavigation from "@/components/common/BottomNavigation";
import Sort from "@/components/common/Sort";
import PostCardGrid from "@/components/Masonry/PostCardGrid";
import { PostCardProps } from "@/components/Masonry/PostCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [allPosts, setAllPosts] = useState<PostCardProps[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [sort, setSort] = useState("popularity");
  const router = useRouter();
  const { data: session } = useSession();

  // Fetch posts from API
  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/posts?page=${page}`);
      const data = await response.json();

      if (data.posts) {
        const formattedData = formatPosts(data.posts);
        setAllPosts((prev) => [...prev, ...formattedData]);
        setPosts(sortData([...allPosts, ...formattedData], sort));
        setNextPage(data.nextPage || null);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  const formatPosts = (posts: any[]): PostCardProps[] => {
    return posts.map((item) => {
      const textToDisplay = item.title || item.content || item.tags?.join(", ");
      const firstImage = item.files?.[0]?.file_path
        ? item.files[0].file_path.startsWith("http")
          ? item.files[0].file_path
          : `https://your-server.com${item.files[0].file_path}`
        : "/default.png";

      const isLiked =
        session?.user?.id && item.like_users?.includes(session.user.id);

      return {
        id: item.id,
        socialImg: {
          src: firstImage,
          alt: "게시글 이미지",
          imageCount: item.files?.length || 0,
        },
        cardDetail: {
          profileImage: {
            src: "/default.png",
            alt: `${item.username || "프로필 이미지"}`,
          },
          userName: { text: item.username, type: "small" },
          like: {
            size: "small",
            postId: item.id,
            likeUsers: item.like_users,
            initialCount: item.like_count,
          },
          textBox: { text: textToDisplay },
        },
        type: item.type,
        style: item.style,
        like_count: item.like_count,
        created_at: item.created_at,
        isLiked,
        onClick: () => handlePostClick(item.id), // onClick 속성 추가
      };
    });
  };

  const sortData = (
    data: PostCardProps[],
    sortType: string
  ): PostCardProps[] => {
    if (sortType === "popularity") {
      return [...data].sort((a, b) => b.like_count - a.like_count);
    }
    if (sortType === "latest") {
      return [...data].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    return data;
  };

  // Handle sort change
  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setPosts(sortData(allPosts, newSort));
  };

  // Handle infinite scroll
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 &&
      !loading &&
      nextPage !== null
    ) {
      setIsFetching(true);
    }
  }, [loading, nextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isFetching && nextPage !== null) {
      fetchPosts(nextPage);
    }
  }, [isFetching, nextPage]);

  useEffect(() => {
    fetchPosts(1);
  }, []);

  // Navigate to post details
  const handlePostClick = (postId: string) => {
    router.push(`/styles/post/${postId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SearchHeader />
      <Sort onSortChange={handleSortChange} />
      <div className="flex-1 px-4 pb-2">
        <PostCardGrid posts={posts} onPostClick={handlePostClick} />
        {loading && (
          <p className="text-center text-gray-500 mt-4">로딩 중...</p>
        )}
      </div>
      <div className="sticky bottom-0">
        <BottomNavigation />
      </div>
    </div>
  );
}
