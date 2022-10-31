import { Disclosure, Transition } from "@headlessui/react";
import clsx from "clsx";
import styles from "./tableSelectMatch.module.scss";

const MATCH_STATUS = {
  ON_GOING: "On going",
  NOT_YET: "Not yet",
  ENDED: "Ended",
};

const headingColumns = [
  { title: "Date Time", width: 125 },
  { title: "Match", width: 171 },
  { title: "Stadium", width: 108 },
  { title: "Status", width: 102 },
  { title: "Score", width: 79 },
  { title: "Who win", width: 226, subHeading: ["Team 1", "Draw", "Team 2"] },
  {
    title: "Lower or Higher",
    width: 201,
    subHeading: ["Lower", "Total", "Higher"],
  },
  { title: "Predicted", width: 78 },
  { title: "Play", width: 82 },
];

const matchDatas = [
  {
    id: 1,
    date: "11/21/2022 17:00",
    match: "Qatar vs. Ecuador",
    stadium: "Al Bayt",
    status: MATCH_STATUS.ON_GOING,
    score: "-:-",
    win: ["9.72", "6.13", "1.27"],
    lowerOrHigher: ["1.90", "3.5", "2.0"],
    predicted: false,
  },
  {
    id: 2,
    date: "11/21/2022 17:00",
    match: "Qatar vs. Ecuador",
    stadium: "Al Bayt",
    status: MATCH_STATUS.ON_GOING,
    score: "-:-",
    win: ["9.72", "6.13", "1.27"],
    lowerOrHigher: ["1.90", "3.5", "2.0"],
    predicted: true,
  },
  {
    id: 3,
    date: "11/21/2022 17:00",
    match: "Qatar vs. Ecuador",
    stadium: "Al Bayt",
    status: MATCH_STATUS.NOT_YET,
    score: "-:-",
    win: ["9.72", "6.13", "1.27"],
    lowerOrHigher: ["1.90", "3.5", "2.0"],
    predicted: false,
  },
  {
    id: 4,
    date: "11/21/2022 17:00",
    match: "Qatar vs. Ecuador",
    stadium: "Al Bayt",
    status: MATCH_STATUS.ENDED,
    score: "-:-",
    win: ["9.72", "6.13", "1.27"],
    lowerOrHigher: ["1.90", "3.5", "2.0"],
    predicted: false,
  },
];

const RowSpan = (props: any) => {
  const { colNo, data } = props;
  return (
    <div style={{ width: headingColumns[colNo].width }}>
      <div className="flex text-sm tracking-tighter">
        {[0, 1, 2, 4].includes(colNo) && (
          <span className={clsx(styles.tableSubHeading, "flex-1")}>{data}</span>
        )}
        {colNo === 3 && (
          <span className={clsx(styles.tableSubHeading, "flex-1")}>{data}</span>
        )}
        {[5, 6].includes(colNo) && (
          <>
            <span className={clsx(styles.tableSubHeading, "flex-1")}>
              {data[0]}
            </span>
            <span className={clsx(styles.tableSubHeading, "flex-1")}>
              {data[1]}
            </span>
            <span className={clsx(styles.tableSubHeading, "flex-1")}>
              {data[2]}
            </span>
          </>
        )}
        {colNo === 7 && (
          <span className={clsx(styles.tableSubHeading, "flex-1")}>
            {!data ? "Wrong" : "Win"}
          </span>
        )}
        {colNo === 8 && (
          <div className={clsx(styles.tableSubHeading, "flex-1 text-blue-500")}>
            <Disclosure.Button>{!data ? "Detail" : "Hide"}</Disclosure.Button>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailQuestion = (props: any) => {
  const { title } = props;
  return (
    <details className="mt-4 bg-green-100 open:ring-1 open:ring-black/5  open:shadow-lg p-6 rounded-lg">
      <summary className="text-sm leading-6 text-slate-900  font-semibold select-none">
        {title}
      </summary>
      <div className="mt-3 text-sm leading-6 text-slate-600">
        <p>
          The mug is round. The jar is round. They should call it Roundtine.
        </p>
      </div>
    </details>
  );
};

const DetailMatch = () => {
  return (
    <div className="p-10">
      <div className="p-5 flex flex-col items-center">
        <h6 className="font-bold">How to predict?</h6>
        <div className="text-center">
          <p>
            Select the question you want to anwser, then deposit BIRD token.
            After that, select your anwser and click Submit button.
          </p>
          <p>Don’t have BIRD token? Click here to faucet.</p>
        </div>
        <h6 className="font-bold mt-5">Prediction period</h6>
        <p>Before the match starts at 11/21/2022 17:00.</p>
        <div className="bg-gray-400 px-10 py-2 mt-3">
          This match is no longer predictable.
        </div>
      </div>
      <div>
        <h6 className="font-bold">Let’s join now</h6>
        <DetailQuestion title="1. What do you think the final score of the game will be?" />
        <DetailQuestion title="2. Which team do you think will win?" />
        <DetailQuestion title="3. Do you think the total number of goals will be under or over?" />
      </div>
    </div>
  );
};

const TableSelectMatch = () => {
  return (
    <div className="pt-32">
      <div className={clsx("flex text-sm font-semibold")}>
        {headingColumns.map((heading) => (
          <div key={heading.title} style={{ width: heading.width }}>
            <span
              className={clsx(
                styles.tableHeading,
                !heading.subHeading && "h-full",
              )}
            >
              {heading.title}
            </span>
            {heading.subHeading && (
              <div className="flex">
                {heading.subHeading.map((subHeading) => (
                  <span className={clsx(styles.tableSubHeading, "flex-1")}>
                    {subHeading}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {matchDatas.map((matchData) => (
        <Disclosure key={matchData.id}>
          {({ open }) => (
            <div>
              <div className={clsx("flex")}>
                <RowSpan colNo={0} data={matchData.date} />
                <RowSpan colNo={1} data={matchData.match} />
                <RowSpan colNo={2} data={matchData.stadium} />
                <RowSpan colNo={3} data={matchData.status} />
                <RowSpan colNo={4} data={matchData.score} />
                <RowSpan colNo={5} data={matchData.win} />
                <RowSpan colNo={6} data={matchData.lowerOrHigher} />
                <RowSpan colNo={7} data={matchData.predicted} />
                <RowSpan colNo={8} data={open} />
              </div>

              <Transition
                className="overflow-hidden"
                enter="transition transition-[max-height] duration-500 ease-in"
                enterFrom="transform max-h-0"
                enterTo="transform max-h-screen"
                leave="transition transition-[max-height] duration-500 ease-out"
                leaveFrom="transform max-h-screen"
                leaveTo="transform max-h-0"
              >
                <Disclosure.Panel>
                  <DetailMatch />
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default TableSelectMatch;
