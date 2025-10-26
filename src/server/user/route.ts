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
        }),

    updateWellnessCheckPreference: publicProcedure
        .input(z.object({ 
            userId: z.string(),
            enabled: z.boolean()
        }))
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.update({
                where: { id: input.userId },
                data: { wellnessCheckEnabled: input.enabled }
            })
            return { 
                success: true, 
                wellnessCheckEnabled: user.wellnessCheckEnabled 
            }
        }),

    getWellnessCheckStatus: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { id: input.userId },
                select: {
                    lastWellnessCheck: true,
                    wellnessCheckEnabled: true
                }
            })
            
            if (!user) {
                return null;
            }

            const now = new Date();
            const lastCheck = user.lastWellnessCheck;
            let daysUntilNextCheck = 30;

            if (lastCheck) {
                const daysSinceCheck = Math.floor(
                    (now.getTime() - lastCheck.getTime()) / (1000 * 60 * 60 * 24)
                );
                daysUntilNextCheck = Math.max(0, 30 - daysSinceCheck);
            }

            return {
                lastWellnessCheck: user.lastWellnessCheck,
                wellnessCheckEnabled: user.wellnessCheckEnabled,
                daysUntilNextCheck
            }
        })
});
