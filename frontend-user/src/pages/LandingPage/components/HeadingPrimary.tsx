import clsx from "clsx";
import styles from "./headingPrimary.module.scss";

type HeadingPrimaryProps = {
  title: string;
  backroundTitle?: string;
  backgroundColor?: string;
};

const HeadingPrimary = (props: HeadingPrimaryProps) => {
  const {
    title,
    backroundTitle = title,
    backgroundColor = "text-[#030102]",
  } = props;
  return (
    <div className="text-white relative">
      <p className={clsx(styles.headingPrimaryGradient, backgroundColor)}>
        {backroundTitle}
      </p>
      <div className="flex items-center justify-center absolute bottom-0 w-full">
        <div className={clsx(styles.smallSquare, "mr-[12px]")}></div>
        <div className={clsx(styles.largeSquare, "mr-[15px]")}></div>
        <h5 className={clsx(styles.headingPrimary, "mr-[15px]")}>{title}</h5>
        <div className={clsx(styles.largeSquare, "mr-[12px]")}></div>
        <div className={styles.smallSquare}></div>
      </div>
    </div>
  );
};

export default HeadingPrimary;
