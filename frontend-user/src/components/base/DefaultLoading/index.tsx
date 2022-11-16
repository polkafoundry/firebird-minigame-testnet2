import clsx from "clsx";
import styles from "./loadingTable.module.scss";

const DefaultLoading = () => {
  return (
    <div className="absolute w-full h-full z-[5] bg-[rgba(0,0,0,0.4)] flex justify-center items-center">
      <div className={styles.loading}>
        <div className={clsx(styles.circle, styles.circle1)}></div>
        <div className={clsx(styles.circle, styles.circle2)}></div>
      </div>
    </div>
  );
};

export default DefaultLoading;
