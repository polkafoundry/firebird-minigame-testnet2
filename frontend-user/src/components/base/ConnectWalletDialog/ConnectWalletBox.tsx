import { AbstractConnector } from "@web3-react/abstract-connector";
import clsx from "clsx";
import { isMobile } from "react-device-detect";
import React from "react";
import { WalletInfo } from "../../../constants/connectors";

type ConnectWalletBoxProps = {
  wallet?: WalletInfo;
  handleProviderChosen?: (name: string, connector: AbstractConnector) => void;
  connectWalletLoading?: boolean;
  walletName?: (string | undefined)[];
};

const ConnectWalletBox = (props: ConnectWalletBoxProps) => {
  const { connectWalletLoading, handleProviderChosen, wallet, walletName } =
    props;

  const handleWalletChange = () => {
    wallet &&
      handleProviderChosen &&
      handleProviderChosen(wallet.name, wallet.connector as AbstractConnector);
  };

  if (!wallet) return <></>;

  const { name, icon, disableIcon } = wallet;
  const selectingWallet = walletName && walletName.indexOf(name) >= 0;

  return (
    <div
      className={clsx(
        "flex flex-col max-w-[108px] min-w-[96px] w-full gap-2 rounded bg-[#373737] items-center px-2 py-3 cursor-pointer justify-between",
        {
          "border-[#5EFF8B] border-[1px]": selectingWallet,
        },
      )}
      onClick={() => {
        if (isMobile && wallet?.deepLink) {
          window.open(wallet.deepLink);
          return;
        }
        handleWalletChange();
      }}
    >
      {connectWalletLoading && selectingWallet ? (
        <img src="/images/loading.svg" alt="" />
      ) : (
        <img src={icon} alt="" />
      )}
      <p className="text-white text-center text-sm">{name}</p>
    </div>
  );
};

export default ConnectWalletBox;
