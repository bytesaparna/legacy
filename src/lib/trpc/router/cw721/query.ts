import { CW721_TOKENS } from "@/lib/andrjs/cw721/token";
import { LcdClient } from "@/lib/andrjs/lcd-client/client";
import cachified, { CacheEntry } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";
import { UriDataType } from "./types";

const cache = new LRUCache<string, CacheEntry>({
    max: 5,
});


export async function queryCw721AllTokenIds(lcdUrl: string, vehicleAddress: string, limit?: CW721_TOKENS.GetAllTokensLimit) {
    limit = CW721_TOKENS.getAllTokensLimit(limit)
    return cachified({
        key: ["query", "cw721", "getAllTokenIds", vehicleAddress, limit.limit].join("-"),
        cache,
        ttl: 1000 * 60 * 5, // 5 minutes
        getFreshValue: async () => {
            const lcdClient = new LcdClient(lcdUrl);
            const allTokenIds =
                await lcdClient.queryContractSmart<CW721_TOKENS.GetAllTokenIdResponse>(
                    vehicleAddress,
                    CW721_TOKENS.getAllTokenIdMsg(limit),
                );
            return allTokenIds;
        },
    });
}


export async function queryCw721TokenInfo(lcdUrl: string, contractAddress: string, token_id: string) {
    return cachified({
        key: ["query", "cw721", "getTokenInfo", contractAddress, token_id].join("-"),
        cache,
        ttl: 1000 * 60 * 5, // 5 minutes
        getFreshValue: async () => {
            const lcdClient = new LcdClient(lcdUrl);
            const tokenInfo =
                await lcdClient.queryContractSmart<CW721_TOKENS.GetTokenInfoResponse>(
                    contractAddress,
                    CW721_TOKENS.getTokenInfoMsg(token_id),
                );
            return tokenInfo;
        },
    });
}

export async function fetchCw721TokenDetails(token_uri: string) {
    return cachified({
        key: ["query", "cw721", "getAllTokenDetails", token_uri].join("-"),
        cache,
        ttl: 1000 * 60 * 5, // 5 minutes
        getFreshValue: async () => {
            const response = await fetch(token_uri)
            return response.json().then(res => {
                return res as UriDataType
            })
        },
    });

}