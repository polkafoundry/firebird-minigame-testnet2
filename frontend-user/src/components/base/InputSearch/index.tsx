type InputSearchProps = {
  className?: string;
  value: string;
  placeholder?: string;
  onChange: (e: any) => void;
};

const InputSearch = (props: InputSearchProps) => {
  const { className, value, onChange, placeholder } = props;

  return (
    <div className={className}>
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        className="outline-none bg-transparent min-w-0 flex-1 text-black"
        value={value}
        onChange={onChange}
      />
      <img src="/images/icon-search.svg" alt="" className="cursor-pointer" />
    </div>
  );
};

export default InputSearch;
