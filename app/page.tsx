//루트페이지, 전체 게시글 목록(스타일 모아보기 화면)

import SearchHeader from "@/components/post/SearchHeader";
import BottomNavigation from "@/components/common/BottomNavigation";
import Sort from "@/components/common/Sort";
import Masonry from "@/components/post/Masonry";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/** 검색창 헤더 UI */}
      <SearchHeader />
      <Sort />

      <div className="flex-1 px-4 pb-4">
        <Masonry />
      </div>

      {/** 하단 네비게이션 */}
      <div className="sticky bottom-0">
        <BottomNavigation />
      </div>
    </div>
  );
}
