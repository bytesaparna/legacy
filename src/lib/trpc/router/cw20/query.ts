import { CW20_TOKENS } from "@/lib/andrjs/cw20/token";
import { LcdClient } from "@/lib/andrjs/lcd-client/client";
import cachified, { CacheEntry } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, CacheEntry>({
    max: 5,
});


export async function queryCw20TotalTokenSupply(lcdUrl: string, sharesAddress: string) {
    return cachified({
        key: ["query", "cw20", "getTotalSupply", sharesAddress].join("-"),
        cache,
        ttl: 1000 * 60 * 5, // 5 minutes
        getFreshValue: async () => {
            const lcdClient = new LcdClient(lcdUrl);
            const allTokenIds =
                await lcdClient.queryContractSmart<CW20_TOKENS.GetTotalSupplyResponse>(
                    sharesAddress,
                    CW20_TOKENS.getTotalSupply(),
                );
            return allTokenIds;
        },
    });
}

export async function queryAllAccounts(lcdUrl: string, sharesAddress: string, limit?: CW20_TOKENS.GetAllAccountsLimit) {
    limit = CW20_TOKENS.getAllCountsLimit(limit)
    return cachified({
        key: ["query", "cw20", "getAllAccounts", sharesAddress, limit.limit].join("-"),
        cache,
        ttl: 1000 * 60 * 5,      //5 minutes
        getFreshValue: async () => {
            const lcdClient = new LcdClient(lcdUrl);
            const allAccounts = await lcdClient.queryContractSmart<CW20_TOKENS.GetAllAccountsResponse>(
                sharesAddress,
                CW20_TOKENS.getAllAccounts(limit),
            )
            return allAccounts;
        }
    })

}


export async function queryBalance(lcdUrl: string, sharesAddress: string, address: string) {
    return cachified({
        key: ["query", "cw20", "getBalance", sharesAddress, address].join("-"),
        cache,
        ttl: 1000 * 60 * 5,      //5 minutes
        getFreshValue: async () => {
            const lcdClient = new LcdClient(lcdUrl);
            const balance = await lcdClient.queryContractSmart<CW20_TOKENS.GetBalanceResponse>(
                sharesAddress,
                CW20_TOKENS.getBalance(address),
            )
            return balance;
        }
    })

}