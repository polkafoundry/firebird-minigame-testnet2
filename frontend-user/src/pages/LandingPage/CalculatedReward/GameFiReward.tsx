import React from "react";

const GameFiReward = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 font-inter">
      <div className="flex bg-black text-white rounded-[4px]">
        <div className="w-[70%] lg:w-[55%] pt-[44px] pl-[60px] pb-[30px] pr-[60px]">
          <div className="text-32/40 font-semibold font-tthoves">
            Exclusive incentives for GameFi.org’s members.
          </div>
          <p className="mt-3 text-18/32 text">
            Join the Phoenix Cup on Firebird, climb the leaderboard & have a
            chance to gain additional bonuses.
          </p>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-16/20 font-semibold opacity-70 font-tthoves">
              Pool Prize
            </span>
            <span className="text-32/40 font-tthovesBold italic">$500</span>
          </div>
          <a
            href="https://gamefi.org/"
            target="_blank"
            rel="noreferrer"
            className="mt-3 w-[200px] p-2 flex-1 rounded-lg flex justify-center items-center bg-main"
          >
            Learn more
          </a>
        </div>
        <div className="w-[30%] lg:w-[45%]">
          <img
            src="./images/landing-page/gamefi.png"
            alt=""
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default GameFiReward;
