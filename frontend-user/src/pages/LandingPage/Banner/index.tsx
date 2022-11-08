import React from "react";

const socialsData = [
  {
    title: "Official Twitter",
    username: "@Firebird",
    icon: "/images/landing-page/icon-twitter.svg",
  },
  {
    title: "Telegram Group",
    username: "@Firebird",
    icon: "/images/landing-page/icon-telegram.svg",
  },
  {
    title: "Annoucement Channel",
    username: "@FirebirdANN",
    icon: "/images/landing-page/icon-telegram.svg",
  },
];
const Banner = () => {
  return (
    <div className="mt-20 mb-10 relative text-white max-w-screen-main mx-auto">
      <div className="px-[100px]">
        <img src="/images/landing-page/banner-cup.png" alt="" />
      </div>
      <div className="absolute top-0 px-[100px] w-full h-full flex flex-col justify-center items-center">
        <div className="w-[136px]">
          <img src="/images/landing-page/banner-text.png" />
        </div>
        <div className="mt-5 max-w-[480px] text-56/60 text-center">
          Hit The Leaderboard now!
        </div>
        <p className="mt-[14px]">Be in World Cup trend with our latest news!</p>
        <div className="mt-7 flex flex-wrap justify-center space-x-3">
          {socialsData.map((item) => (
            <div
              key={item.title}
              className=" flex items-center space-x-3 bg-black rounded-xl py-3 px-7 w-[294px]"
            >
              <img src={item.icon} alt="" className="W-10 h-10" />
              <div className="flex flex-col">
                <span className="text-14/24 font-normal">{item.title}</span>
                <span className="text-22/32 font-semibold">
                  {item.username}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
