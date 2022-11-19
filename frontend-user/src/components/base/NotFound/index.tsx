type NotFoundProps = {
  title: string;
  darkMode?: boolean;
};

const NotFound = (props: NotFoundProps) => {
  const { title, darkMode = false } = props;
  return (
    <>
      <img
        src={
          darkMode
            ? "./images/icon-not-found-light.svg"
            : "./images/icon-not-found.svg"
        }
        alt=""
        className="w-[90px] h-[90px] md:w-[125px] md:h-[125px]"
      />
      <p className="mt-8 text-18/32 font-inter">{title}</p>
    </>
  );
};

export default NotFound;
