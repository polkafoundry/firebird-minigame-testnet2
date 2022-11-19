import clsx from "clsx";
import styles from "./banner.module.scss";

const imgBenzema = "/images/banner/benzema.png";
const imgMessi = "/images/banner/messi.png";
const imgModric = "/images/banner/modric.png";
const imgNeymar = "/images/banner/neymar.png";
const imgRonaldo = "/images/banner/ronaldo.png";

const HomeBanner = () => {
  const renderMobile = () => {
    return (
      <div
        className={clsx(
          "sm:hidden relative flex flex-col min-h-[720px] h-full text-center items-center text-white pt-28",
          styles.homeBanner,
        )}
      >
        <span
          className={"text-[72px] leading-[80px] font-semibold tracking-wider"}
        >
          Phoenix Cup
        </span>
        <span className={"text-20/28 font-semibold"}>
          Hype Bird on Fire 🔥 🔥 🔥
        </span>
        <span className={"text-14/20 mt-7 font-semibold"}>
          Join FIREBIRD Testnet for sure fire win! 👇🏼
        </span>
        <div
          className={clsx(
            styles.rewardBg,
            "flex items-center justify-center mt-1 z-0",
          )}
        >
          <img
            src="/images/banner/money-reward.png"
            alt=""
            className="w-[30%]"
          />
          <div className="flex flex-col ml-[1.38vw]">
            <span className="font-semibold text-12/16 uppercase">
              total rewards
            </span>
            <span className="text-40/52 font-tthovesBold italic">$6,820</span>
          </div>
        </div>

        <img
          src="/images/banner/all-players-xs.png"
          alt=""
          className="absolute -bottom-10 mt-auto"
        />
      </div>
    );
  };

  return (
    <>
      <div
        id="banner"
        className={clsx(
          "sm:block hidden w-full pt-20 h-screen relative",
          styles.homeBanner,
        )}
      >
        <div
          className={clsx(
            styles.bannerText,
            "flex flex-col text-white font-semibold z-[3]",
          )}
        >
          <span
            className={"text-[8.33vw] leading-[8.33vw] mb-[1%] tracking-wider"}
          >
            Phoenix Cup
          </span>
          <span className={"text-[2.78vw] leading-[2.78vw] mb-[8%]"}>
            Hype Bird on Fire 🔥 🔥 🔥
          </span>
          <span className={"text-[1.39vw]"}>
            Join FIREBIRD Testnet for sure fire win! 👇🏼
          </span>
        </div>
        <div
          className={clsx(
            styles.rewardBg,
            styles.rewardPosition,
            "flex items-center text-white",
          )}
        >
          <img
            src="/images/banner/money-reward.png"
            alt=""
            className="w-[30%]"
          />
          <div className="flex flex-col ml-[1.38vw]">
            <span className="font-semibold text-[1.11vw] uppercase">
              total rewards
            </span>
            <span className="text-[4.72vw] leading-[4.72vw] font-tthovesBold italic">
              $6,820
            </span>
          </div>
        </div>

        <div className="relative right-0 h-full">
          <img
            src={imgRonaldo}
            alt=""
            className={clsx(styles.imgRonaldo, "absolute")}
            data-aos="fade-up"
            data-aos-delay="350"
          />
          <img
            src={imgBenzema}
            alt=""
            className={clsx(styles.imgBenzema, "absolute")}
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-anchor="#banner"
          />
          <img
            src={imgMessi}
            alt=""
            className={clsx(styles.imgMessi, "absolute")}
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-anchor="#banner"
          />
          <img
            src={imgModric}
            alt=""
            className={clsx(styles.imgModric, "absolute")}
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-anchor="#banner"
          />
          <img
            src={imgNeymar}
            alt=""
            className={clsx(styles.imgNeymar, "absolute")}
            data-aos="fade-up"
            data-aos-anchor="#banner"
          />
        </div>
      </div>

      {renderMobile()}
    </>
  );
};

export default HomeBanner;
