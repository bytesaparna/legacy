import { PRIMITIVE } from "@/lib/andrjs/primitive"
import { withContractAddress } from "../../procedures/withContractAddress"
import { createTRPCRouter } from "../../trpc"
import z from "zod"
import { queryAllKeys, queryValue } from "./query"

export const primitiveRouter = createTRPCRouter({
    getAllKeys: withContractAddress
        .input(z.object({}))
        .query<PRIMITIVE.GetAllKeysResponse>(async ({ ctx }) => {
            const allKeys = await queryAllKeys(
                ctx.chainConfig.lcdUrl,
                ctx.resolvedContractAddress,
            )
            return allKeys
        }),


    getValue: withContractAddress
        .input(z.object({ keys: z.array(z.string()) }))
        .query<PRIMITIVE.GetValueResponse[]>(async ({ ctx, input }) => {
            const values = await Promise.all(
                input.keys.map(async (key) => {
                    const value = await queryValue(
                        ctx.chainConfig.lcdUrl,
                        ctx.resolvedContractAddress,
                        key
                    )
                    return value
                })
            )
            return values
        })

})