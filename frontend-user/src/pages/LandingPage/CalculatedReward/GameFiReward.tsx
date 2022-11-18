import clsx from "clsx";

const GameFiReward = () => {
  return (
    <div
      className={clsx(
        "mt-3 mx-3 p-5 flex flex-col text-white bg-black rounded-[4px]",
        "md:mx-0 md:mt-5 sm:p-10 lg:p-[60px]",
      )}
    >
      <div className="flex flex-col-reverse  md:flex-row justify-center items-center">
        <div className="flex flex-col justify-between items-start font-inter w-full md:w-fit md:max-w-[460px]">
          <div>
            <span
              className="mt-5 text-28/36 font-semibold font-tthoves md:mt-0 md:text-36/48"
              data-aos="fade-up"
            >
              Exclusive incentives for GameFi.org’s members.
            </span>
            <p
              className="mt-3 text-14/24 md:text-18/32 md:mt-2"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Join the Phoenix Cup on Firebird, climb the leaderboard & have a
              chain to gain additional bonuses.
            </p>
          </div>
          <div className="mt-3 flex w-full justify-between items-center">
            <span className="text-16/20 font-semibold opacity-70 font-tthoves">
              Pool Prize
            </span>
            <span
              className="text-32/40 font-tthovesBold italic"
              data-aos="flip-left"
            >
              $500
            </span>
          </div>
          <div className="flex w-full mt-5 text-white text-14/20 font-tthoves">
            <a
              href="https://gamefi.org/"
              target="_blank"
              rel="noreferrer"
              className="w-full text-center bg-main p-2.5 md:p-2 font-semibold rounded-lg"
            >
              Learn more
            </a>
          </div>
        </div>

        <div className="flex-1 mt-5 ml-0 w-full md:ml-5 lg:ml-10 md:mt-0 ">
          <img
            src="./images/landing-page/gamefi.png"
            alt=""
            className="w-full"
            data-aos="zoom-in"
          />
        </div>
      </div>
    </div>
  );
};

export default GameFiReward;
