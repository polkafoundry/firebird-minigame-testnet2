import clsx from "clsx";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
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
        <span
          className={clsx(
            "text-[64px] leading-[80px] font-normal font-oswald w-[64px]",
            "xs:text-[100px] xs:leading-[100px] xs:w-[100px]",
            "lg:text-[200px] lg:leading-[200px] lg:w-[200px]",
          )}
        >
          {value}
        </span>
        <span className="text-main mt-2 md:mt-10 text-10/32 xs:text-16/24 lg:text-20/28 uppercase font-semibold">{`[ ${label} ]`}</span>
      </div>
    </>
  );
};

const ColonField = () => (
  <span
    className={clsx(
      "text-[60px] leading-[60px] pt-2",
      "xs:text-[80px] xs:leading-[80px]",
      "lg:text-[120px] lg:leading-[120px] lg:pt-10",
      styles.textStroke,
    )}
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
        "flex bg-[#F7F7F8] rounded-[20px] h-[72px] px-6 items-center cursor-pointer w-full md:max-w-[384px]",
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
      <span className="text-20/32 md:text-22/32 font-semibold">{label}</span>
    </a>
  );
};

const EventCountdownPage = () => {
  const { account } = useMyWeb3();

  const { day, hour, minute, second } = useCountDown(new Date("11/20/2022"));

  const { unityProvider, isLoaded, sendMessage } = useUnityContext({
    loaderUrl: "buildUnity/BuildProd.loader.js",
    dataUrl: "buildUnity/BuildProd.data",
    frameworkUrl: "buildUnity/BuildProd.framework.js",
    codeUrl: "buildUnity/BuildProd.wasm",
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
        <span
          className={clsx(
            "text-40/52 font-semibold",
            "xs:text-56/60 md:text-80/80",
          )}
        >
          Phoenix Cup
        </span>
        <span
          className={clsx(
            "text-14/32 tracking-widest font-semibold uppercase",
            "xs:text-20/32 md:text-24/32 md:mt-2",
          )}
        >
          🔥 coming soon 🔥
        </span>
        <div className="flex space-x-1.5 md:space-x-8 mt-10">
          <TimeField label="days" value={day} />
          <ColonField />

          <TimeField label="HOURS" value={hour} />
          <ColonField />

          <TimeField label="MINUTES" value={minute} />
          <ColonField />

          <TimeField label="SECONDS" value={second} />
        </div>
        <span className="text-14/32 xs:text-18/32 lg:text-24/32 tracking-widest mt-5 md:mt-7 font-semibold">
          [ 12 UTC - Sunday, 20th Nov 2022 ]
        </span>

        <img
          src="/images/scoll-down.svg"
          className={clsx("absolute right-1/2 bottom-10", styles.scrollDown)}
          alt=""
        />
      </div>

      <div
        className={clsx(
          "flex flex-col mx-auto pt-10 max-w-screen-main pb-16 items-center px-5",
          "xs:px-10 md:py-20 md:px-20 lg:px-[160px]",
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 font-tthoves">
          <div className="flex flex-col">
            <span className="text-28/36 xs:text-32/40 md:text-40/52 font-semibold">
              Fly with Firebird
            </span>
            <p className="mt-3 md:mt-2 mb-0 text-14/24 xs:text-16/24 md:text-18/32 font-inter">
              Let’s warm up with our mini game while waiting for the big news.
              Top 10 scorers will share a prize pool of{" "}
              <span className="rounded-[4px] bg-main p-1 text-white font-semibold">
                $100
              </span>
            </p>
            <div
              className={clsx(
                "bg-black flex items-center rounded-3xl w-full text-white py-[14px] px-4 mt-6",
                "md:py-[10px] md:px-8 md:mt-8 md:w-fit",
              )}
            >
              <img
                src="/images/icon-clock.svg"
                alt=""
                className="w-5 h-5 mr-2"
              />
              <span className="font-semibold text-14/20 md:text-20/28">
                12:00 UTC Nov 15 ~ 17:00 UTC Nov 19, 2022
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2 mt-6 md:mt-0">
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
            "w-full max-w-[960px] h-[180px] text-white flex flex-col items-center relative",
            "xxs:h-[250px] xs:h-[350px] sm:h-[450px] md:h-[600px] mt-[100px]",
            styles.gameFrame,
          )}
        >
          {isMobile && (
            <p
              className={clsx(
                "text-16/20 font-semibold mt-16 px-14 text-center",
                styles.colorTitle,
              )}
            >
              Please play this game using PC or laptop.
            </p>
          )}
          {!isMobile && (
            <>
              {!isLoaded ? (
                <>
                  <p
                    className={clsx(
                      "text-16/20 xs:text-26/32 md:text-40/52 font-semibold mt-5 text-center",
                      styles.colorTitle,
                    )}
                  >
                    Play your game in seconds
                  </p>
                  <div
                    className={clsx(
                      styles.btnPlay,
                      "w-20 xs:w-32 md:w-[160px]",
                    )}
                  >
                    <img
                      src="/images/btn-play.svg"
                      alt=""
                      className={styles.bgBtnPlay}
                    />
                    <img
                      src="/images/icon-play.svg"
                      alt=""
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 xs:w-6 md:w-10"
                    />
                  </div>
                </>
              ) : null}
              <Unity className="w-full h-full" unityProvider={unityProvider} />
            </>
          )}
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
