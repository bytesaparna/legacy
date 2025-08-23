import { withContractAddress } from "../../procedures/withContractAddress";
import { createTRPCRouter } from "../../trpc";
import z from "zod"
import { EXCHANGE } from "@/lib/andrjs/exchange/sale";
import { querySaleInfo } from "./query";

export const exchangeRouter = createTRPCRouter({
    getSaleInfo: withContractAddress
        .input(z.object({ denom: z.string() }))
        .query<EXCHANGE.GetSaleResponse['sale']>(async ({ ctx, input }) => {
            const saleInfo = await querySaleInfo(
                ctx.chainConfig.lcdUrl,
                ctx.resolvedContractAddress,
                input.denom
            );
            return saleInfo.sale
        }),
})