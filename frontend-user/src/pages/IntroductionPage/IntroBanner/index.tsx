import clsx from "clsx";
import styles from "./banner.module.scss";

const HomeBanner = () => {
  return (
    <div
      className={clsx(
        "w-full pt-20 h-screen relative text-white",
        styles.homeBanner,
      )}
    >
      <p className="">Firebird Public Tesnet</p>
    </div>
  );
};

export default HomeBanner;
