import { Dialog } from "@headlessui/react";
import { SUPPORTED_WALLETS } from "../../../constants/connectors";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import { displayWalletAddress } from "../../../utils";
import Button from "../Button";
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
    walletName,
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
      <div className="flex flex-col w-full">
        <p className="text-2xl font-semibold text-center">Account</p>
        <div className="flex justify-between mt-4">
          <span className="">{displayWalletAddress(connectedAccount)}</span>

          <Button
            className="h-9 bg-main rounded-lg w-fit px-5"
            onClick={handleAccountLogout}
          >
            Disconnect
          </Button>
        </div>

        {isWrongChain ? (
          <div className="text-red-600">Wrong chain Id</div>
        ) : (
          <div className="flex justify-between">
            <span>Balance</span>
            <span className="font-semibold">{`${realTimeBalance} ${nativeCurrency}`}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Wallet</span>
          <span className="font-semibold">Web3</span>
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
                walletName={walletName}
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

        <Dialog.Panel className="w-full h-fit relative m-auto bg-[#242424] text-white max-w-[360px] p-10 rounded-2xl">
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
