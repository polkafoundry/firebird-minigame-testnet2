import { useContext, useEffect, useState } from "react";
import { BASE_HREF, quickGuide, URLS } from "../../../constants";
import { WalletContext } from "../../../context/WalletContext";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import { displayWalletAddress } from "../../../utils";
import { requestSupportNetwork } from "../../../utils/setupNetwork";
import HeadingPrimary from "../../LandingPage/components/HeadingPrimary";

const iconCheck = "/images/icon-correct-answer.svg";
const iconUnCheck = "/images/icon-wrong-answer.svg";

type ConditionTypes = {
  network: boolean;
  birdToken: boolean;
  gasFee: boolean;
};

const HowToJoin = () => {
  const {
    isWrongChain,
    realTimeBalance,
    nativeCurrency,
    account,
    birdBalance,
  } = useMyWeb3();

  const { setShowModal } = useContext(WalletContext);
  const [predictConditions, setPredictConditions] = useState<ConditionTypes>({
    birdToken: false,
    gasFee: false,
    network: false,
  });

  useEffect(() => {
    const eligible: ConditionTypes = {
      birdToken: !!(account && +birdBalance > 0),
      gasFee: !!(account && +realTimeBalance > 0),
      network: !!(account && !isWrongChain),
    };
    setPredictConditions(eligible);
  }, [isWrongChain, realTimeBalance, nativeCurrency, account]);

  return (
    <div className="flex flex-col mt-20 w-full">
      <HeadingPrimary backroundTitle="Join" title="how to join" />

      <div className="grid grid-cols-1 xs:grid-cols-2 2md:grid-cols-3 gap-1 mt-8">
        <div className="flex flex-col rounded-bl-lg bg-[#F2F2F2]">
          <span className="title-background">Conditions to join</span>
          <div className="mt-3 px-5 pb-10 h-full">
            <div className="bg-white h-full flex flex-col p-5">
              <ul className="flex flex-col gap-2 text-14/24 font-inter mb-9">
                <li className="flex justify-between">
                  <div className="flex items-baseline gap-2">
                    <img
                      className="w-[14px] h-[14px]"
                      src={account ? iconCheck : iconUnCheck}
                      alt=""
                    />
                    <span>Connet Wallet</span>
                  </div>
                  {account ? (
                    <p className="m-0 font-semibold font-tthoves">
                      {displayWalletAddress(account)}
                    </p>
                  ) : (
                    <div
                      className="h-auto cursor-pointer rounded-xl font-semibold underline font-tthoves"
                      onClick={() => setShowModal && setShowModal(true)}
                    >
                      Connect Account
                    </div>
                  )}
                </li>
                <li className="flex justify-between">
                  <div className="flex items-baseline gap-2">
                    <img
                      className="w-[14px] h-[14px]"
                      src={predictConditions.network ? iconCheck : iconUnCheck}
                      alt=""
                    />
                    <span>Network</span>
                  </div>
                  {predictConditions.network ? (
                    <p className="m-0 font-semibold font-tthoves">
                      Firefly Testnet
                    </p>
                  ) : (
                    <div
                      className="h-auto cursor-pointer rounded-xl font-semibold underline font-tthoves"
                      onClick={() => requestSupportNetwork()}
                    >
                      Switch Network
                    </div>
                  )}
                </li>
                <li className="flex justify-between">
                  <div className="flex items-baseline gap-2">
                    <img
                      className="w-[14px] h-[14px]"
                      src={
                        predictConditions.birdToken ? iconCheck : iconUnCheck
                      }
                      alt=""
                    />
                    <span>$BIRD to deposit</span>
                  </div>
                  {predictConditions.birdToken ? (
                    <p className="m-0 font-semibold font-tthoves">{`${
                      birdBalance || 0
                    } $BIRD`}</p>
                  ) : (
                    <a
                      href={URLS.FIREFLY_TESTNET}
                      target={"_blank"}
                      rel="norefferer"
                      className="h-auto rounded-xl font-semibold underline font-tthoves"
                    >
                      Faucet $BIRD
                    </a>
                  )}
                </li>
                <li className="flex justify-between">
                  <div className="flex items-baseline gap-2">
                    <img
                      className="w-[14px] h-[14px]"
                      src={predictConditions.gasFee ? iconCheck : iconUnCheck}
                      alt=""
                    />
                    <span>Gas fee</span>
                  </div>
                  {predictConditions.gasFee ? (
                    <p className="m-0 font-semibold font-tthoves">{`${realTimeBalance} $${nativeCurrency}`}</p>
                  ) : (
                    <a
                      href={URLS.FIREFLY_TESTNET}
                      target={"_blank"}
                      rel="norefferer"
                      className="h-auto rounded-xl font-semibold underline font-tthoves"
                    >
                      Faucet $PKF
                    </a>
                  )}
                </li>
              </ul>
              <a
                href={BASE_HREF + URLS.HOME + "#match-list"}
                target="_blank"
                rel="noreferrer"
                className="w-full btn-rounded btn-primary mt-auto"
              >
                Predict now
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-[#F2F2F2]">
          <span className="title-background">Quick guide</span>
          <div className="mt-3 px-5 pb-10 h-full">
            <div className="bg-white h-full flex flex-col p-5">
              <ul className="flex flex-col gap-3 text-14/24 font-inter mb-9">
                {quickGuide.map((item: string, index: number) => (
                  <li className="flex gap-2" key={item}>
                    <div className="w-6 h-6 rounded-full bg-[#3A0013] text-white text-14/20 text-center flex justify-center items-center">
                      {index + 1}
                    </div>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={BASE_HREF + URLS.HOME + "#prediction-rule"}
                target="_blank"
                rel="noreferrer"
                className="w-full btn-rounded btn-black mt-auto"
              >
                Prediction Rule
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-br-lg bg-[#F2F2F2]">
          <span className="title-background">Reward Distribution</span>
          <div className="mt-3 px-5 pb-10 h-full">
            <div className="bg-white h-full flex flex-col p-5">
              <div className="flex flex-col gap-2 text-14/24 font-inter mb-9">
                All rewards will be airdropped to the winners after Phoenix Cup
                events ends.
                <p className="m-0 font-semibold">
                  Total rewards for Phoenix Cup: $5,320
                </p>
              </div>
              <a
                href={BASE_HREF + URLS.HOME + "#reward-distribution"}
                target="_blank"
                rel="noreferrer"
                className="w-full btn-rounded btn-black mt-auto"
              >
                Reward Distribution
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToJoin;
