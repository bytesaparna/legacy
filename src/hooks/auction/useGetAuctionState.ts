import { trpcReactClient } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";

// Use to get auction_state information of the token
export const useGetAuctionState = (chain: string, auctionAddress: string, tokenAddress: string, tokenId: string) => {
    const { data: auctionState, isLoading, isError } = trpcReactClient.auction.getLatestAuctionState.useQuery({
        "chain-identifier": chain,
        "contract-address": auctionAddress,
        tokenAddress: tokenAddress,
        tokenId: tokenId
    }, { enabled: !!chain && !!auctionAddress && !!tokenAddress && !!tokenId })

    return { auctionState, isLoading, isError };
};
