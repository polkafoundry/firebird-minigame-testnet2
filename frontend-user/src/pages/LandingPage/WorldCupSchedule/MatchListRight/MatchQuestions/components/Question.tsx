import { Disclosure } from "@headlessui/react";

type QuestionProps = {
  title: string;
  children: JSX.Element;
  predictBoxComponent?: JSX.Element | undefined;
  handleSubmit: () => void;
  isSubmitted: boolean;
  matchEnded?: boolean;
  loading?: boolean;
};
const Question = (props: QuestionProps) => {
  const {
    title,
    children,
    handleSubmit,
    isSubmitted,
    matchEnded,
    loading,
    predictBoxComponent,
  } = props;

  // console.log("(predictBoxComponent :>> ", predictBoxComponent);
  // console.log("(matchEnded) ||  :>> ", matchEnded);
  // console.log("(isSubmitted &:>> ", isSubmitted);
  // console.log("(!2 con &:>> ", !isSubmitted && !matchEnded);
  // console.log(
  //   "(!final &:>> ",
  //   !!((!isSubmitted && !matchEnded) || predictBoxComponent),
  // );
  const enableSubmit = Boolean(!isSubmitted && !matchEnded);
  // console.log("(!enalbesubmit &:>> ", enableSubmit);

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
