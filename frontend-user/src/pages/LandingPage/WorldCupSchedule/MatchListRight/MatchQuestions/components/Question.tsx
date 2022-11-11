import { Disclosure } from "@headlessui/react";
import { URLS } from "../../../../../../constants";

type QuestionProps = {
  title: string;
  children: JSX.Element;
  predictBoxComponent?: JSX.Element | undefined;
  handleSubmit: () => void;
  isSubmitted: boolean;
  isPredicted?: boolean;
  matchEnded?: boolean;
  loading?: boolean;
  error?: any;
};
const Question = (props: QuestionProps) => {
  const {
    title,
    children,
    handleSubmit,
    isSubmitted,
    isPredicted,
    matchEnded,
    loading,
    predictBoxComponent,
    error,
  } = props;

  const enableSubmit = predictBoxComponent
    ? isPredicted && !matchEnded
    : !matchEnded && !isSubmitted;

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="mt-4 rounded-lg bg-white">
          <Disclosure.Button className="block w-full select-none cursor-pointer p-5">
            <div className="text-16/20 font-tthoves font-semibold flex justify-between items-center text-left">
              <span>{title}</span>
              <div className="w-[14px]">
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
            {error?.birdToken === false && (
              <p className="mt-3 text-12/16 text-[#FF0021] text-center font-inter">
                Not enough PKF to pay for the gas fee. Click{" "}
                <a
                  href={URLS.FAUCET_TESTNET}
                  target={"_blank"}
                  rel="norefferer"
                  className="text-[#0085FF] underline cursor-pointer"
                >
                  here
                </a>{" "}
                to faucet.
              </p>
            )}
            {enableSubmit && (
              <div className="flex justify-center">
                <button
                  className="mt-3 p-2 w-[178px] rounded-lg bg-[#EB522F] text-white text-14/20 font-tthoves font-semibold"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Loading" : "Submit answer"}
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
