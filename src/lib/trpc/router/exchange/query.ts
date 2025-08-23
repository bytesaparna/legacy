import { EXCHANGE } from "@/lib/andrjs/exchange/sale";
import { LcdClient } from "@/lib/andrjs/lcd-client/client";
import cachified, { CacheEntry } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";


const cache = new LRUCache<string, CacheEntry>({
    max: 5,
});


export async function querySaleInfo(lcdUrl: string, contractAddress: string, denom: string) {
    return cachified({
        key: ["query", "exchange", "getSaleInfo", contractAddress, denom].join("-"),
        cache,
        ttl: 1000 * 60 * 5, // 5 minutes
        getFreshValue: async () => {
            const lcdClient = new LcdClient(lcdUrl);
            const saleInfo =
                await lcdClient.queryContractSmart<EXCHANGE.GetSaleResponse>(
                    contractAddress,
                    EXCHANGE.getSaleInfo(denom)

                );
            console.log("SALE INFO", saleInfo, contractAddress, denom)
            return saleInfo;
        },
    });
}


