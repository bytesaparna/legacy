import { CW20_TOKENS } from "@/lib/andrjs/cw20/token";
import { withContractAddress } from "../../procedures/withContractAddress";
import { createTRPCRouter } from "../../trpc";
import z from "zod"
import { queryAllAccounts, queryBalance, queryCw20TotalTokenSupply } from "./query";

export const cw20Router = createTRPCRouter({
    getTotalSupply: withContractAddress
        .input(z.object({}))
        .query<CW20_TOKENS.GetTotalSupplyResponse>(async ({ ctx }) => {
            const totalSupply = await queryCw20TotalTokenSupply(
                ctx.chainConfig.lcdUrl,
                ctx.resolvedContractAddress
            )
            return totalSupply
        }),

    getAllAccounts: withContractAddress
        .input(z.object({ limit: z.custom<CW20_TOKENS.GetAllAccountsLimit>().optional() }))
        .query<CW20_TOKENS.GetAllAccountsResponse>(async ({ input, ctx }) => {
            const allAccounts = await queryAllAccounts(
                ctx.chainConfig.lcdUrl,
                ctx.resolvedContractAddress,
                input.limit
            )
            return allAccounts
        }),


    getBalance: withContractAddress
        .input(z.object({ address: z.string() }))
        .query<CW20_TOKENS.GetBalanceResponse>(async ({ ctx, input }) => {
            const balance = await queryBalance(
                ctx.chainConfig.lcdUrl,
                ctx.resolvedContractAddress,
                input.address
            )
            return balance
        })

})