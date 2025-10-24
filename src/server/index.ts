import { personalDataRouter } from "./personal-data/router";
import { router } from "./trpc";

export const appRouter = router({
    personalData: personalDataRouter
});

export type AppRouter = typeof appRouter;
