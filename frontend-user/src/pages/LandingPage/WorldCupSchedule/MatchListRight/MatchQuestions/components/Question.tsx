import { Disclosure } from "@headlessui/react";

type QuestionProps = {
  title: string;
  children: JSX.Element;
  handleSubmit: () => void;
  isSubmitted: boolean;
};
const Question = (props: QuestionProps) => {
  const { title, children, handleSubmit, isSubmitted } = props;

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="mt-4 border rounded-lg">
          <Disclosure.Button className="block w-full select-none cursor-pointer p-6">
            <div className="text-sm leading-6 text-slate-900 font-semibold flex justify-between">
              <span>{title}</span>
              <img
                src="./images/icon-arrow-down.svg"
                alt=""
                className={open ? "rotate-180" : ""}
              />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="px-6 pb-6">
            {children}
            {!isSubmitted && (
              <button
                className="mt-5 px-10 py-3 rounded-xl bg-black text-white"
                onClick={handleSubmit}
              >
                Submit answer
              </button>
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default Question;
