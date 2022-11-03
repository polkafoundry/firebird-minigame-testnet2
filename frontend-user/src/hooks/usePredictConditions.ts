import { useEffect, useState } from "react";
import { useMyWeb3 } from "./useMyWeb3";

type ConditionTypes = {
  network: boolean;
  birdToken: boolean;
  gasFee: boolean;
};
const fakeBirdToken = "4000";

const usePredictConditions = () => {
  const { isWrongChain, realTimeBalance, nativeCurrency, account } =
    useMyWeb3();

  const [predictConditions, setPredictConditions] = useState<ConditionTypes>({
    birdToken: false,
    gasFee: false,
    network: false,
  });

  useEffect(() => {
    const eligible: ConditionTypes = {
      birdToken: !!(account && +fakeBirdToken > 0),
      gasFee: !!(account && +realTimeBalance > 0),
      network: !!(account && !isWrongChain),
    };
    setPredictConditions(eligible);
  }, [isWrongChain, realTimeBalance, nativeCurrency, account]);

  return predictConditions;
};

export default usePredictConditions;
