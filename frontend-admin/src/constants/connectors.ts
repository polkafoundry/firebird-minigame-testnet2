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
}

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
};
