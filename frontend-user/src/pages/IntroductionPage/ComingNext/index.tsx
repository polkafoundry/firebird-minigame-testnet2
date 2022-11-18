import clsx from "clsx";

const ComingNext = () => {
  return (
    <div className={clsx("w-full px-40", "mt-[100px]")}>
      <div className="flex flex-col max-w-[55%]">
        <p className="m-0 font-semibold text-80/80 text-main">Coming Next</p>
        <p className="m-0 mt-6 text-24/32 font-semibold">
          When the Firebird mainnet?
        </p>
        <span className="mt-3 text-18/32 font-inter">
          FireBird mainnet, which will be launched after Beta Testnet events.
          The schedule of events will be announced soon.
        </span>
        <p className="m-0 mt-6 text-24/32 font-semibold">
          What to do with the test token after the event?
        </p>
        <p className="m-0 mt-3 text-18/32 font-inter">
          <b>
            There will be activities for multi-token test holders ($BIRD, PKF)
            when Firebird releases mainnet.
          </b>{" "}
          Holding $BIRD tokens will give you a great advantage in future
          FireBird events.
        </p>
      </div>
    </div>
  );
};

export default ComingNext;
