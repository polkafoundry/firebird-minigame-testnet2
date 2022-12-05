import clsx from "clsx";
import HeadingPrimary from "../../components/HeadingPrimary";
import styles from "./schedule.module.scss";

const schedule = [
  { title: "Group stage", time: "Nov 20-Dec 02" },
  { title: "Round of 16", time: "Dec 03-06" },
  { title: "Quarter-finals", time: "Dec 09-10" },
  { title: "Semi-finals", time: "Dec 13-14" },
  { title: "Third-place match", time: "Dec 17" },
  { title: "Final", time: "Dec 18" },
];

const Schedule = () => {
  return (
    <div
      className={clsx(
        "pt-[20px] text-white mt-3 relative",
        "xs:pt-[100px]",
        "md:pt-[140px]",
        styles.scheduleBg,
      )}
    >
      <div className="absolute w-full h-full top-[15%] sm:top-[23%]">
        <div className="max-w-screen-main mx-auto">
          <HeadingPrimary
            backroundTitle="SCHEDULE"
            title="2022 Qatar World Cup Schedule"
            backgroundColor="text-[#3e0016]"
            titleColor="text-white"
            isColorSecondary={true}
          />
          <div
            className={clsx(
              "grid grid-rows-5 sm:flex sm:flex-row mt-[40px] sm:mt-[-90px] lg:mt-[-140px] main:mt-[-100px] mx-16 main:mx-20 relative",
              styles.schedule,
            )}
          >
            {schedule.map((item, index) => (
              <div
                key={item.title}
                className={clsx(
                  "flex flex-row-reverse relative z-10 h-[97px] sm:grid sm:grid-rows-2 sm:h-[480px]",
                )}
              >
                <div
                  className={clsx(
                    "flex flex-col flex-1 h-full sm:py-8 z-10",
                    index % 2 === 0
                      ? "sm:justify-end"
                      : "row-[2] sm:justify-start",
                  )}
                >
                  <div
                    className={clsx(
                      index === 0 || index === 5
                        ? styles.titleActive
                        : styles.title,
                    )}
                  >
                    {item.title}
                  </div>
                  <div className={styles.time}>{item.time}</div>
                </div>
                <div
                  className={clsx(
                    "flex w-28 sm:py-8 sm:w-fit",
                    index % 2 === 0 ? "sm:justify-start" : "sm:justify-end",
                  )}
                >
                  {index === 0 && (
                    <div className="w-[60px] sm:w-[90px]">
                      <img
                        src="./images/landing-page/football.png"
                        alt=""
                        className="w-full translate-y-[-15px] sm:translate-y-0 sm:translate-x-[-45px]"
                      />
                    </div>
                  )}
                  {index === 5 && (
                    <div className="w-[60px] sm:w-[70px]">
                      <img
                        src="./images/landing-page/cup.png"
                        alt=""
                        className="translate-y-[-50px] sm:translate-y-0 sm:translate-x-[35px]"
                      />
                    </div>
                  )}
                </div>
                <div
                  className={clsx(
                    "absolute w-full h-full flex items-start sm:items-center z-[9] pl-20 pt-3 sm:pl-0 sm:pt-0",
                    index === 0
                      ? "justify-start"
                      : index === 5
                      ? "sm:justify-end"
                      : "sm:justify-center",
                  )}
                >
                  <div className="w-2.5 h-1 sm:w-1 sm:h-[14px] bg-white"></div>
                </div>
              </div>
            ))}
            <div className={styles.dotContainer}>
              <div className={styles.dot}>
                ..........................................................
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
