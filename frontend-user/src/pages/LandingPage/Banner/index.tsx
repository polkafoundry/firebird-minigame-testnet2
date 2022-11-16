import clsx from "clsx";
import { SocialItemTypes, socialsData } from "../../../constants";
import styles from "./banner.module.scss";

const Banner = () => {
  const bannerSocials = [socialsData[0], socialsData[4], socialsData[5]];

  return (
    <div
      className={clsx(
        "mt-10 mb-[-84px] px-5 lg:px-[100px] text-white max-w-screen-main w-full mx-auto",
      )}
    >
      <div
        className={clsx(
          "pt-[45px] pb-[64px] flex flex-col justify-center items-center rounded-[32px]",
          styles.bannerBackground,
        )}
      >
        <div className="w-[136px]">
          <img src="/images/landing-page/banner-text.png" />
        </div>
        <div className="mt-5 md:max-w-[480px] text-56/60 font-tthoves font-semibold text-center">
          Hit The Leaderboard now!
        </div>
        <p className="mt-[14px]">Be in World Cup trend with our latest news!</p>
        <div className="mt-7 flex flex-wrap justify-center space-x-3">
          {bannerSocials.map((item: SocialItemTypes) => (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              key={item.username}
              className="flex items-center mb-3 space-x-3 bg-black rounded-xl py-3 px-7 w-[260px] lg:w-[294px]"
            >
              <img src={item.img} alt="" className="w-10 h-10" />
              <div className="flex flex-col">
                <span className="text-14/24 font-normal">{item.label}</span>
                <span className="text-22/32 font-semibold">
                  {item.username}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
