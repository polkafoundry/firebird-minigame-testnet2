import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { useMyWeb3 } from "../../hooks/useMyWeb3";

const EventCountdownPage = () => {
  const { account } = useMyWeb3();

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
  useEffect(() => {
    if (!account) return;

    sendMessage("JavascriptHook", "SetWalletAddress", account);
  }, [account]);

  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <DefaultLayout>
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
