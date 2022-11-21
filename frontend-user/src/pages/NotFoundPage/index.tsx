import clsx from "clsx";
import styles from "./notFound.module.scss";

const NotFoundPage = () => {
  return (
    <>
      <div
        className={clsx(
          styles.bg,
          "relative w-screen h-screen text-white text-center",
        )}
      >
        <div className="w-full absolute top-0 max-w-screen-main left-1/2 -translate-x-1/2 h-20 flex items-center z-20 px-20">
          <a href="/">
            <img src="/images/logo-text.svg" alt="" />
          </a>
        </div>

        <div className="flex w-full h-full justify-center items-center">
          <div className="flex flex-col">
            <span
              className={clsx(
                "font-oswald font-semibold text-[120px] leading-[140px] ",
                "xs:text-[160px] xs:leading-[160px] ",
              )}
            >
              404
            </span>
            <span className="mt-2 text-28/36 xs:text-32/40 font-semibold">
              Page Not Found
            </span>
            <span className="mt-3 text-14/24 xs:text-16/24 opacity-80 max-w-[320px] xs:max-w-none">
              The page you are looking for doesn't exist or has been moved.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
