import { Dialog } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import "swiper/css/pagination";
import { SwiperSlide } from "swiper/react";
import BaseSwiper from "../../../components/base/Swiper";
import { FAUCET_URL } from "../../../constants";
import { WalletContext } from "../../../context/WalletContext";
import useFetch from "../../../hooks/useFetch";
import useGiftCode from "../../../hooks/useGiftCode";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";

const giftCodeBanners = [
  {
    title: "Get code now to receive 1,500$ Bird",
    description:
      "Visit our website at 2AM UTC everyday to earn more $BIRD. Promotion Duration: 03/12/2022 - 08/12/2022",
    background: {
      normal: "./images/landing-page/gift-code/banner-soccer.png",
      large: "./images/landing-page/gift-code/banner-soccer-large.png",
    },
    icon: "./images/landing-page/gift-code/soccer.png",
    buttonLeft: { label: "Get gift code" },
    buttonRight: { label: "Faucet $BIRD", redirectLink: FAUCET_URL },
  },
  {
    title: "Join Global Chat to get more $BIRD deposit.",
    description:
      "Join Global Chat at 12PM UTC every Monday, Wednesday and Friday to get more $BIRD deposit.",
    background: {
      normal: "./images/landing-page/gift-code/banner-telegram.png",
      large: "./images/landing-page/gift-code/banner-telegram-large.png",
    },
    icon: "./images/landing-page/gift-code/telegram.png",
    buttonLeft: { label: "Enter Code" },
    buttonRight: {
      label: " Join Now",
      redirectLink: "https://t.me/redkite_en",
    },
  },
  {
    title: "Join Twitter to get more $BIRD deposit",
    description:
      "Join Twitter at 8AM UTC every Tuesday & Thursday to get more $BIRD deposit",
    background: {
      normal: "./images/landing-page/gift-code/banner-twitter.png",
      large: "./images/landing-page/gift-code/banner-twitter-large.png",
    },
    icon: "./images/landing-page/gift-code/twitter.png",
    buttonLeft: { label: "Enter Code" },
    buttonRight: {
      label: " Join Now",
      redirectLink: "https://twitter.com/redkitepad",
    },
  },
];

const GiftCode = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [giftCode, setGiftCode] = useState<string>("");
  const [shouldFetchGiftCodeAvailable, setShouldFetchGiftCodeAvailable] =
    useState<boolean>(false);
  const { setShowModal } = useContext(WalletContext);
  const { account } = useMyWeb3();
  const { handleClaimToken } = useGiftCode();

  const { data: response } = useFetch<any>(
    "/code/get-avaiable-code",
    shouldFetchGiftCodeAvailable,
  );

  useEffect(() => {
    console.log("response", response?.data);
  }, [response]);

  const handleChangeCode = (e: any) => {
    setGiftCode(e.target.value);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClickLeftButton = (index: number) => {
    setOpenDialog(true);

    // get available gift code
    if (index === 0) setShouldFetchGiftCodeAvailable(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(giftCode);
  };

  const handleClaimBird = () => {
    if (!account) setShowModal && setShowModal(true);
    else {
      console.log("claim bird");
      handleClaimToken(giftCode);
    }
  };
  //   const error = "Code expired. Please wait for next gift code.";
  const error = "";

  const renderGiftCodeModal = () => (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      className="relative z-50 "
    >
      <div className="fixed inset-0 flex items-center justify-center p-7">
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-[400px] h-auto relative m-auto bg-[#F2F2F2] rounded-[12px]">
              <img
                src="./images/landing-page/gift-code/icon-close.svg"
                alt=""
                className="absolute top-4 right-4 cursor-pointer w-6 h-6"
                onClick={handleCloseDialog}
              />
              <div className="p-10 font-inter">
                <div className="text-32/40 text-center font-semibold">
                  Gift code
                </div>
                <div className="mt-5 text-12/18 font-bold uppercase">
                  Deposit Amount
                </div>
                <div className="mt-2 px-3.5 py-3 rounded-lg h-12 flex items-center bg-white">
                  <input
                    className="outline-none text-14/24 flex-1"
                    placeholder="Enter code"
                    value={giftCode}
                    onChange={handleChangeCode}
                  />
                  <img
                    src="./images/landing-page/gift-code/icon-copy.svg"
                    className="w-6 h-6 cursor-pointer"
                    onClick={copyToClipboard}
                  />
                </div>
                <div className="mt-5 text-12/18 font-bold uppercase">
                  You will receive
                </div>
                <div className="mt-2 text-24/32 font-tthoves font-semibold">
                  {0} $BIRD
                </div>
                <div className="mt-2 h-[18px] text-12/18 text-[#FF0021]">
                  {error}
                </div>

                <button
                  className="mt-3 btn-rounded bg-main w-full text-white font-tthoves"
                  onClick={handleClaimBird}
                >
                  {account ? "Claim $BIRD" : "Connect Wallet"}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </div>
    </Dialog>
  );

  return (
    <div className="pt-20 max-w-screen-main px-5 main:px-20 mx-auto w-full relative">
      <BaseSwiper showPagination>
        {giftCodeBanners.map((banner, index) => (
          <SwiperSlide style={{ height: "100%" }} key={banner.title}>
            <div className="w-full relative">
              <div className="flex">
                <img
                  src={banner.background.normal}
                  className="absolute w-full h-full top-0 z-[9] rounded-lg md:hidden"
                />
                <img
                  src={banner.background.large}
                  className="absolute w-full h-full top-0 z-[9] rounded-lg hidden md:block"
                />
                <div className="flex flex-col w-full px-5 pt-12 pb-10 z-10 text-white md:flex-row md:items-center md:space-x-5 md:py-4">
                  <div className="w-[220px] h-[220px] flex justify-center items-center mx-auto">
                    <img src={banner.icon} />
                  </div>
                  <div className="mt-5 w-full md:mt-0 text-center md:text-left">
                    <div className="text-20/28 font-tthovesBold uppercase">
                      ⏰ Lucky hour ⏰
                    </div>
                    <div className="flex flex-col md:flex-row justify-between md:space-x-5 mt-2">
                      <div className="text-28/36 lg:text-36/48 font-tthoves uppercase md:normal-case  lg:max-w-[420px]">
                        {banner.title}
                      </div>
                      <div className="mt-2 md:mt-0">
                        <div className="font-tthoves text-14/24 lg:text-18/32 opacity-80 md:max-w-[520px]">
                          {banner.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-3 md:pr-10 items-center text-18/24 font-tthoves font-semibold mt-5 sm:flex-row sm:space-y-0 sm:space-x-3 md:mt-1 md:justify-end z-20">
                      <button
                        className="btn-rounded bg-main w-full max-w-[244px] md:max-w-[180px] lg:max-w-[244px]"
                        onClick={() => handleClickLeftButton(index)}
                      >
                        {banner.buttonLeft.label}
                      </button>
                      <a
                        href={banner.buttonRight.redirectLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center btn-rounded bg-white text-black w-full max-w-[244px] md:max-w-[180px] lg:max-w-[244px]"
                      >
                        {banner.buttonRight.label}
                        <img src="./images/icon-next.svg" className="ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </BaseSwiper>

      {renderGiftCodeModal()}
    </div>
  );
};

export default GiftCode;
