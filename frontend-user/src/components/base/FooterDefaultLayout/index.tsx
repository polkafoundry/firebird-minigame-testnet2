import Tippy from "@tippyjs/react";
import clsx from "clsx";
import {
  LANDING_PAGE_URL,
  SocialItemTypes,
  socialsData,
} from "../../../constants";

const buyPkfExchanges = [
  {
    name: "Uniswap",
    url: "https://app.uniswap.org/#/swap?outputCurrency=0x8B39B70E39Aa811b69365398e0aACe9bee238AEb",
  },
  {
    name: "Ascendex",
    url: "https://ascendex.com/en/basic/cashtrade-spottrading/usdt/pkf",
  },
  {
    name: "Gate.io",
    url: "https://www.gate.io/trade/pkf_usdt",
  },
  {
    name: "Kucoin",
    url: "https://www.kucoin.com/trade/PKF-USDT",
  },
];

const siteMaps = [
  {
    label: "Bird Nest",
    url: LANDING_PAGE_URL + "bird-nest",
  },
  {
    label: "Documentation",
    url: "https://docs.firebirdchain.com/",
  },
  {
    label: "Community",
    url: LANDING_PAGE_URL + "community",
  },
  {
    label: "FAQ",
    url: LANDING_PAGE_URL + "faq",
  },
];

const FooterDefaultLayout = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={clsx("text-white w-full md:pt-[48px]", "bg-black")}>
      <div
        className={clsx(
          "flex flex-col relative max-w-screen-main mx-auto pb-7 text-center pt-[60px] box-border",
          "md:px-40 md:pt-24 md:text-left",
        )}
      >
        <div
          className={clsx(
            "top-5 right-5 absolute cursor-pointer",
            "md:top-[60px] md:right-[84px]",
          )}
          onClick={handleScrollToTop}
        >
          <img
            src="/images/icon-scroll-to-top.svg"
            className="w-8 h-8 md:w-10 md:h-10"
            alt=""
          />
        </div>

        <div className="w-full flex px-7">
          <div className="flex flex-col max-w-full w-full md:max-w-[300px] items-center md:items-start">
            <div className="flex">
              <img src="/images/logo-text.svg" alt="" />
            </div>
            <p className="text-14/24 mt-3">
              Follow us on Firebird official groups and channels so you won’t
              miss anything!
            </p>
            <div className="flex gap-3 mt-3">
              {socialsData.map(
                (item: SocialItemTypes, index: number) =>
                  item?.username && (
                    <Tippy key={index} content={item.label} placement="bottom">
                      <a
                        key={index}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className={clsx({
                          "pointer-events-none": !item.username,
                        })}
                      >
                        <img src={item.img} alt="" width={28} height={28} />
                      </a>
                    </Tippy>
                  ),
              )}
            </div>
          </div>

          <div className="hidden md:flex mt-auto ml-auto">
            <div className="flex flex-col max-w-[250px]">
              <p className="font-semibold">BUY PKF</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {buyPkfExchanges.map((item: any, index: number) => (
                  <a
                    href={item.url}
                    key={index + 100}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full max-w-[120px] hover:underline"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col ml-20 max-w-[250px]">
              <p className="font-semibold">Sitemap</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {siteMaps.map((item: any, index: number) => (
                  <a
                    key={index + 100}
                    href={item.url}
                    target={"_blank"}
                    rel="noreferrer"
                    className="w-full max-w-[120px] hover:underline"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="text-14/24 text-center text-[#AEAEAE] xs:text-white md:mt-16 mt-3">
          Copyright © 2022 . All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default FooterDefaultLayout;
