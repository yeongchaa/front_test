import React from "react";
import Link from "next/link";

interface ClickableTextProps {
  text: string; // 표시할 텍스트
  href: string; // 이동할 URL
}

const LinkText: React.FC<ClickableTextProps> = ({ text, href }) => {
  return (
    <Link href={href} className="text-[13px]">
      {text}
    </Link>
  );
};

export default LinkText;
