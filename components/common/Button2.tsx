import React from "react";

type ButtonProps = {
  size?: "small" | "medium" | "large";
  label: string;
  color?: "primary" | "secondary" | "third";
  onClick?: () => void;
  marginTop?: string;
  width?: string;
};

const Button = ({
  size = "large", // 기본 사이즈를 large로 설정
  label,
  color = "primary", // 기본 색상을 primary로 설정
  onClick,
  marginTop = "0px",
  width = "auto",
}: ButtonProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return { height: "34px", padding: "10px 7px", fontSize: "14px" };
      case "medium":
        return { height: "40px", padding: "10px 20px" };
      case "large":
        return { height: "54px", padding: "10px 20px" };
      default:
        return {};
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return "bg-[#EBEBEB] hover:bg-black text-[#71747D] hover:text-white";
      case "secondary":
        return "bg-gray-500 hover:bg-gray-700 text-white";
      case "third":
        return "bg-white text-[#363A40] border-[#E3E3E3] font-bold";
      default:
        return "";
    }
  };

  const sizeStyles = getSizeClasses();

  return (
    <button
      type="button"
      className={`${getColorClasses()} bg-center bg-no-repeat border rounded-md flex items-center justify-center`}
      onClick={onClick}
      style={{
        borderRadius: "6px",
        borderWidth: "1px",
        marginTop,
        width,
        ...sizeStyles,
      }}
    >
      {label}
    </button>
  );
};

export default Button;
