import clsx from "clsx";
import React from "react";
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
    <div className={clsx("pt-[140px] mb-20", styles.scheduleBg)}>
      <HeadingPrimary
        backroundTitle="SCHEDULE"
        title="2022 Qatar World Cup Schedule"
        backgroundColor="text-[#3e0016]"
      />
      <div
        className={clsx(
          "flex mt-[-50px] px-20 relative overflow-hidden",
          styles.schedule,
        )}
      >
        {schedule.map((item, index) => (
          <div
            key={item.title}
            className={clsx(
              "relative flex",
              index % 2 === 0 ? "flex-col" : "flex-col-reverse",
            )}
          >
            <div
              className={clsx(
                "h-[240px] flex flex-col py-8",
                index % 2 === 0 ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={clsx(
                  index === 0 || index === 5
                    ? "text-28/36 text-[#EB522F]"
                    : "text-20/28",
                  "font-semibold",
                )}
              >
                {item.title}
              </div>
              <div className="text-16/24 font-normal opacity-80">
                {item.time}
              </div>
            </div>
            <div
              className={clsx(
                "h-[240px] flex py-8",
                index % 2 === 0 ? "items-start" : "items-end",
              )}
            >
              {index === 0 && (
                <img
                  src="./images/landing-page/football.png"
                  alt=""
                  className="translate-x-[-45px]"
                />
              )}
              {index === 5 && (
                <img
                  src="./images/landing-page/cup.png"
                  alt=""
                  className="text-end translate-x-[35px]"
                />
              )}
            </div>
            <div
              className={clsx(
                "absolute h-full flex items-center",
                index % 2 === 0 && "top-3",
              )}
            >
              <div className="h-[14px] w-1 bg-white"></div>
            </div>
          </div>
        ))}

        {/* <div className="absolute w-full h-full flex justify-center text-left">
          <div className="h-[14px] w-1 bg-white"></div>
        </div> */}
        <div
          className={clsx(
            "absolute overflow-hidden h-full flex justify-center",
            styles.dotContainer,
          )}
        >
          <div className={styles.dot}>
            ..........................................................
          </div>
        </div>

        {/* <div className="relative">
          <p className={styles.dot}>.......</p>
          <div className="absolute bottom-6 flex flex-col">
            <span>Group stage</span>
            <span>Nov 20-Dec 02</span>
          </div>
          <div className="absolute top-5 left-0 w-1 h-[14px] bg-white"></div>
        </div> */}
      </div>
    </div>
  );
};

export default Schedule;
