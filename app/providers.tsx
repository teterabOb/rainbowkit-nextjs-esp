"use client"
import '@rainbow-me/rainbowkit/styles.css';
import {    
    RainbowKitProvider,
    connectorsForWallets
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    avalancheFuji
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { intmaxwalletsdk } from "intmax-walletsdk/rainbowkit";

const additionalWallets = [
    intmaxwalletsdk({
        wallet: {
            url: "https://intmaxwallet-sdk-wallet.vercel.app/",
            name: "IntmaxWallet ETH Volcano",
            iconUrl: "https://intmaxwallet-sdk-wallet.vercel.app/vite.svg",
        },
        metadata: {
            name: "Rainbow-Kit Demo",
            description: "Rainbow-Kit Demo",
            icons: ["https://intmaxwallet-sdk-wallet.vercel.app/vite.svg"],
        },
    }),
];

const connectors =  connectorsForWallets(
    [
      {
        groupName: "Best Walletz",
        wallets: additionalWallets,
      },
    ],
    { projectId: "N/A", appName: "ETH Volcano Example" },
  )

export function Providers({ children }: { children: React.ReactNode }) {

    const wagmiConfig = createConfig({                 
        chains: [mainnet, polygon, optimism, arbitrum, base, avalancheFuji],
        transports: {
            [polygon.id]: http("https://polygon-rpc.com"),
            [mainnet.id]: http("https://mainnet-rpc.com"),
            [optimism.id]: http("https://optimism-rpc.com"),
            [arbitrum.id]: http("https://arbitrum-rpc.com"),
            [base.id]: http("https://base-rpc.com"),
            [avalancheFuji.id]: http("https://avalanche-fuji-rpc.com"),
        },
        connectors,
    });
    

    const queryClient = new QueryClient();

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}