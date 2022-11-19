import clsx from "clsx";

const ComingNext = () => {
  return (
    <div
      className={clsx(
        "w-full lg:pl-[140px] flex flex-col xs:flex-row",
        "mt-[60px] md:mt-[100px]",
      )}
    >
      <div className="flex flex-col xs:w-[55%] lg:max-w-[588px] text-center xs:text-left">
        <p className="font-semibold text-32/40 md:text-80/80 text-main">
          Coming Next
        </p>
        <p className="mt-5 text-20/28 md:mt-6 md:text-24/32 font-semibold">
          When the Firebird mainnet?
        </p>
        <span className="mt-3 text-14/24 md:text-18/32 font-inter">
          FireBird mainnet, which will be launched after Beta Testnet events.
          The schedule of events will be announced soon.
        </span>
        <p className="mt-5 text-20/28 md:mt-6 md:text-24/32 font-semibold">
          What to do with the test token after the event?
        </p>
        <p className="mt-3 text-14/24 md:text-18/32 font-inter">
          <b>
            There will be activities for multi-token test holders ($BIRD, PKF)
            when Firebird releases mainnet.
          </b>{" "}
          Holding $BIRD tokens will give you a great advantage in future
          FireBird events.
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img src="./images/introduction/comming-next.png" alt="" />
      </div>
    </div>
  );
};

export default ComingNext;
