import clsx from "clsx";

type InputSearchProps = {
  className?: string;
  value: string;
  placeholder?: string;
  onChange: (e: any) => void;
  isDarkMode?: boolean;
  onClear?: () => void;
};

const InputSearch = (props: InputSearchProps) => {
  const {
    className,
    value,
    onChange,
    placeholder,
    isDarkMode = false,
    onClear,
  } = props;

  return (
    <div className={clsx(className, "flex items-center")}>
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        className="outline-none bg-transparent min-w-0 flex-1 text-14/24 font-inter"
        value={value}
        onChange={onChange}
      />
      {onClear && value && (
        <img
          src={
            isDarkMode
              ? "./images/components/input-search/icon-close-input-dark.svg"
              : "./images/components/input-search/icon-close-input-light.svg"
          }
          alt=""
          className="cursor-pointer mr-2"
          onClick={onClear}
        />
      )}
      <img
        src={
          isDarkMode
            ? "./images/components/input-search/icon-search-white.svg"
            : "./images/components/input-search/icon-search-black.svg"
        }
        alt=""
        className="cursor-pointer w-4 h-4"
      />
    </div>
  );
};

export default InputSearch;
