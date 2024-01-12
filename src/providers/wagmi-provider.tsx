import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { type PropsWithChildren } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

import { SUPPORTED_CHAINS } from '../constants/supported-chains.ts';

const projectId = import.meta.env.VITE_PROJECT_ID;

// 2. Create wagmiConfig
const { chains, publicClient } = configureChains(SUPPORTED_CHAINS, [
  walletConnectProvider({ projectId }),
  publicProvider(),
]);

const metadata = {
  name: 'Redduck Flow POC',
  description: 'Proof of Concept for Redduck Flow project',
  url: 'https://redduck-flow-poc.netlify.app',
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: { appName: metadata.name },
    }),
  ],
  publicClient,
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains, themeMode: 'light' });

export const WagmiProvider = ({ children }: PropsWithChildren) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};
