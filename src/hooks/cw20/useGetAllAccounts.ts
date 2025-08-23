import { CW20_TOKENS } from "@/lib/andrjs/cw20/token"
import { trpcReactClient } from "@/lib/trpc/client"


// Use to get information about all the addresses that have a balance of CW20 token.
export const useGetAllAccounts = (chain: string, cw20Address: string,limit?:CW20_TOKENS.GetAllAccountsLimit) => {
    const { data: allAccounts, isLoading, isError } = trpcReactClient.cw20.getAllAccounts.useQuery({
        "chain-identifier": chain,
        "contract-address": cw20Address,
        limit
    }, { enabled: !!chain && !!cw20Address })
    
    return { allAccounts, isLoading, isError }
}