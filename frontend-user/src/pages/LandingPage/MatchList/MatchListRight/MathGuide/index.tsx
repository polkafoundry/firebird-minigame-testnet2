import clsx from "clsx";
import { useContext } from "react";
import { FAUCET_URL, quickGuide } from "../../../../../constants";
import { WalletContext } from "../../../../../context/WalletContext";
import { useMyWeb3 } from "../../../../../hooks/useMyWeb3";
import usePredictConditions from "../../../../../hooks/usePredictConditions";
import { displayWalletAddress, formatCurrency } from "../../../../../utils";
import { scrollToId } from "../../../../../utils/domElement";
import { requestSupportNetwork } from "../../../../../utils/setupNetwork";

const iconCheck = "/images/icon-correct-answer.svg";
const iconUnCheck = "/images/icon-wrong-answer.svg";

const classes = {
  icon: "w-3 h-3 md:w-[14px] md:h-[14px] mr-2",
  label: "text-14/24 md:text-16/24",
  textError: "text-[#FF3E57] text-10/14 pr-2",
  value: "text-14/20 font-semibold font-tthoves md:text-16/24",
  button: "h-auto font-semibold text-12/16 md:text-14/20",
  buttonStyles:
    "w-[112px] bg-black text-white text-center py-2 text-14/20 rounded font-tthoves md:w-[140px] md:py-1.5",
};

type MatchGuideProps = {
  isDetailGuide?: boolean;
};

const MatchGuide = (props: MatchGuideProps) => {
  const { isDetailGuide = false } = props;
  const { setShowModal } = useContext(WalletContext);
  const { realTimeBalance, nativeCurrency, account, birdBalance } = useMyWeb3();

  const predictConditions = usePredictConditions();

  const handleClickPredictionRule = () => {
    scrollToId("#prediction-rule");
  };

  const renderConditionToJoin = () => {
    return (
      <ul className="flex flex-col gap-3 text-16/24">
        <li className="flex justify-between">
          <div className="flex items-baseline">
            <img
              className={classes.icon}
              src={account ? iconCheck : iconUnCheck}
              alt=""
            />
            <span className={classes.label}>Connet Wallet</span>
          </div>
          <p className={classes.value}>{displayWalletAddress(account)}</p>
        </li>
        <li className="flex justify-between">
          <div className="flex items-baseline">
            <img
              className={classes.icon}
              src={predictConditions.network ? iconCheck : iconUnCheck}
              alt=""
            />
            <div className="flex flex-col">
              <span className={classes.label}>Network</span>
              {isDetailGuide && !predictConditions.network && (
                <p className={classes.textError}>
                  You must use Firefly testnet.
                </p>
              )}
            </div>
          </div>
          {predictConditions.network ? (
            <p className={classes.value}>Firefly Testnet</p>
          ) : (
            <div className="flex flex-col">
              <button
                className={clsx(
                  classes.button,
                  isDetailGuide && classes.buttonStyles,
                )}
                onClick={() => requestSupportNetwork()}
              >
                Switch Network
              </button>
            </div>
          )}
        </li>
        <li className="flex justify-between">
          <div className="flex items-baseline">
            <img
              className={classes.icon}
              src={predictConditions.birdToken ? iconCheck : iconUnCheck}
              alt=""
            />
            <div className="flex flex-col">
              <span className={classes.label}>$BIRD to deposit</span>
              {isDetailGuide && !predictConditions.birdToken && (
                <p className={classes.textError}>
                  $BIRD is our testnet token. You need to deposit $BIRD to
                  anwser the questions.
                </p>
              )}
            </div>
          </div>
          {predictConditions.birdToken ? (
            <p className={classes.value}>{`${
              formatCurrency(birdBalance) || 0
            } $BIRD`}</p>
          ) : (
            <div className="flex flex-col">
              <a
                href={FAUCET_URL}
                target={"_blank"}
                rel="norefferer"
                className={clsx(
                  classes.button,
                  isDetailGuide && classes.buttonStyles,
                )}
              >
                Faucet $BIRD
              </a>
            </div>
          )}
        </li>
        <li className="flex justify-between">
          <div className="flex items-baseline">
            <img
              className={classes.icon}
              src={predictConditions.gasFee ? iconCheck : iconUnCheck}
              alt=""
            />
            <div className="flex flex-col">
              <span className={classes.label}>Gas fee</span>
              {isDetailGuide && !predictConditions.gasFee && (
                <p className={classes.textError}>
                  You need $PKF to pay for the gas fee.
                </p>
              )}
            </div>
          </div>
          {predictConditions.gasFee ? (
            <p
              className={classes.value}
            >{`${realTimeBalance} $${nativeCurrency}`}</p>
          ) : (
            <div className="flex flex-col">
              <a
                href={FAUCET_URL}
                target={"_blank"}
                rel="norefferer"
                className={clsx(
                  classes.button,
                  isDetailGuide && classes.buttonStyles,
                )}
              >
                Faucet $PKF
              </a>
            </div>
          )}
        </li>
      </ul>
    );
  };

  return (
    <div className="flex flex-col my-5">
      <div className="flex flex-col">
        <span className="title-background">Conditions to join</span>
        <div className="p-3 md:px-8 font-inter">
          <div className="bg-white p-5">
            {!account && (
              <div className="h-[176px] flex justify-center items-center">
                <button
                  className="py-2 px-9 rounded-lg bg-main text-white justify-center font-semibold font-tthoves text-14/20"
                  onClick={() => setShowModal && setShowModal(true)}
                >
                  Connect Wallet
                </button>
              </div>
            )}
            {account && renderConditionToJoin()}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="title-background">Quick guide</span>
        <div className="p-3 md:px-8">
          <div className="bg-white flex flex-col xs:flex-row p-5">
            <div>
              <img
                src="./images/landing-page/world-cup-guide.png"
                alt=""
                className="w-full"
              />
            </div>
            <ul className="mt-[26px] md:mt-0 ml-3 flex flex-col gap-3 font-inter">
              {quickGuide.map((item: string, index: number) => (
                <li className="flex gap-2" key={item}>
                  <div className="w-6 h-6 text-14/20 rounded-full bg-[#3A0013] text-white text-center flex justify-center items-center">
                    {index + 1}
                  </div>
                  <span className="text-14/24 md:text-16/24 flex-1 opacity-80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center px-3 md:px-0">
        <button
          className="w-full xs:w-[336px] py-4 rounded-full bg-main text-white justify-center font-semibold font-tthoves text-18/24"
          onClick={handleClickPredictionRule}
        >
          Prediction Rule
        </button>
      </div>
    </div>
  );
};

export default MatchGuide;
