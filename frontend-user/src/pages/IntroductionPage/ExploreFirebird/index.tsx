import clsx from "clsx";
import styles from "./explore.module.scss";

type ExploreTypes = {
  img: string;
  title: string;
  url: string;
  detail: string;
};

const dataExplore: Array<ExploreTypes> = [
  {
    img: "/images/introduction/documents.png",
    title: "Documents",
    url: "https://docs.firebirdchain.com/",
    detail: "See comprehensive instructions on using Firebird testnet.",
  },
  {
    img: "/images/introduction/birdscan.png",
    title: "BirdScan",
    url: "https://firefly.birdscan.io/",
    detail: "See transactions updated quickly, accurately and transparently.",
  },
  {
    img: "/images/introduction/birdswap.png",
    title: "BirdSwap",
    url: "/#",
    detail: "Quickly and conveniently swap tokens.",
  },
  {
    img: "/images/introduction/birdfaucet.png",
    title: "Faucet",
    url: "https://faucet.firefly.firebirdchain.com/",
    detail:
      "Simple redirect to claim testnet tokens to your wallet ($PKF, $USDT, $BIRD).",
  },
];

const ExploreFirebird = () => {
  return (
    <div
      className={clsx(
        "w-full bg-white rounded-[32px]",
        "mt-[100px] px-12 pt-[60px] pb-20",
      )}
    >
      <p className="m-0 font-semibold text-40/52 text-center">
        Explore Firebird Chain with
      </p>
      <div className="grid mt-7 grid-cols-2 gap-6">
        {dataExplore.map((item: ExploreTypes, index: number) => (
          <a
            key={index}
            href={item.url}
            className={clsx(styles.cardHover, "flex p-8")}
            target={"_blank"}
            rel="noreferrer"
          >
            <div className="flex h-fit">
              <img src={item.img} alt="" className="h-[140px]" />
              <div className="flex flex-col ml-8 justify-center">
                <span className="font-semibold text-28/36">{item.title}</span>
                <span className="text-16/24 font-inter mt-3">
                  {item.detail}
                </span>
              </div>
            </div>
            <img
              src="/images/introduction/icon-open.svg"
              alt=""
              className={clsx(styles.iconOpen, "bottom-7 right-10 absolute")}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ExploreFirebird;
