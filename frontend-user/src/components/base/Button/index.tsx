import React from "react";
import clsx from "clsx";

type ButtonProps = {
  className?: string;
  children: any;
};

const buttonStyles = {
  hoverAnimated: "duration-500 hover:tracking-widest",
  button:
    "flex h-14 rounded-[60px] items-center tracking-wider text-lg font-birdMedium cursor-pointer",
};

const Button = (props: ButtonProps) => {
  const { className = "", children } = props;

  return (
    <div
      className={clsx(
        buttonStyles.button,
        buttonStyles.hoverAnimated,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Button;
