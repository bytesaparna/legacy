import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, arbitrum, polygon, optimism, base, avalanche, somniaTestnet } from 'wagmi/chains';


export const config = getDefaultConfig({
    appName: 'Legacy',
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID, // Get this from https://cloud.walletconnect.com/
    chains: [mainnet, arbitrum, polygon, optimism, base, avalanche,somniaTestnet],
    ssr: true, // If your dApp uses server side rendering (SSR)
});