import clsx from "clsx";

type ButtonStyledProps = {
  title: string;
  className?: string;
  onClick?: (event: any) => void;
};

const ButtonStyled = (props: ButtonStyledProps) => {
  const { title, className = "", onClick } = props;
  return (
    <button
      className={clsx("rounded-[60px] text-18/24 font-semibold p-4", className)}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ButtonStyled;
