// '댓글 쓰기'버튼
import React from "react";

interface CommentButtonProps {
  onClick: () => void; // 버튼 클릭 이벤트 핸들러
}

const CommentButton: React.FC<CommentButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-[10px] py-[7px] border-2 border-black rounded-xl mt-[10px] "
    >
      댓글 쓰기
    </button>
  );
};

export default CommentButton;
