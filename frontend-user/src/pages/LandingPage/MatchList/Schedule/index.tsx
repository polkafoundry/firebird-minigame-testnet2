import clsx from "clsx";
import { useEffect, useState } from "react";
import { rounds } from "../../../../constants";
import { getCurrentRound } from "../../../../utils";
import HeadingPrimary from "../../components/HeadingPrimary";
import styles from "./schedule.module.scss";

const schedules = [
  {
    title: "Group stage",
    time: "Nov 20-Dec 02",
    rounds: [rounds[0].value, rounds[1].value, rounds[2].value],
  },
  { title: "Round of 16", time: "Dec 03-06", rounds: [rounds[3].value] },
  { title: "Quarter-finals", time: "Dec 09-10", rounds: [rounds[4].value] },
  { title: "Semi-finals", time: "Dec 13-14", rounds: [rounds[5].value] },
  { title: "Third-place match", time: "Dec 17", rounds: [rounds[6].value] },
  { title: "Final", time: "Dec 18", rounds: [rounds[7].value] },
];

const Schedule = () => {
  const [scheduleActivatingIndex, setScheduleActivatingIndex] = useState<any>();
  useEffect(() => {
    const currentRound = getCurrentRound();
    const activatingIndex = schedules.findIndex((schedule) => {
      return schedule?.rounds?.includes(currentRound?.value);
    });
    setScheduleActivatingIndex(activatingIndex < 4 ? activatingIndex : 4);
  }, []);

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
            {schedules.map((item, index) => (
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
                      index === scheduleActivatingIndex || index === 5
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
                    "flex w-28 sm:py-8 sm:w-full ",
                    index % 2 === 0
                      ? "sm:justify-start sm:h-full"
                      : "sm:justify-end",
                  )}
                >
                  {index === scheduleActivatingIndex && (
                    <div className="w-full">
                      <img
                        src="./images/landing-page/football.png"
                        alt=""
                        className={clsx(
                          "w-[60px] sm:w-[90px] translate-y-[-15px]",
                          scheduleActivatingIndex === 0
                            ? "sm:translate-x-[-45px]"
                            : "translate-x-[-20px] sm:translate-x-0 mx-auto",
                          scheduleActivatingIndex % 2 === 0
                            ? "sm:translate-y-0"
                            : "sm:translate-y-[30px]",
                        )}
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
