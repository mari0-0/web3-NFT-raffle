import { http, createConfig } from 'wagmi'
import { sepolia, arbitrumSepolia } from 'wagmi/chains'
import {
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [rainbowWallet, walletConnectWallet],
    },
  ],
  {
    appName: "Xaffle",
    projectId: "YOUR_PROJECT_ID",
  }
);

const config = createConfig({
  connectors: connectors,
  chains: [sepolia, arbitrumSepolia],
  transports: {
    [sepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
})

export { config, connectors }