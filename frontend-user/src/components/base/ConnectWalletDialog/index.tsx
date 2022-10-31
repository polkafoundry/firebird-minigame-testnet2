import clsx from "clsx";
import { useContext } from "react";
import { SUPPORTED_WALLETS } from "../../../constants/connectors";
import { AppContext } from "../../../context/AppContext";
import ConnectWalletBox from "./ConnectWalletBox";
import styles from "./dialog.module.scss";

type ConnectWalletDialogTypes = {
  open: boolean;
  closeDialog: () => void;
};

const ConnectWalletDialog = (props: ConnectWalletDialogTypes) => {
  const { open, closeDialog } = props;

  const { walletName, handleProviderChosen, connectWalletLoading } =
    useContext(AppContext);

  if (!open) return <></>;

  return (
    <div className="fixed w-screen h-screen z-[999] text-white">
      <div className={styles.dialogBackdrop}></div>
      <div className="flex h-full">
        <div
          className={clsx(
            styles.dialogContainer,
            "w-full h-fit flex flex-col relative m-auto items-center bg-[#242424] max-w-[480px] p-10 rounded-2xl",
          )}
        >
          <img
            src="/images/icon-close.svg"
            alt=""
            className="absolute top-4 right-4 cursor-pointer w-6 h-6"
            onClick={closeDialog}
          />
          <p className="text-2xl font-semibold text-center">Connect Wallet</p>

          <div className="flex gap-3 mt-10">
            {Object.keys(SUPPORTED_WALLETS).map((key: string) => {
              const wallet = SUPPORTED_WALLETS[key];
              // const showConnectorInMobile = isMobile ? network.mobile : true; => alway return true

              return (
                <ConnectWalletBox
                  key={key}
                  wallet={wallet}
                  handleProviderChosen={handleProviderChosen}
                  connectWalletLoading={connectWalletLoading}
                  walletName={walletName}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletDialog;
