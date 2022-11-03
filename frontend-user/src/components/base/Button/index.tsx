import clsx from "clsx";

type ButtonProps = {
  className?: string;
  children: any;
  onClick?: () => void;
};

const buttonStyles = {
  hoverAnimated: "duration-500 hover:tracking-widest",
  button:
    "flex h-10 items-center tracking-wider text-lg font-birdMedium cursor-pointer",
};

const Button = (props: ButtonProps) => {
  const { className = "", children, onClick } = props;

  return (
    <div
      className={clsx(
        buttonStyles.button,
        // buttonStyles.hoverAnimated,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
