import React from "react";

type QuestionProps = {
  title: string;
  children: JSX.Element;
  handleSubmit: any;
};

const Question = (props: QuestionProps) => {
  const { title, children, handleSubmit } = props;
  return (
    <details className="mt-4 bg-green-100 open:ring-1 open:ring-black/5  open:shadow-lg p-6 rounded-lg">
      <summary className="text-sm leading-6 text-slate-900  font-semibold select-none">
        {title}
      </summary>
      <div>
        {children}
        <button
          className="mt-5 px-10 py-3 rounded-xl bg-black text-white"
          onClick={handleSubmit}
        >
          Submit answer
        </button>
      </div>
    </details>
  );
};

type BorderBoxProps = {
  label: string;
  icon?: string;
};
const BorderBox = (props: BorderBoxProps) => {
  const { label, icon } = props;
  return (
    <div className="flex space-x-2 justify-center items-center px-6 py-2 border rounded-xl">
      {icon && <img src={icon} className="w-4 h-4" alt="" />}
      <span>{label}</span>
    </div>
  );
};

const Questions = () => {
  const handleSubmit = () => {
    console.log("click submit");
  };

  return (
    <div className="w-full p-5">
      <Question
        title="1. What will the match score be?"
        handleSubmit={handleSubmit}
      >
        <div className="flex space-x-5 mt-5">
          <BorderBox label="Qatar" icon="/images/icon-qatar.svg" />
          <BorderBox label="Ecuador" icon="/images/icon-ecuador.svg" />
        </div>
      </Question>
    </div>
  );
};

export default Questions;
