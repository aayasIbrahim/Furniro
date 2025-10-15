import React from "react";

type ButtonProps = {
  text?: string;
  onClick?: () => void;
  className?: string;
  variant?: "outline" | "solid";
  color?: string;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  text = "Click Me",
  onClick,
  className = "",
  variant = "outline",
  color = "#B88E2F",
  type = "button",
}) => {
  const baseStyle = `font-semibold px-10 py-4 rounded-lg transition-all duration-200 ${className}`;

  const styles: Record<string, string> = {
    outline: `text-[${color}] border border-[${color}] hover:shadow-md`,
    solid: `bg-[${color}] text-white hover:opacity-90`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${styles[variant]}`}
    >
      {text}
    </button>
  );
};

export default Button;
