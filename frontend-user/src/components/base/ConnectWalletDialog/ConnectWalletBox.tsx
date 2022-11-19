import { AbstractConnector } from "@web3-react/abstract-connector";
import clsx from "clsx";
import { isMobile } from "react-device-detect";
import { WalletInfo } from "../../../constants/connectors";
import styles from "./dialog.module.scss";

type ConnectWalletBoxProps = {
  wallet?: WalletInfo;
  handleProviderChosen?: (
    name: string,
    connector: AbstractConnector,
    closeDialog: () => void,
  ) => void;
  connectWalletLoading?: boolean;
  closeDialog: () => void;
};

const ConnectWalletBox = (props: ConnectWalletBoxProps) => {
  const { connectWalletLoading, handleProviderChosen, wallet, closeDialog } =
    props;

  const handleWalletChange = () => {
    wallet &&
      handleProviderChosen &&
      handleProviderChosen(
        wallet.name,
        wallet.connector as AbstractConnector,
        closeDialog,
      );
  };

  if (!wallet) return <></>;

  const { name, icon } = wallet;

  return (
    <div
      className={clsx(
        "flex flex-col max-w-[108px] min-w-[96px] w-full gap-2 rounded bg-[#373737] items-center px-2 py-3 cursor-pointer justify-between",
      )}
      onClick={() => {
        // if (isMobile && wallet?.deepLink) {
        //   window.open(wallet.deepLink);
        //   return;
        // }
        handleWalletChange();
      }}
    >
      {connectWalletLoading ? (
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
