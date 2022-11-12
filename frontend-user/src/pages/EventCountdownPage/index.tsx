import clsx from "clsx";
import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { useCountDown } from "../../hooks/useCountDown";
import { useMyWeb3 } from "../../hooks/useMyWeb3";
import styles from "./event.module.scss";

type TimeFieldProps = { value: string; label: string };

const TimeField = ({ value, label }: TimeFieldProps) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <span className="text-[200px] leading-[200px] font-normal font-oswald w-[200px]">
          {value}
        </span>
        <span className="text-main mt-10 text-20/28 uppercase font-semibold">{`[ ${label} ]`}</span>
      </div>
    </>
  );
};

const ColonField = () => (
  <span
    className={clsx("text-[120px] leading-[120px] pt-10", styles.textStroke)}
  >
    :
  </span>
);

const CustomField = ({
  label,
  iconUri,
  href,
}: {
  label: string;
  iconUri: string;
  href: string;
}) => {
  return (
    <a
      href={href}
      className={clsx(
        styles.iconHoverAnimated,
        "flex bg-[#F7F7F8] rounded-[20px] h-[72px] px-6 items-center cursor-pointer w-full max-w-[384px]",
      )}
    >
      <div
        className={clsx(
          styles.image,
          "relative mr-4 flex items-center justify-center",
        )}
      >
        <img
          src="/images/icon-hover-border.svg"
          alt=""
          className={styles.iconHoverBorder}
        />
        <img src={iconUri} alt="" className={styles.iconBackground} />
      </div>
      <span className="text-22/32 font-semibold">{label}</span>
    </a>
  );
};

const EventCountdownPage = () => {
  const { account } = useMyWeb3();

  const { day, hour, minute, second } = useCountDown(new Date("11/20/2022"));

  const { unityProvider, isLoaded, sendMessage } = useUnityContext({
    loaderUrl: "buildUnity/BuildFlyWithFirebirds.loader.js",
    dataUrl: "buildUnity/BuildFlyWithFirebirds.data",
    frameworkUrl: "buildUnity/BuildFlyWithFirebirds.framework.js",
    codeUrl: "buildUnity/BuildFlyWithFirebirds.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  // sending address to unity
  useEffect(() => {
    if (!account) return;

    sendMessage("JavascriptHook", "SetWalletAddress", account);
  }, [account, isLoaded]);

  // const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <DefaultLayout>
      <div
        className={clsx(
          "flex flex-col w-full h-screen text-white justify-center items-center relative",
          styles.banner,
        )}
      >
        <span className="text-80/80 font-semibold">Phoenix Cup</span>
        <span className="text-24/32 tracking-widest font-semibold mt-2 uppercase">
          🔥 coming soon 🔥
        </span>
        <div className="flex space-x-8 mt-10">
          <TimeField label="days" value={day} />
          <ColonField />

          <TimeField label="HOURS" value={hour} />
          <ColonField />

          <TimeField label="MINUTES" value={minute} />
          <ColonField />

          <TimeField label="SECONDS" value={second} />
        </div>
        <span className="text-24/32 tracking-widest mt-7 font-semibold">
          [ 12 UTC - Sunday, 20th Nov 2022 ]
        </span>

        <img
          src="/images/scoll-down.svg"
          className={clsx("absolute right-1/2 bottom-10", styles.scrollDown)}
          alt=""
        />
      </div>

      <div className="flex flex-col mx-auto pt-40 max-w-screen-main pb-20 items-center px-20 lg:px-[160px]">
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            <span className="text-40/52 font-semibold">Fly with Firebird</span>
            <p className="mt-2 mb-0 text-18/32">
              Let’s warm up with our mini game while waiting for the big news.
              Top 10 scorers will share a prize pool of{" "}
              <span className="rounded-[4px] bg-main p-1 text-white font-semibold">
                $100
              </span>
            </p>
            <div className="bg-black flex items-center rounded-3xl w-fit text-white py-[10px] px-8 mt-8">
              <img
                src="/images/icon-clock.svg"
                alt=""
                className="w-5 h-5 mr-2"
              />
              <span className="font-semibold text-20/28">
                12:00 UTC Nov 15 ~ 17:00 UTC Nov 19, 2022
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <CustomField
              href="/"
              iconUri="/images/icon-hover-search.svg"
              label="How to play"
            />
            <CustomField
              href="/"
              iconUri="/images/icon-hover-gift.svg"
              label="Reward distribution"
            />
          </div>
        </div>

        <div
          className={clsx(
            "w-full max-w-[960px] h-[600px] mt-[100px] text-white flex flex-col items-center relative",
            styles.gameFrame,
          )}
        >
          {!isLoaded ? (
            <>
              <p
                className={clsx(
                  "text-40/52 font-semibold mt-16",
                  styles.colorTitle,
                )}
              >
                Play your game in seconds
              </p>
              <div className={styles.btnPlay}>
                <img
                  src="/images/btn-play.svg"
                  alt=""
                  className={styles.bgBtnPlay}
                />
                <img
                  src="/images/icon-play.svg"
                  alt=""
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </>
          ) : null}
          <Unity className="w-full h-full" unityProvider={unityProvider} />
        </div>

        <img src="/images/powered-mirai.png" alt="" />

        {/* <div className="relative w-full max-w-[960px] h-[600px] mt-[100px]">
          {isLoaded === false && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-500 flex justify-center items-center">
              <p>Loading... ({loadingPercentage}%)</p>
            </div>
          )}
          <Unity className="w-full h-full" unityProvider={unityProvider} />
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default EventCountdownPage;
