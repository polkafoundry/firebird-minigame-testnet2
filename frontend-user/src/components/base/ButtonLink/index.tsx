import clsx from "clsx";

type ButtonLinkProps = {
  to: string;
  target?: React.HTMLAttributeAnchorTarget;
  className?: string;
  children: any;
  onClick?: () => void;
};

const buttonStyles = {
  hoverAnimated: "duration-500 hover:tracking-widest",
  button:
    "flex h-10 items-center tracking-wider text-lg font-birdMedium cursor-pointer",
};

const ButtonLink = (props: ButtonLinkProps) => {
  const { to, target, className = "", children, onClick } = props;

  return (
    <a
      href={to}
      target={target ?? "_blank"}
      className={clsx(
        buttonStyles.button,
        // buttonStyles.hoverAnimated,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default ButtonLink;
