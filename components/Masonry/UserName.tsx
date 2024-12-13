// userName
"use client";
import React from "react";

interface UserNameProps {
  text: string;
  type?: "small" | "medium";
  className?: string;
}

const UserName: React.FC<UserNameProps> = ({
  text,
  type = "small",
  className,
}) => {
  const styles = {
    small: "text-[12px] text-gray-600",
    medium: "text-[14px] text-gray-600",
  };

  return <span className={`${styles[type]} ${className}`}>{text}</span>;
};

export default UserName;
