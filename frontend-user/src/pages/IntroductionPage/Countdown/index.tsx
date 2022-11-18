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
            "text-[64px] leading-[80px] font-normal font-oswald w-[64px]",
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
      "text-[60px] leading-[60px] pt-2",
      "xs:text-[80px] xs:leading-[80px]",
      styles.textStroke,
    )}
  >
    :
  </span>
);

const Countdown = () => {
  const { day, hour, minute, second } = useCountDown(new Date("11/20/2022"));

  return (
    <div
      className={clsx(
        styles.background,
        "grid lg:mt-20 lg:grid-cols-2 lg:gap-[47px] lg:px-[48px] lg:py-[60px]",
      )}
    >
      <div
        className={clsx(
          "flex flex-col w-full py-10 lg:py-[72px] rounded-[32px] text-white justify-center items-center relative",
          styles.banner,
        )}
      >
        <span
          className={clsx(
            "text-18/32 font-tthovesBold tracking-[3px] uppercase",
            "lg:text-22/32",
          )}
        >
          20 Nov ~ 18 Dec, 2022
        </span>
        <span className={clsx("text-14/32", "lg:text-18/32")}>
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
      <div className="mt-4 text-white">
        <div className="text-40/52 font-tthoves font-semibold">
          The testnet is open for everyone
        </div>
        <p className="text-18/32 font-inter xs:pt-4">
          To ensure a <strong>successful mainnet launch</strong> following the
          success of
          <strong>Firebird private testnet</strong>, we would like to invite the
          community to join us in our{" "}
          <strong>1st public testnet campaign.</strong>
        </p>
        <button className="btn-rounded bg-main xs:px-[43px] xs:mt-[48px]">
          Private Testnet Report
        </button>
      </div>
    </div>
  );
};

export default Countdown;
