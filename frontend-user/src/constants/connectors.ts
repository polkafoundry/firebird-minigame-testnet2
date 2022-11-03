import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

const METAMASK_DEEPLINK = process.env.REACT_APP_METAMASK_DEEPLINK;

export const injected = new InjectedConnector({});

export interface WalletInfo {
  connector: AbstractConnector;
  name: string;
  // iconName: string
  description: string;
  href: string | null;
  // color: string
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
  disableIcon: string;
  icon: string;
  deepLink?: string;
}

export enum ConnectorNames {
  MetaMask = "MetaMask",
  // WalletConnect = "WalletConnect",
}
// mainnet only
// export const walletConnect = new WalletConnectConnector({
//   rpc: {},
//   bridge: "https://bridge.walletconnect.org",
//   qrcode: true,
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   //@ts-ignore
//   pollingInterval: 10000,
// });

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: ConnectorNames.MetaMask,
    icon: "/images/connectors/metamask.svg",
    disableIcon: "/images/connectors/metamask-disabled.svg",
    description: "Easy-to-use browser extension.",
    href: null,
    mobile: true,
    deepLink: METAMASK_DEEPLINK,
  },
  // WALLET_CONNECT: {
  //   connector: walletConnect,
  //   name: ConnectorNames.WalletConnect,
  //   icon: "/images/connectors/wallet-connect.svg",
  //   description: "Connect to Trust Wallet, Rainbow Wallet and more...",
  //   disableIcon: "/images/connectors/wallet-connect-disabled.svg",
  //   href: null,
  //   mobile: true,
  // },
};
