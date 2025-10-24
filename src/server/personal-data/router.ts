import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const personalDataRouter = router({
    addPersonalData: publicProcedure
        .input(z.object({ fullName: z.string(), email: z.string(), imageUrl: z.string() }))
        .mutation(async ({ input, ctx }) => {
            if (!ctx.clerkUserId) {
                return { error: "Unauthorised" }
            }
            const user = await ctx.prisma.user.findUnique({
                where: { clerkId: ctx.clerkUserId }
            })
            if (user) {
                console.log("User Already exist")
                return user
            }

            return ctx.prisma.user.create({
                data: {
                    clerkId: ctx.clerkUserId,
                    name: input.fullName,
                    email: input.email,
                    imageUrl: input.imageUrl
                }
            });
        }),
});
