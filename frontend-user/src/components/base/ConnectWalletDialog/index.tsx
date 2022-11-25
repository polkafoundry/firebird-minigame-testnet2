import { Dialog } from "@headlessui/react";
import { SUPPORTED_WALLETS } from "../../../constants/connectors";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import { displayWalletAddress } from "../../../utils";
import ConnectWalletBox from "./ConnectWalletBox";

type ConnectWalletDialogTypes = {
  open: boolean;
  closeDialog: () => void;
  walletName?: any;
  handleProviderChosen?: any;
  connectWalletLoading?: boolean;
  isWrongChain?: boolean;
  connectedAccount?: any;
  disconnectWallet: () => void;
  realTimeBalance?: string;
};

const ConnectWalletDialog = (props: ConnectWalletDialogTypes) => {
  const {
    open,
    closeDialog,
    handleProviderChosen,
    connectWalletLoading,
    connectedAccount,
    disconnectWallet,
  } = props;
  const state = useMyWeb3();
  const { realTimeBalance, isWrongChain, nativeCurrency } = state;

  const handleAccountLogout = async () => {
    localStorage.removeItem("walletconnect");
    closeDialog();
    disconnectWallet && disconnectWallet();
  };

  const renderWalletInfo = () => {
    return (
      <div className="flex flex-col w-full font-tthoves">
        <div className="flex flex-col items-center">
          <p className="text-24/32 font-semibold text-center">Account</p>
          <img
            src="./images/connectors/metamask.png"
            alt=""
            className="w-20 mx-auto mt-5"
          />
          <div className="text-16/20 mt-3">
            {displayWalletAddress(connectedAccount)}
          </div>
        </div>

        <div className="font-inter mt-5">
          <div className="flex justify-between mt-2 xs:mt-3">
            <span className="opacity-70 text-14/24 xs:text-16/24">Balance</span>
            <span className="font-semibold text- 14/20 xs:text-16/24">{`${realTimeBalance} ${nativeCurrency}`}</span>
          </div>
          <div className="flex justify-between mt-2 xs:mt-3">
            <span className="opacity-70 text-14/24 xs:text-16/24">Network</span>
            {isWrongChain ? (
              <div className="text-red-600 font-semibold text- 14/20 xs:text-16/24">
                Wrong chain
              </div>
            ) : (
              <span className="font-semibold text- 14/20 xs:text-16/24">
                FireflyTestnet
              </span>
            )}
          </div>
          <div className="flex justify-between mt-2 xs:mt-3">
            <span className="opacity-70 text-14/24 xs:text-16/24">Wallet</span>
            <span className="font-semibold text- 14/20 xs:text-16/24">
              Web3
            </span>
          </div>
        </div>

        <div
          className="btn-rounded flex justify-center mt-5 p-3.5 border border-main"
          onClick={handleAccountLogout}
        >
          <img src="./images/connectors/disconnect.svg" alt="" />
          <span className="text-16/20 text-[#D01F36] ml-1.5 font-semibold">
            Disconnect
          </span>
        </div>
      </div>
    );
  };

  const renderWalletConnect = () => {
    return (
      <div className="flex flex-col w-full items-center">
        <p className="text-2xl font-semibold text-center">Connect Wallet</p>

        <div className="flex gap-3 mt-10">
          {Object.keys(SUPPORTED_WALLETS).map((key: string) => {
            const wallet = SUPPORTED_WALLETS[key];

            return (
              <ConnectWalletBox
                key={key}
                wallet={wallet}
                handleProviderChosen={handleProviderChosen}
                connectWalletLoading={connectWalletLoading}
                closeDialog={closeDialog}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onClose={closeDialog} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <Dialog.Panel className="w-full h-fit relative m-auto bg-[#242424] text-white max-w-[400px] p-10 rounded-2xl">
          <img
            src="/images/icon-close.svg"
            alt=""
            className="absolute top-4 right-4 cursor-pointer w-6 h-6"
            onClick={closeDialog}
          />

          {connectedAccount ? renderWalletInfo() : renderWalletConnect()}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConnectWalletDialog;
