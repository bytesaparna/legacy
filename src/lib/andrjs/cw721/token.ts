export namespace CW721_TOKENS {

    export interface GetAllTokensLimit {
        limit: number
    }

    export function getAllTokensLimit(value?: GetAllTokensLimit): GetAllTokensLimit {
        return {
            limit: value?.limit ?? 5
        }
    }

    export const getAllTokenIdMsg = (limitValue: GetAllTokensLimit) => {
        return {
            all_tokens: {
                limit: limitValue.limit
            }
        };
    };

    export type GetAllTokenIdResponse = { tokens: string[] };


    export const getTokenInfoMsg = (tokenId: string) => {
        return {
            nft_info: { token_id: tokenId }
        };
    };

    export type GetTokenInfoResponse = { token_uri: string, extension: unknown }
}

