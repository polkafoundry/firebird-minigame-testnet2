import clsx from "clsx";
import styles from "./headingPrimary.module.scss";

type HeadingPrimaryProps = {
  title: string;
  backroundTitle?: string;
  backgroundColor?: string;
  titleColor?: string;
  textAlign?: string;
  backroundTitleAlign?: string;
  isColorSecondary?: boolean;
};

const HeadingPrimary = (props: HeadingPrimaryProps) => {
  const {
    title,
    backroundTitle = title,
    backgroundColor = "text-white",
    titleColor = "text-black",
    textAlign = "text-center",
    backroundTitleAlign = "items-center",
    isColorSecondary,
  } = props;
  return (
    <div className={clsx("text-black relative overflow-hidden")}>
      <div className={clsx("flex flex-col", backroundTitleAlign)}>
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
      </div>
      <h5
        className={clsx(
          styles.headingPrimary,
          titleColor,
          textAlign,
          "mr-[15px]",
        )}
      >
        {title}
      </h5>
    </div>
  );
};

export default HeadingPrimary;
