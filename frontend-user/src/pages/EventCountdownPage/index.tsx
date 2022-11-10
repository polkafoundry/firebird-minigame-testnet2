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
        <span className="text-[200px] leading-[200px] font-semibold">
          {value}
        </span>
        <span className="text-main mt-10 text-20/28 uppercase font-semibold">{`[ ${label} ]`}</span>
      </div>
    </>
  );
};

const EventCountdownPage = () => {
  const { account } = useMyWeb3();

  const { day, hour, minute, second } = useCountDown(new Date("11/11/2022"));

  const { unityProvider, isLoaded, loadingProgression, sendMessage } =
    useUnityContext({
      loaderUrl: "buildUnity/BuildTestJavascriptHook.loader.js",
      dataUrl: "buildUnity/BuildTestJavascriptHook.data",
      frameworkUrl: "buildUnity/BuildTestJavascriptHook.framework.js",
      codeUrl: "buildUnity/BuildTestJavascriptHook.wasm",
      webglContextAttributes: {
        preserveDrawingBuffer: true,
      },
    });

  // sending address to unity
  useEffect(() => {
    if (!account) return;

    sendMessage("JavascriptHook", "SetWalletAddress", account);
  }, [account]);

  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <DefaultLayout>
      <div
        className={clsx(
          "flex flex-col w-full h-screen text-white justify-center items-center relative",
          styles.banner,
        )}
      >
        <span className="text-80/80 font-semibold">Phoenix Cup</span>
        <span className="text-24/32 tracking-widest font-semibold mt-2">
          🔥 coming soon 🔥
        </span>
        <div className="flex space-x-8 mt-16">
          <TimeField label="days" value={day} />
          <span className="text-[120px] leading-[120px] pt-10">:</span>

          <TimeField label="HOURS" value={hour} />
          <span className="text-[120px] leading-[120px] pt-10">:</span>

          <TimeField label="MINUTES" value={minute} />
          <span className="text-[120px] leading-[120px] pt-10">:</span>

          <TimeField label="SECONDS" value={second} />
        </div>
        <span className="text-24/32 tracking-widest mt-7 font-semibold">
          [ 12 UTC - Sunday, 20th Nov 2022 ]
        </span>

        <img
          src="/images/scoll-down.svg"
          className={clsx("absolute top-1/2 right-10", styles.scrollDown)}
          alt=""
        />
      </div>

      <div className="flex flex-col mx-auto pt-40 max-w-screen-main pb-20 items-center">
        <div className="relative w-full max-w-[960px] h-[600px]">
          {isLoaded === false && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-500 flex justify-center items-center">
              <p>Loading... ({loadingPercentage}%)</p>
            </div>
          )}
          <Unity className="w-full h-full" unityProvider={unityProvider} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EventCountdownPage;
