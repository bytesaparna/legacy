import { router } from "./trpc";
import { userRouter } from "./user/route";
import { willRouter } from "./will/route";

export const appRouter = router({
    user: userRouter,
    will: willRouter,
});

export type AppRouter = typeof appRouter;
