import { AUCTION } from "@/lib/andrjs/auction";
import { trpcReactClient } from "@/lib/trpc/client";

// Use to get bids 
export const useGetBids = (chain: string, auctionAddress: string, auctionId: string, pagination?: AUCTION.GetBidsPagination) => {

    const { data: bids, isLoading, isError } = trpcReactClient.auction.getBids.useQuery({
        "chain-identifier": chain,
        "contract-address": auctionAddress,
        auctionId: auctionId,
        pagination
    }, { enabled: !!chain && !!auctionAddress && !!auctionId })

    return { bids, isLoading, isError }
};