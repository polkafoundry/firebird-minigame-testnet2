import clsx from "clsx";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { URLS } from "../../../constants";
import { WalletContext } from "../../../context/WalletContext";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import { displayWalletAddress } from "../../../utils";
import Button from "../Button";

type RouteTypes = {
  label: string;
  uri: string;
};

const routes: Array<RouteTypes> = [
  {
    label: "Event",
    uri: URLS.EVENT,
  },
  {
    label: "Firefly Testnet",
    uri: URLS.FAUCET_TESTNET,
  },
  {
    label: "Firebird Cup",
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
    <div className="w-full bg-black absolute h-20 flex justify-center z-20">
      <nav
        className={clsx(
          "w-full h-full flex items-center justify-between max-w-screen-main text-white",
          "md:px-[120px]",
          "xs:px-[60px]",
          "pl-5 pr-6",
        )}
      >
        <a href="/">
          <img src="/images/logo-text.svg" alt="" />
        </a>
        <div className={clsx("gap-5 hidden", "md:flex md:items-center")}>
          {routes.map((item: RouteTypes, index: number) => (
            <a
              key={index}
              href={item.uri}
              className={clsx(
                location.pathname === item.uri
                  ? "text-main font-semibold"
                  : "hover:text-red-500",
              )}
            >
              {item.label}
            </a>
          ))}
          <Button
            className="bg-main p-[2px] h-10 rounded-md"
            onClick={openConnectModal}
          >
            {connectedAccount ? (
              <div className="flex text-sm h-full">
                <div className="px-[10px] flex items-center font-semibold">
                  {`${isWrongChain ? 0 : realTimeBalance} ${nativeCurrency}`}
                </div>
                <div className="flex bg-black items-center rounded-md px-2">
                  {displayWalletAddress(connectedAccount)}
                </div>
              </div>
            ) : (
              <span className="font-semibold">Connect Wallet</span>
            )}
          </Button>
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
