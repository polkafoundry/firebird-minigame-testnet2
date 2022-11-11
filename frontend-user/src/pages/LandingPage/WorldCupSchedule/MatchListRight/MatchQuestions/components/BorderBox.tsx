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
        "flex space-x-2 justify-center w-full min-h-[44px] items-center py-2 border rounded-xl",
        className,
      )}
      onClick={onClick}
    >
      {icon && <img src={icon} className="w-6 h-6" alt="" />}
      <span className="text-16/20 font-tthoves font-semibold capitalize">
        {label.toLowerCase()}
      </span>
    </div>
  );
};

export default BorderBox;
