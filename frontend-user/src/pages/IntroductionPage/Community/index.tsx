import clsx from "clsx";
import { SocialItemTypes, socialsData } from "../../../constants";
import styles from "./community.module.scss";

const Community = () => {
  return (
    <div className={clsx("w-full pt-[60px] xs:pt-20 pb-20")}>
      <div
        className={clsx(
          styles.bgCommunity,
          "flex flex-col w-full text-white rounded-[28px] pb-10 pt-[60px] px-5",
          "xs:px-[60px] xs:bg-center",
          "md:pt-16 md:pb-11 md:rounded-[32px] lg:gap-5 lg:flex-row md:pl-20 md:pr-[60px]",
        )}
      >
        <div
          className={clsx(
            "flex flex-col-reverse max-w-[440px] w-full items-center text-center mx-auto",
            "lg:flex-col lg:items-start lg:text-left lg:mx-0",
          )}
        >
          <p className="text-3xl xs:text-5xl md:text-[44px] md:leading-[54px] font-semibold">
            Need support?
            <br />
            Or have suggestion?
          </p>
          <div
            className="relative block sm:hidden lg:block md:mt-10"
            data-aos="zoom-in"
          >
            <img src="/images/introduction/img-bell.png" alt="" />
          </div>
        </div>

        <div className="flex flex-col pt-3">
          <p className="text-sm xs:text-22px md:text-lg text-center md:text-left">
            We'd love hear from you. <br /> Send us comments, suggestions,
            messages or anything about your experience in regards with our
            public testnet campaign.
          </p>

          <div
            className={clsx(
              "grid grid-cols-1 gap-2 text-white mt-10",
              "sm:grid-cols-2 sm:gap-3",
            )}
          >
            {socialsData.map((item: SocialItemTypes, index: number) => (
              <a
                href={item.username ? item.url : "#"}
                target="_blank"
                rel="noreferrer"
                className={clsx(
                  styles.cardCommunityHover,
                  "rounded-xl py-3 px-7 flex items-center gap-3",
                  { "pointer-events-none": !item.username },
                )}
                key={index + 2000}
              >
                <div className="relative">
                  <img src={item.img} alt="" className="w-10 h-10" />
                </div>
                <div className="flex flex-col w-full">
                  <span className="text-sm md:text-base">{item.label}</span>
                  <span className="text-lg md:text-[22px] md:leading-[32px] font-semibold">
                    {item.username || "Coming soon"}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
