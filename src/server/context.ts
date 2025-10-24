import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";


export async function createContext() {
    const { userId } = await auth();

    return {
        prisma,
        clerkUserId: userId,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
