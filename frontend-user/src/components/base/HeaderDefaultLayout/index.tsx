import clsx from "clsx";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { SocialItemTypes, socialsData, URLS } from "../../../constants";
import { WalletContext } from "../../../context/WalletContext";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import { displayWalletAddress } from "../../../utils";
// import { requestSupportNetwork } from "../../../utils/setupNetwork";
// import styles from "./header.module.scss";

type RouteTypes = {
  label: string;
  uri: string;
};

const routes: Array<RouteTypes> = [
  {
    label: "Firefly Testnet",
    uri: URLS.INTRODUCTION,
  },
  {
    label: "Phoenix Cup",
    uri: URLS.HOME,
  },
  {
    label: "Leaderboard",
    uri: URLS.LEADERBOARD,
  },
  {
    label: "My History",
    uri: URLS.HISTORY,
  },
  {
    label: "FAQs",
    uri: URLS.FAQ,
  },
];

const HeaderDefaultLayout = () => {
  const { setShowModal, connectedAccount } = useContext(WalletContext);
  const { isWrongChain, nativeCurrency, realTimeBalance } = useMyWeb3();

  const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false);
  const location = useLocation();

  const handleOpenHeader = () => {
    setOpenMenuMobile((prevState) => !prevState);
  };

  const openConnectModal = () => {
    setShowModal && setShowModal(true);
  };

  const renderHeaderMobile = () => {
    if (!openMenuMobile) return <></>;

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
              className={clsx({
                "text-main": location.pathname === item.uri,
              })}
            >
              {item.label}
            </a>
          ))}
        </div>
        <p className="mt-auto text-main text-center font-semibold uppercase tracking-widest">
          Community
        </p>
        <div className="flex gap-3 mt-4 w-full justify-center">
          {socialsData.map(
            (item: SocialItemTypes, index: number) =>
              item.username && (
                <a
                  href={item.url}
                  className={clsx("w-10 h-10")}
                  key={index + 1000}
                >
                  <img src={item.img} alt="" className="w-full" />
                </a>
              ),
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-black absolute h-20 flex justify-center z-20">
      <nav
        className={clsx(
          "w-full h-full flex items-center justify-between max-w-screen-main px-5 text-white",
          "main:px-[100px]",
          "lg:px-10",
        )}
      >
        <div className="flex">
          <a href="/">
            <img src="/images/logo-text.svg" alt="" />
          </a>
          <img
            src="/images/landing-page/banner-text.png"
            alt=""
            className="ml-2 hidden 2md:block"
          />
          <div className="ml-5 md:ml-10 lg:ml-[60px] gap-5 lg:gap-10 hidden md:flex md:items-center">
            {routes.map((item: RouteTypes, index: number) => (
              <a
                key={index}
                href={item.uri}
                className={clsx(
                  "font-inter text-14/24 lg:text-16/24",
                  location.pathname === item.uri
                    ? "text-main font-semibold"
                    : "hover:text-red-500",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="hidden md:flex md:items-center">
          {/* {connectedAccount && (
            <button
              className={clsx(
                "ml-5 lg:ml-10 px-4 py-1.5 flex rounded-lg text-14/20 text-white font-tthoves items-center",
                styles.backgroundGradient,
                !isWrongChain && "pointer-events-none",
              )}
              onClick={requestSupportNetwork}
            >
              {!isWrongChain && (
                <img src="./images/icon-edit.svg" alt="" className="mr-1.5" />
              )}
              <span className="flex-1">
                {!isWrongChain ? "FireflyTestnet" : "Switch chain"}
              </span>
            </button>
          )} */}

          <button
            className={clsx(
              "bg-main p-0.5 h-9 rounded-lg text-14/20 font-tthoves",
              !connectedAccount && "min-w-[177px]",
            )}
            onClick={openConnectModal}
          >
            {connectedAccount ? (
              <div className="flex text-12/20 lg:text-sm h-full">
                <div className="px-[10px] flex items-center font-semibold">
                  {!isWrongChain && (
                    <img
                      src="./images/firebird-testnet.svg"
                      alt=""
                      className="mr-1.5"
                    />
                  )}
                  {`${isWrongChain ? 0 : realTimeBalance} ${nativeCurrency}`}
                </div>
                <div className="flex bg-black items-center rounded-md px-2">
                  {displayWalletAddress(connectedAccount)}
                </div>
              </div>
            ) : (
              <span className="font-semibold">Connect Wallet</span>
            )}
          </button>
        </div>
        <div
          className={clsx("block cursor-pointer", "md:hidden")}
          onClick={handleOpenHeader}
        >
          <img src="/images/icon-menu.svg" alt="" />
        </div>
      </nav>

      {renderHeaderMobile()}
    </div>
  );
};

export default HeaderDefaultLayout;
