import clsx from "clsx";

type BorderBoxProps = {
  label: string;
  icon?: string;
  className?: string;
  onClick?: any;
  boxType?: string;
};

const BorderBox = (props: BorderBoxProps) => {
  const { label, icon, className = "", onClick, boxType } = props;

  return (
    <div
      className={clsx(
        "flex space-x-2 justify-center w-full min-h-[44px] items-center border rounded-xl",
        className,
      )}
      onClick={onClick}
    >
      {boxType === "over" && (
        <img src="./images/over.svg" className="w-6 h-6" alt="" />
      )}
      {boxType === "under" && (
        <img src="./images/under.svg" className="w-6 h-6" alt="" />
      )}
      {!boxType && icon && <img src={icon} className="w-6 h-6" alt="" />}
      <div className="flex flex-col items-center">
        {boxType === "draw" && (
          <span className="text-12/18 font-inter font-bold opacity-50">
            TOTAL
          </span>
        )}
        <span
          className={clsx(
            "text-16/20 font-tthoves font-semibold",
            boxType !== "draw" && "capitalize",
          )}
        >
          {label.toLowerCase()}
        </span>
      </div>
    </div>
  );
};

export default BorderBox;
