import { createTRPCRouter, publicProcedure } from "@/lib/trpc/trpc";
import { withContractAddress } from "../../procedures/withContractAddress";
import { CW721_TOKENS } from "@/lib/andrjs/cw721/token";
import z from "zod"
import { fetchCw721TokenDetails, queryCw721AllTokenIds, queryCw721TokenInfo } from "./query";
import { UriDataType } from "./types";


export const cw721Router = createTRPCRouter({
    getAllTokenId: withContractAddress
        .input(z.object({ limit: z.custom<CW721_TOKENS.GetAllTokensLimit>().optional() }))
        .query<CW721_TOKENS.GetAllTokenIdResponse>(async ({ input, ctx }) => {
            const tokenIds = await queryCw721AllTokenIds(
                ctx.chainConfig.lcdUrl,
                ctx.resolvedContractAddress,
                input.limit
            )
            return tokenIds
        }),

    getTokenInfo: withContractAddress
        .input(z.object({ tokenId: z.string() }))
        .query<CW721_TOKENS.GetTokenInfoResponse>(async ({ ctx, input }) => {
            const tokenInfo = await queryCw721TokenInfo(
                ctx.chainConfig.lcdUrl,
                ctx.resolvedContractAddress,
                input.tokenId
            )
            return tokenInfo
        }),

    fetchTokenData: publicProcedure
        .input(z.object({ token_uri: z.string() }))
        .query<UriDataType>(async ({ input }) => {
            const tokenDetails = await fetchCw721TokenDetails(
                input.token_uri
            )
            return tokenDetails
        })

})