import { prisma } from "@/prisma";

export async function createContext() {
    return {
        prisma,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
