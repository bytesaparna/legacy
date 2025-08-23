import { trpcReactClient } from "@/lib/trpc/client";

// Use to get value for a given key
export const useGetValue = (chain: string, primitiveAddress: string, keys: string[]) => {
    const { data: value, isLoading, isError } = trpcReactClient.primitive.getValue.useQuery({
        "chain-identifier": chain,
        "contract-address": primitiveAddress,
        keys: keys
    }, { enabled: !!chain && !!primitiveAddress && !!keys })
    return { value, isLoading, isError }
}