import clsx from "clsx";
import styles from "./headingPrimary.module.scss";

type HeadingPrimaryProps = {
  title: string;
  backroundTitle?: string;
  backgroundColor?: string;
  titleColor?: string;
  textAlign?: string;
  isColorSecondary?: boolean;
};

const HeadingPrimary = (props: HeadingPrimaryProps) => {
  const {
    title,
    backroundTitle = title,
    backgroundColor = "text-white",
    titleColor = "text-black",
    textAlign = "text-center",
    isColorSecondary,
  } = props;
  return (
    <div className="text-black relative">
      <p
        className={clsx(
          styles.headingPrimaryGradient,
          backgroundColor,
          textAlign,
          isColorSecondary ? styles.colorSecondary : styles.colorPrimary,
        )}
      >
        {backroundTitle}
      </p>
      <div className="flex items-center absolute bottom-0 xs:bottom-3 w-full">
        <h5
          className={clsx(
            styles.headingPrimary,
            titleColor,
            textAlign,
            "mr-[15px] w-full",
          )}
        >
          {title}
        </h5>
      </div>
    </div>
  );
};

export default HeadingPrimary;
