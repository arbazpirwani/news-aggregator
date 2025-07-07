import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
    outline:
      "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 focus:ring-blue-300",
  };

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]}`} {...rest}>
      {children}
    </button>
  );
}
