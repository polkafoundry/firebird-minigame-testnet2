import clsx from "clsx";
import { URLS } from "../../../constants";

type LayoutSponsorProps = {
  children: any;
  title: string;

  description: string;
  images: {
    xs: string;
    normal: string;
  };
};

const LayourSponsor = (props: LayoutSponsorProps) => {
  const { children, title, description, images } = props;
  return (
    <div
      className={clsx(
        "flex flex-col text-white bg-black rounded-[20px]",
        "md:rounded-[32px]",
      )}
    >
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center">
        <div className="p-5 flex flex-col justify-between items-start font-inter w-full lg:max-w-[340px] lg:p-8 lg:mt-auto">
          <div>
            <span
              className="mt-5 text-20/28 font-semibold font-tthoves md:mt-0 md:text-28/36"
              data-aos="fade-up"
            >
              {title}
            </span>
            <p
              className="mt-1 text-14/24 text-[#B4B4B4] md:text-16/24 md:mt-2"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {description}
            </p>
          </div>
          {children}
        </div>

        <div className="flex-1 w-full lg:hidden">
          <img src={images.xs} alt="" className="w-full" data-aos="zoom-in" />
        </div>
        <div className="hidden flex-1 w-full lg:block">
          <img
            src={images.normal}
            alt=""
            className="w-full"
            data-aos="zoom-in"
          />
        </div>
      </div>
    </div>
  );
};
const Sponsor = () => {
  return (
    <div className="mt-5 md:mt-6 grid gap-5 sm:grid-cols-2 md:gap-8">
      <LayourSponsor
        title="Monsterra"
        description="Join the Phoenix Cup on Firebird, climb the leaderboard & have a
                chain to gain additional bonuses."
        images={{
          xs: "./images/introduction/monsterra-xs.png",
          normal: "./images/introduction/monsterra.png",
        }}
      >
        <div className="mt-3 flex w-full justify-between items-center">
          <span className="text-12/18 tracking-[1px] font-bold opacity-70 uppercase font-inter">
            for Phoenix cup
          </span>
          <div className="flex items-center">
            <img
              src="./images/introduction/coin.svg"
              alt=""
              className="w-5 h-5"
            />
            <span
              className="ml-1 text-20/32 font-tthovesBold italic"
              data-aos="flip-left"
            >
              $1,000
            </span>
          </div>
        </div>
        <div className="mt-0.5 flex w-full justify-between items-center">
          <span className="text-12/18 tracking-[1px] font-bold opacity-70 uppercase font-inter">
            worth NFT for event
          </span>
          <div className="flex items-center">
            <img
              src="./images/introduction/coin.svg"
              alt=""
              className="w-5 h-5"
            />
            <span
              className="ml-1 text-20/32 font-tthovesBold italic"
              data-aos="flip-left"
            >
              $1,000
            </span>
          </div>
        </div>
        <div className="mt-3 text-16/20 font-tthovesBold italic md:mt-8 cursor-pointer">
          COMING SOON
        </div>
      </LayourSponsor>
      <LayourSponsor
        title="GameFi Party pool"
        description="Join the Phoenix Cup on Firebird, climb the leaderboard & have a
                chain to gain additional bonuses."
        images={{
          xs: "./images/introduction/gamefi-xs.png",
          normal: "./images/introduction/gamefi.png",
        }}
      >
        <div className="mt-3 flex w-full justify-between items-center">
          <span className="text-12/18 tracking-[1px] font-semibold opacity-70 uppercase font-tthoves md:text-14/20 md:tracking-[2px]">
            Pool Prize
          </span>
          <span
            className="text-20/32 font-tthovesBold italic md:text-28/40"
            data-aos="flip-left"
          >
            $500
          </span>
        </div>
        <a
          href={URLS.GAMEFI_POOL}
          target="_blank"
          rel="noreferrer"
          className="mt-3 btn-rounded w-full text-14/20 text-center bg-main font-semibold md:mt-8"
        >
          Join Now
        </a>
      </LayourSponsor>
    </div>
  );
};

export default Sponsor;
