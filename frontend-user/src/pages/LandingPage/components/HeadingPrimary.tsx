import clsx from "clsx";
import styles from "./headingPrimary.module.scss";

type HeadingPrimaryProps = {
  title: string;
  backroundTitle?: string;
  backgroundColor?: string;
  titleColor?: string;
  isColorSecondary?: boolean;
};

const HeadingPrimary = (props: HeadingPrimaryProps) => {
  const {
    title,
    backroundTitle = title,
    backgroundColor = "text-white",
    titleColor = "text-black",
    isColorSecondary,
  } = props;
  return (
    <div className="text-black relative">
      <p
        className={clsx(
          styles.headingPrimaryGradient,
          backgroundColor,
          isColorSecondary ? styles.colorSecondary : styles.colorPrimary,
        )}
      >
        {backroundTitle}
      </p>
      <div className="flex items-center justify-center absolute bottom-3 w-full">
        <h5 className={clsx(styles.headingPrimary, titleColor, "mr-[15px]")}>
          {title}
        </h5>
      </div>
    </div>
  );
};

export default HeadingPrimary;
