import clsx from "clsx";
import { useState } from "react";

import { useLocation } from "react-router-dom";

type RouteTypes = {
  label: string;
  uri: string;
};

const routes: Array<RouteTypes> = [
  {
    label: "Bird nest",
    uri: "/bird-nest",
  },
  {
    label: "Community",
    uri: "/community",
  },
  {
    label: "Documentation",
    uri: "https://docs.firebirdchain.com/",
  },
  {
    label: "FAQ",
    uri: "/faq",
  },
];

const HeaderDefaultLayout = () => {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  console.log(location);

  const handleOpenHeader = () => {
    setOpen((prevState) => !prevState);
  };

  const renderHeaderMobile = () => {
    if (!open) return <></>;

    return (
      <div className="fixed top-0 left-0 w-full h-screen overflow-y-auto bg-[#04060C] flex flex-col p-5 pb-8 z-50">
        <div className="flex justify-between">
          <img src="/images/logo-text.svg" alt="" />
          <img
            src="/images/icon-close.svg"
            alt=""
            onClick={handleOpenHeader}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-6 text-white justify-center w-full text-center text-lg font-semibold mt-10">
          {routes.map((item: RouteTypes, index: number) => (
            <a
              key={index}
              href={item.uri}
              className={clsx("hover:tracking-wider duration-500", {
                // "text-main": asPath === item.uri,
              })}
            >
              {item.label}
            </a>
          ))}
        </div>
        <p className="mt-auto text-main text-center font-semibold uppercase tracking-widest">
          Community
        </p>
        {/* <div className="flex gap-3 mt-4 w-full justify-center">
          {socialsData.map((item: SocialItemTypes, index: number) => (
            <a href={item.url} className={clsx("w-10 h-10")} key={index + 1000}>
              <img src={item.img} alt="" />
            </a>
          ))}
        </div> */}
      </div>
    );
  };

  return (
    <>
      <nav
        className={clsx(
          "absolute -translate-x-1/2 left-1/2 h-20 w-full flex items-center justify-between max-w-screen-main text-white",
          "md:px-[120px]",
          "xs:px-[60px]",
          "pl-5 pr-6",
        )}
      >
        <a href="/">
          <img src="/images/logo-text.svg" alt="" />
        </a>
        <div className={clsx("gap-5 hidden", "md:flex")}>
          {routes.map((item: RouteTypes, index: number) => (
            <a
              key={index}
              href={item.uri}
              className={clsx("hover:tracking-wider duration-500", {
                // "text-main": asPath === item.uri,
              })}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div
          className={clsx("block cursor-pointer", "md:hidden")}
          onClick={handleOpenHeader}
        >
          <img src="/images/icon-menu.svg" alt="" />
        </div>
      </nav>

      {renderHeaderMobile()}
    </>
  );
};

export default HeaderDefaultLayout;