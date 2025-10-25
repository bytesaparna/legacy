import { router } from "./trpc";
import { userRouter } from "./user/route";

export const appRouter = router({
    user: userRouter,
});

export type AppRouter = typeof appRouter;
