import { CW721_TOKENS } from "@/lib/andrjs/cw721/token";
import { trpcReactClient } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";

// Use to get list of all token id's
export const useGetAllTokenId = (chain: string, vehicleAddress: string, limit?: CW721_TOKENS.GetAllTokensLimit) => {

    const { data: allTokenId, isLoading, isError } = trpcReactClient.cw721.getAllTokenId.useQuery({
        "chain-identifier": chain,
        "contract-address": vehicleAddress,
        limit
    }, { enabled: !!chain && !!vehicleAddress })

    return { allTokenId, isLoading, isError }
};