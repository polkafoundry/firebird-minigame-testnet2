import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import DefaultLayout from "../../components/layout/DefaultLayout";

const EventCountdownPage = () => {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "buildUnity/BuildsNoLogin.loader.js",
    dataUrl: "buildUnity/BuildsNoLogin.data",
    frameworkUrl: "buildUnity/BuildsNoLogin.framework.js",
    codeUrl: "buildUnity/BuildsNoLogin.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <DefaultLayout>
      <div className="flex flex-col mx-auto pt-40 max-w-screen-main pb-20">
        <div className="relative w-full h-[600px]">
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
