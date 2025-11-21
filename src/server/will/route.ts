import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "@/prisma";

export const willRouter = router({
    createWill: publicProcedure
        .input(z.object({
            userId: z.string(),
            personalInfo: z.object({
                fullName: z.string(),
                dateOfBirth: z.string(),
                address: z.string(),
                maritalStatus: z.string(),
                occupation: z.string().optional(),
            }),
            assets: z.array(z.object({
                type: z.string(),
                category: z.string(),
                name: z.string(),
                description: z.string(),
                value: z.number(),
                location: z.string(),
                documents: z.array(z.string()),
                notes: z.string().optional(),
                beneficiaries: z.array(z.object({
                    name: z.string(),
                    relationship: z.string(),
                    share: z.string(),
                    walletAddress: z.string(),
                }))
            })),
            onChainAssets: z.array(z.object({
                assetType: z.string(),
                blockchain: z.string(),
                contractAddress: z.string().optional(),
                tokenId: z.string().optional(),
                tokenSymbol: z.string().optional(),
                walletAddress: z.string(),
                estimatedValue: z.number(),
                description: z.string(),
                notes: z.string().optional(),
                beneficiaries: z.array(z.object({
                    name: z.string(),
                    relationship: z.string(),
                    share: z.string(),
                    walletAddress: z.string(),
                }))
            })),
            specialInstructions: z.string().optional(),
            status: z.string().optional().default("draft"),
        }))
        .mutation(async ({ input }) => {
            // First, ensure the user exists (create if not)
            let user = await prisma.user.findUnique({
                where: { id: input.userId }
            });

            // If user not found by ID, try finding by wallet address or create new
            if (!user) {
                // Try to find user by wallet address from the userId field
                user = await prisma.user.findUnique({
                    where: { walletAddress: input.userId }
                });

                // If still not found, create a new user with basic info
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            walletAddress: input.userId,
                            name: input.personalInfo.fullName,
                            email: `${input.userId}@temp.com` // Temporary email
                        }
                    });
                }
            }

            // Create the will with all related data
            const will = await (prisma.will.create as any)({
                data: {
                    userId: user.id,
                    // Personal Information
                    fullName: input.personalInfo.fullName,
                    dateOfBirth: input.personalInfo.dateOfBirth,
                    address: input.personalInfo.address,
                    maritalStatus: input.personalInfo.maritalStatus,
                    occupation: input.personalInfo.occupation,
                    // Special Instructions
                    specialInstructions: input.specialInstructions,
                    // Status
                    status: input.status || "draft",
                    // Create assets with their beneficiaries
                    assets: {
                        create: input.assets.map(asset => ({
                            type: asset.type,
                            category: asset.category,
                            name: asset.name,
                            description: asset.description,
                            value: asset.value,
                            location: asset.location,
                            documents: asset.documents,
                            notes: asset.notes,
                            beneficiaries: {
                                create: asset.beneficiaries.map(ben => ({
                                    name: ben.name,
                                    relationship: ben.relationship,
                                    share: ben.share,
                                    walletAddress: ben.walletAddress,
                                }))
                            }
                        }))
                    },
                    // Create on-chain assets with their beneficiaries
                    onChainAssets: {
                        create: input.onChainAssets.map(asset => ({
                            assetType: asset.assetType,
                            blockchain: asset.blockchain,
                            contractAddress: asset.contractAddress,
                            tokenId: asset.tokenId,
                            tokenSymbol: asset.tokenSymbol,
                            walletAddress: asset.walletAddress,
                            estimatedValue: asset.estimatedValue,
                            description: asset.description,
                            notes: asset.notes,
                            beneficiaries: {
                                create: asset.beneficiaries.map(ben => ({
                                    name: ben.name,
                                    relationship: ben.relationship,
                                    share: ben.share,
                                    walletAddress: ben.walletAddress,
                                }))
                            }
                        }))
                    },
                },
                include: {
                    assets: {
                        include: {
                            beneficiaries: true,
                        }
                    },
                    onChainAssets: {
                        include: {
                            beneficiaries: true
                        }
                    },
                }
            });

            return will;
        }),

    getWillsByUser: publicProcedure
        .input(z.object({
            userId: z.string()
        }))
        .query(async ({ input }) => {
            const wills = await (prisma.will.findMany as any)({
                where: {
                    userId: input.userId
                },
                include: {
                    assets: {
                        include: {
                            beneficiaries: true
                        }
                    },
                    onChainAssets: {
                        include: {
                            beneficiaries: true
                        }
                    },
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            });

            return wills;
        }),

    getWillById: publicProcedure
        .input(z.object({
            willId: z.string()
        }))
        .query(async ({ input }) => {
            const will = await (prisma.will.findUnique as any)({
                where: {
                    id: input.willId
                },
                include: {
                    assets: {
                        include: {
                            beneficiaries: true
                        }
                    },
                    onChainAssets: {
                        include: {
                            beneficiaries: true
                        }
                    },
                }
            });

            return will;
        }),

    updateWill: publicProcedure
        .input(z.object({
            willId: z.string(),
            status: z.string().optional(),
            transactionHash: z.string().optional(),
        }))
        .mutation(async ({ input }) => {
            const will = await prisma.will.update({
                where: {
                    id: input.willId
                },
                data: {
                    ...(input.status && { status: input.status }),
                    ...(input.transactionHash && { transactionHash: input.transactionHash }),
                },
                include: {
                    assets: {
                        include: {
                            beneficiaries: true,
                        }
                    },
                    onChainAssets: {
                        include: {
                            beneficiaries: true
                        }
                    },
                }
            });

            return will;
        }),
});
