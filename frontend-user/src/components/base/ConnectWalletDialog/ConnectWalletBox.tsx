import { AbstractConnector } from "@web3-react/abstract-connector";
import clsx from "clsx";
import { WalletInfo } from "../../../constants/connectors";
import styles from "./dialog.module.scss";

type ConnectWalletBoxProps = {
  wallet?: WalletInfo;
  handleProviderChosen?: (connector: AbstractConnector) => void;
  connectWalletLoading?: boolean;
};

const ConnectWalletBox = (props: ConnectWalletBoxProps) => {
  const { connectWalletLoading, handleProviderChosen, wallet } = props;

  const handleWalletChange = () => {
    wallet &&
      handleProviderChosen &&
      handleProviderChosen(wallet.connector as AbstractConnector);
  };

  if (!wallet) return <></>;

  const { name, icon } = wallet;

  return (
    <div
      className={clsx(
        "flex flex-col max-w-[108px] min-w-[96px] w-full gap-2 rounded bg-[#373737] items-center px-2 py-3 cursor-pointer justify-between",
      )}
      onClick={handleWalletChange}
    >
      {connectWalletLoading ? (
        <div className={styles.loading}>
          <div className={styles.rhombus}></div>
          <div className={styles.rhombus}></div>
          <div className={styles.rhombus}></div>
        </div>
      ) : (
        <img src={icon} alt="" className="w-10" />
      )}
      <p className="text-white text-center text-sm">{name}</p>
    </div>
  );
};

export default ConnectWalletBox;
