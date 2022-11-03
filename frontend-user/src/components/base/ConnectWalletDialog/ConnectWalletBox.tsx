import { AbstractConnector } from "@web3-react/abstract-connector";
import clsx from "clsx";
import { isMobile } from "react-device-detect";
import { WalletInfo } from "../../../constants/connectors";
import styles from "./dialog.module.scss";

type ConnectWalletBoxProps = {
  wallet?: WalletInfo;
  handleProviderChosen?: (name: string, connector: AbstractConnector) => void;
  connectWalletLoading?: boolean;
  walletName?: (string | undefined)[];
};

const ConnectWalletBox = (props: ConnectWalletBoxProps) => {
  const { connectWalletLoading, handleProviderChosen, wallet } = props;

  const handleWalletChange = () => {
    wallet &&
      handleProviderChosen &&
      handleProviderChosen(wallet.name, wallet.connector as AbstractConnector);
  };

  if (!wallet) return <></>;

  const { name, icon } = wallet;
  // const selectingWallet = walletName && walletName.indexOf(name) >= 0;

  return (
    <div
      className={clsx(
        "flex flex-col max-w-[108px] min-w-[96px] w-full gap-2 rounded bg-[#373737] items-center px-2 py-3 cursor-pointer justify-between",
        // {
        //   "border-[#5EFF8B] border-[1px]": selectingWallet,
        // },
      )}
      onClick={() => {
        if (isMobile && wallet?.deepLink) {
          window.open(wallet.deepLink);
          return;
        }
        handleWalletChange();
      }}
    >
      {connectWalletLoading ? (
        // <img src="/images/loading.svg" alt="" />
        <div className={styles.loading}>
          <div className={styles.rhombus}></div>
          <div className={styles.rhombus}></div>
          <div className={styles.rhombus}></div>
        </div>
      ) : (
        <img src={icon} alt="" />
      )}
      <p className="text-white text-center text-sm">{name}</p>
    </div>
  );
};

export default ConnectWalletBox;
