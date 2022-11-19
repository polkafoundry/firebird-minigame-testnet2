import clsx from "clsx";
import { useCountDown } from "../../../hooks/useCountDown";
import styles from "./countdown.module.scss";

type TimeFieldProps = { value: string; label: string };

const TimeField = ({ value, label }: TimeFieldProps) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <span
          className={clsx(
            "text-[50px] leading-[50px] font-normal font-oswald w-[50px]",
            "xs:text-[100px] xs:leading-[100px] xs:w-[100px]",
          )}
        >
          {value}
        </span>
        <span className="text-main mt-2 xs:mt-3 text-10/32 xs:text-14/32 uppercase font-semibold">{`[ ${label} ]`}</span>
      </div>
    </>
  );
};

const ColonField = () => (
  <span
    className={clsx(
      "text-[50px] leading-[50px] pt-0 xs:pt-2",
      "xs:text-[80px] xs:leading-[80px]",
      styles.textStroke,
    )}
  >
    :
  </span>
);

const Countdown = () => {
  const { day, hour, minute, second } = useCountDown(
    new Date(Date.UTC(2022, 11, 18, 0, 0, 0)),
  );

  return (
    <div
      className={clsx(
        styles.background,
        "flex flex-col px-3 pt-5 pb-8 mt-5 relative overflow-hidden",
        "xs:px-10 xs:py-10",
        "md:mt-10 md:px-[48px] md:py-[60px]",
        "2md:flex-row lg:mt-20",
      )}
    >
      <div className="hidden 2md:block 2md:absolute top-[-300px] right-[-350px] w-[800px] h-[800px] z-[9]">
        <img src="./images/introduction/countdown-blur.svg" alt="" />
      </div>
      <div
        className={clsx(
          "z-10 w-full 2md:w-1/2 flex flex-col py-10  rounded-[32px] text-white justify-center items-center relative",
          "xs:py-16 md:py-[72px] 2md:min-w-[550px]",
          styles.banner,
        )}
      >
        <span
          className={clsx(
            "text-18/32 font-tthovesBold tracking-[3px] uppercase",
            "2md:text-22/32",
          )}
        >
          20 Nov ~ 18 Dec, 2022
        </span>
        <span className={clsx("text-14/32", "2md:text-18/32")}>
          The testnet ends in
        </span>
        <div className="flex space-x-1.5 mt-5">
          <TimeField label="days" value={day} />
          <ColonField />
          <TimeField label="HOURS" value={hour} />
          <ColonField />
          <TimeField label="MINUTES" value={minute} />
          <ColonField />
          <TimeField label="SECONDS" value={second} />
        </div>
      </div>
      <div className="z-10 flex-1 mt-4 text-white 2md:ml-5 lg:ml-[47px]">
        <div className="text-32/40 text-center font-tthoves font-semibold md:text-40/52 2md:text-left 2md:max-w-[320px]">
          The testnet is open for everyone
        </div>
        <p className="pt-2 text-center text-14/24 font-inter md:pt-4 md:text-18/32 2md:text-left">
          To ensure a <strong>successful mainnet launch</strong> following the
          success of
          <strong> Firebird private testnet</strong>, we would like to invite
          the community to join us in our{" "}
          <strong>1st public testnet campaign.</strong>
        </p>
        <button className="w-full mx-auto btn-rounded bg-main mt-5 px-[43px] xs:w-auto 2md:mx-0 2md:mt-[48px]">
          Private Testnet Report
        </button>
      </div>
    </div>
  );
};

export default Countdown;
