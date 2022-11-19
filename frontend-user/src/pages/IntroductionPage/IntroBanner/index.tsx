import clsx from "clsx";
import styles from "./banner.module.scss";

const HomeBanner = () => {
  return (
    <div
      className={clsx(
        "w-full pt-20 h-screen text-white flex flex-col overflow-hidden px-5 xs:px-[60px] main:px-[200px] md:flex-row md:items-center",
        styles.homeBanner,
      )}
    >
      <div className="max-w-screen-main w-full mx-auto relative pt-[100px] md:pt-0 flex">
        <div
          className="absolute w-[900px] sm:w-[1000px] md:w-[1300px] top-[200px] right-[-300px] md:top-[-350px] md:right-[-500px] man:right-[-560px] z-[9]"
          data-aos="fade-up"
          data-aos-delay="350"
        >
          <img src="./images/introduction/box.png" className="w-full" />
        </div>
        <div className="z-10 font-tthoves font-semibold w-full text-center md:text-left">
          <p className="text-48/60 md:text-80/80 md:max-w-[500px]">
            Firebird Public Tesnet
          </p>
          <p className="mt-1 text-20/28 md:mt-6 md:text-28/36">
            A community incentive campaign
          </p>
          <button className="mt-3 mx-auto px-[53px] btn-rounded bg-main text-white md:mx-0 md:mt-[54px]">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
