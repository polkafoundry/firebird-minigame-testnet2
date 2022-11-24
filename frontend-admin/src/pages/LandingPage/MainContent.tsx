import { useEffect } from "react";

type MainContentProps = {
  statistics: any;
};

const MainContent = (props: MainContentProps) => {
  const { statistics } = props;

  useEffect(() => {
    if (!statistics) return;
  }, [statistics]);

  return (
    <div className="w-full justify-center items-center flex py-10">
      <div className="flex space-x-3">
        {statistics?.map((item: any, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center border border-black p-3"
          >
            <span className="uppercase">{item?.label || "N/A"}</span>
            <span className="font-semibold">{item?.value || "N/A"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
