import clsx from "clsx";

type BorderBoxProps = {
  label: string;
  icon?: string;
  className?: string;
  onClick?: any;
};

const BorderBox = (props: BorderBoxProps) => {
  const { label, icon, className = "", onClick } = props;
  return (
    <div
      className={clsx(
        "flex space-x-2 justify-center items-center px-6 py-2 border rounded-xl",

        className,
      )}
      onClick={onClick}
    >
      {icon && <img src={icon} className="w-4 h-4" alt="" />}
      <span>{label}</span>
    </div>
  );
};

export default BorderBox;
