import clsx from "clsx";
import HeadingPrimary from "../../components/HeadingPrimary";

// const schedule = [
//   { title: "Group stage", time: "Nov 20-Dec 02" },
//   { title: "Round of 16", time: "Dec 03-06" },
//   { title: "Quarter-finals", time: "Dec 09-10" },
//   { title: "Semi-finals", time: "Dec 13-14" },
//   { title: "Third-place match", time: "Dec 17" },
//   { title: "Final", time: "Dec 18" },
// ];

const Schedule = () => {
  return (
    <div
      className={clsx(
        "pt-[px] text-white mt-3 relative",
        // "xs:pt-[100px]",
        // "md:pt-[140px]",
        // styles.scheduleBg,
      )}
    >
      <img
        src="./images/landing-page/schedule-bg.png"
        alt=""
        className="w-full"
      />
      <div className="absolute w-full h-full top-[23%]">
        <HeadingPrimary
          backroundTitle="SCHEDULE"
          title="2022 Qatar World Cup Schedule"
          backgroundColor="text-[#3e0016]"
          titleColor="text-white"
          isColorSecondary={true}
        />
        <div className="px-10 -mt-10 md:px-10 2md:px-[120px] 2md:-mt-12">
          <img
            src="./images/landing-page/schedule.png"
            alt=""
            className="w-full"
          />
        </div>
        {/* <div
          className={clsx(
            "flex mt-[-120px] lg:mt-[-45px] px-12 main:px-20 relative overflow-hidden",
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
                      ? "text-28/36 text-main"
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
                  <div className="w-16 lg:w-[90px]">
                    <img
                      src="./images/landing-page/football.png"
                      alt=""
                      className="translate-x-[-32px] lg:translate-x-[-45px] w-full"
                    />
                  </div>
                )}
                {index === 5 && (
                  <div className="w-12 lg:w-[70px]">
                    <img
                      src="./images/landing-page/cup.png"
                      alt=""
                      className="text-end translate-x-[24px] lg:translate-x-[35px]"
                    />
                  </div>
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
          
        </div> */}
      </div>
    </div>
  );
};

export default Schedule;
