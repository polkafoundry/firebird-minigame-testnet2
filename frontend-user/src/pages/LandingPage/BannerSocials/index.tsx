import clsx from "clsx";
import { SocialItemTypes, socialsData } from "../../../constants";
import styles from "./banner.module.scss";

const BannerSocials = () => {
  const bannerSocials = [socialsData[0], socialsData[4], socialsData[5]];

  return (
    <div
      className={clsx(
        "mt-[60px] px-3 mb-10 text-white max-w-screen-main w-full mx-auto",
        "md:mt-[120px] md:px-5 md:mb-[-84px] lg:px-[100px]",
      )}
    >
      <div
        className={clsx(
          "relative pt-8 pb-12 px-7 md:pt-[45px] md:pb-[64px] rounded-[32px]",
          styles.bannerBackground,
        )}
      >
        <div className="flex flex-col justify-center items-center z-[2] relative">
          <div className="w-[97px] md:w-[136px]">
            <img src="/images/landing-page/banner-text.png" />
          </div>
          <div
            className="flex flex-col mt-2 text-36/48 text-center font-tthoves font-semibold md:mt-5 md:max-w-[480px] md:text-56/60"
            data-aos="fade-up"
          >
            <span>Hit The</span> Leaderboard now!
          </div>
          <p
            className="mt-2 text-14/24 md:mt-[14px] md:text-18/32"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Be in World Cup trend with our latest news!
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-x-3">
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
                  <span className="text-18/24 md:text-22/32 font-semibold font-tthoves">
                    {item.username}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {
          <div className="hidden md:block">
            <img
              src="/images/banner/harry-kane.png"
              alt=""
              className={clsx("absolute z-[1] bottom-0 left-0 max-w-[360px]")}
              data-aos="fade-left"
            />
            <img
              src="/images/banner/benzema-2.png"
              alt=""
              className={clsx("absolute z-[1] bottom-0 right-0 max-h-[90%]")}
              data-aos="fade-right"
            />
          </div>
        }
      </div>
    </div>
  );
};

export default BannerSocials;
