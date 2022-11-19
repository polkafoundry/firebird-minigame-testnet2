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
    url: "https://swap.firefly.firebirdchain.com/",
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
        "w-full bg-white rounded-[32px] mt-[100px] px-5 pt-10 pb-5",
        "xs:px-12 xs:pt-[60px] xs:pb-20",
      )}
    >
      <p className="m-0 font-semibold text-32/40 xs:text-40/52 text-center">
        Explore Firebird Chain with
      </p>
      <div className="grid mt-7 grid-cols-1 md:grid-cols-2 gap-6">
        {dataExplore.map((item: ExploreTypes, index: number) => (
          <a
            key={index}
            href={item.url}
            className={clsx(
              styles.cardHover,
              "flex p-5 min-h-[160px]",
              "xs:p-8 xs:min-h-[240px]",
              "md:p-5 md:min-h-[200px]",
              "lg:p-8 lg:min-h-[240px] ",
            )}
            target={"_blank"}
            rel="noreferrer"
          >
            <div className="flex h-fit">
              <img
                src={item.img}
                alt=""
                className="h-20 xs:h-[140px] md:h-28 lg:h-[140px]"
              />
              <div
                className={clsx("flex flex-col ml-4 justify-center", "lg:ml-8")}
              >
                <span className="font-semibold text-20/28 xs:text-28/36">
                  {item.title}
                </span>
                <span className="text-14/24 xs:text-16/24 font-inter mt-3">
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
