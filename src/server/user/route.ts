import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
    registerUser: publicProcedure
        .input(z.object({ name: z.string(), email: z.string(), walletAddress: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { walletAddress: input.walletAddress }
            })
            if (user) {
                return { error: "User already exists" }
            }
            try {
                return ctx.prisma.user.create({
                    data: {
                        name: input.name,
                        email: input.email,
                        walletAddress: input.walletAddress
                    }
                });
            } catch (error) {
                console.error(error)
                return { error: "Failed to register user" }
            }
        }),

    getUser: publicProcedure
        .input(z.object({ walletAddress: z.string() }))
        .query(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.findUnique({
                where: {
                    walletAddress: input.walletAddress
                }
            })
            return user
        })
});
