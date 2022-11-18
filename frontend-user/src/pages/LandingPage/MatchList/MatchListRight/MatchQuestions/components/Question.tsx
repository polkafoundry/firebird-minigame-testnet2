import { Disclosure } from "@headlessui/react";
import DefaultLoading from "../../../../../../components/base/DefaultLoading";
import { MATCH_STATUS, URLS } from "../../../../../../constants";

type QuestionProps = {
  title: string;
  children: JSX.Element;
  isPredictQuestion?: boolean;
  predictBoxComponent?: JSX.Element | undefined;
  handleSubmit: () => void;
  isSubmitted: boolean;
  matchEnded?: boolean;
  loading?: boolean;
  error?: any;
  matchStatus?: string;
};
const Question = (props: QuestionProps) => {
  const {
    title,
    children,
    isPredictQuestion = false,
    handleSubmit,
    isSubmitted,
    matchEnded,
    loading,
    predictBoxComponent,
    error,
    matchStatus = "",
  } = props;

  const enableSubmit = predictBoxComponent
    ? ![MATCH_STATUS.FINISHED, MATCH_STATUS.LIVE].includes(matchStatus)
    : !matchEnded && !isSubmitted;

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="mt-4 rounded-lg bg-white relative">
          {loading && <DefaultLoading />}

          <Disclosure.Button className="block w-full select-none cursor-pointer p-5">
            <div className="text-16/20 font-tthoves font-semibold flex justify-between items-center text-left">
              <span>{title}</span>
              <div className="ml-2 w-[14px]">
                <img
                  src="./images/icon-arrow-down.svg"
                  alt=""
                  className={open ? "rotate-180" : ""}
                />
              </div>
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="px-5 pb-5">
            {children}
            {error && (
              <div className="mt-3">
                {!isPredictQuestion && error?.birdToken === false && (
                  <p className="text-12/16 text-[#FF0021] text-center font-inter">
                    Not enough $BIRD to anwser the questions. Click{" "}
                    <a
                      href={URLS.FIREFLY_TESTNET}
                      target={"_blank"}
                      rel="norefferer"
                      className="text-[#0085FF] underline cursor-pointer"
                    >
                      here
                    </a>{" "}
                    to faucet.
                  </p>
                )}
                {error?.gasFee === false && (
                  <p className="text-12/16 text-[#FF0021] text-center font-inter">
                    Not enough PKF to pay for the gas fee. Click{" "}
                    <a
                      href={URLS.FIREFLY_TESTNET}
                      target={"_blank"}
                      rel="norefferer"
                      className="text-[#0085FF] underline cursor-pointer"
                    >
                      here
                    </a>{" "}
                    to faucet.
                  </p>
                )}
              </div>
            )}
            {enableSubmit && (
              <div className="flex justify-center">
                <button
                  className="mt-3 p-2 w-[178px] rounded-lg bg-main text-white text-14/20 font-tthoves font-semibold"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Submit answer
                </button>
              </div>
            )}
            {predictBoxComponent}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default Question;
