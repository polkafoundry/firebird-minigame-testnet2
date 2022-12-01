import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "swiper/css/pagination";
import { SwiperSlide } from "swiper/react";
import DefaultLoading from "../../../components/base/DefaultLoading";
import BaseSwiper from "../../../components/base/Swiper";
import { FAUCET_URL } from "../../../constants";
import { WalletContext } from "../../../context/WalletContext";
import useFetch from "../../../hooks/useFetch";
import useGiftCode from "../../../hooks/useGiftCode";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import { decryptData } from "../../../utils/encryptData";
import { requestSupportNetwork } from "../../../utils/setupNetwork";

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
      label: "Join Now",
      redirectLink: "https://twitter.com/redkitepad",
    },
  },
];

const GiftCode = () => {
  const location = useLocation();

  const { setShowModal } = useContext(WalletContext);
  const { account, isWrongChain } = useMyWeb3();
  const { loadingClaim, isClaimSuccess, handleClaimToken } = useGiftCode();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [giftCode, setGiftCode] = useState<string>("");
  const [reward, setReward] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [shouldFetchGiftCodeDaily, setShouldFetchGiftCodeDaily] =
    useState<boolean>(false);
  const [shouldFetchGiftCodeInfo, setShouldFetchGiftCodeInfo] =
    useState<boolean>(false);

  const { data: responseGiftCodeDaily } = useFetch<any>(
    "/code/get-active-code",
    shouldFetchGiftCodeDaily,
  );
  const { data: responseGiftCode } = useFetch<any>(
    `/code/get-code-info?code=${giftCode}&user_address=${account}`,
    shouldFetchGiftCodeInfo,
  );

  // handle fill gift code from other socials media
  useEffect(() => {
    const searchParam = location?.search;
    const isRedirectLink = searchParam.startsWith("?source=");
    if (!isRedirectLink) return;

    const giftCodeDecrypt = decryptData(searchParam?.slice(8));
    if (giftCodeDecrypt?.code) {
      setOpenDialog(true);
      setGiftCode(giftCodeDecrypt?.code);
      setShouldFetchGiftCodeInfo(true);
    }
  }, [location?.search]);

  // handle actions after claim successfully
  useEffect(() => {
    if (isClaimSuccess) {
      resetStates();
    }
  }, [isClaimSuccess]);

  useEffect(() => {
    if (responseGiftCodeDaily?.data) {
      setGiftCode(responseGiftCodeDaily?.data?.code);
      setReward(responseGiftCodeDaily?.data?.rewards);
      setShouldFetchGiftCodeInfo(true);
    }
  }, [responseGiftCodeDaily]);

  useEffect(() => {
    if (
      (!responseGiftCode && giftCode.length >= 10) ||
      responseGiftCode?.status === 500
    )
      setError("Invalid gift code. Please try again.");
    else if (responseGiftCode?.data?.isExpried)
      setError("Code expired. Please wait for next gift code.");
    else if (responseGiftCode?.data?.remaning <= 0)
      setError("Code usage limit has been reached.");
    else if (responseGiftCode?.data?.isUsed)
      setError("You've already used this code.");
    else if (responseGiftCode?.data) {
      setError("");
      setReward(responseGiftCode?.data?.reward);
    }
  }, [responseGiftCode]);

  const resetStates = () => {
    setGiftCode("");
    setError("");
    setReward(0);
    setShouldFetchGiftCodeInfo(false);
  };

  const handleChangeCode = (e: any) => {
    const input = e.target.value;
    setGiftCode(input);
    if (input.length === 10) {
      setShouldFetchGiftCodeInfo(true);
    } else {
      setShouldFetchGiftCodeInfo(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setShouldFetchGiftCodeDaily(false);
    if (location?.search.startsWith("?source=")) history.pushState({}, "", "/");
  };

  const openDialogWithDefaultState = (bannerIndex: number) => {
    setOpenDialog(true);
    resetStates();

    // get code daily when user click banner 1
    if (bannerIndex === 0) setShouldFetchGiftCodeDaily(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(giftCode);
    toast.success("Copy code successfully!");
  };

  const handleClaimBird = () => {
    if (!account) setShowModal && setShowModal(true);
    else if (isWrongChain) requestSupportNetwork();
    else handleClaimToken(giftCode, reward);
  };

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
              {loadingClaim && <DefaultLoading />}
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
                  Your Code
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
                  {!error ? reward : 0} $BIRD
                </div>
                <div className="mt-2 h-[18px] text-12/18 text-[#FF0021]">
                  {error}
                </div>

                <button
                  className={clsx(
                    "mt-3 btn-rounded bg-main w-full text-white font-tthoves select-none",
                    account && error && "pointer-events-none",
                  )}
                  onClick={handleClaimBird}
                >
                  {account
                    ? !isWrongChain
                      ? "Claim $BIRD"
                      : "Switch Chain"
                    : "Connect Wallet"}
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
          <SwiperSlide style={{ height: "auto" }} key={banner.title}>
            <div className="w-full h-full relative">
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
                        onClick={() => openDialogWithDefaultState(index)}
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
