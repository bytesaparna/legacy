"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { DashboardCardAnimation } from "./dashboard-animation"
import { Header } from "../landing/header"
import { useState } from "react"
import { api } from "@/trpc/trpc"
import { useAccount, useAccountEffect, useWalletClient } from "wagmi"
import { WillData } from "@/zustand/will-data"
import { toast } from "sonner"
import { publishWill } from "@/lib/somnia/publish-will"
import { AlertCircle, CheckCircle } from "lucide-react"

export const Dashboard = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { data: walletClient } = useWalletClient()
    const { address } = useAccount()
    const { data: user } = api.user.getUser.useQuery({
        walletAddress: address ?? ""
    })

    const { data: userWills } = api.will.getWillsByUser.useQuery({
        userId: user?.id ?? ""
    }, {
        enabled: !!user?.id
    })
    console.log("userWills", userWills)

    const totalWills = userWills?.length ?? 0
    const beneficiaries = userWills?.reduce((acc: number, will: any) => acc + (will.beneficiaries?.length ?? 0), 0) ?? 0
    const assetsSecured = userWills?.reduce((acc: number, will: any) => acc + (will.assets?.reduce((acc: number, asset: any) => acc + asset.value, 0) ?? 0), 0) ?? 0

    const stats = [
        { label: "Total Wills", value: totalWills, icon: "📄" },
        { label: "Beneficiaries", value: beneficiaries, icon: "👥" },
        { label: "Assets Secured", value: assetsSecured, icon: "💎" },
    ]

    const utils = api.useUtils()
    const updateWillMutation = api.will.updateWill.useMutation({
        onSuccess: () => {
            // Invalidate and refetch the wills query after successful update
            utils.will.getWillsByUser.invalidate({ userId: user?.id ?? "" })
        }
    })

    const handleMintWill = async (willData: WillData & { id?: string }, willId?: string) => {
        try {
            toast.info("Publishing will to Somnia blockchain...", {
                style: {
                    background: "oklch(0.6716 0.1368 48.513)",
                    color: "oklch(0.1797 0.0043 308.1928)",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    border: "1px solid oklch(0.6716 0.1368 48.513)",
                },
                duration: 3000,
                position: "top-right",
            })

            const { tx, willId: publishedWillId, data, encodedWillData } = await publishWill(walletClient, willData)
            console.log("Will published:", { tx, willId: publishedWillId, data, encodedWillData })

            // Update the will status in the database if we have a will ID
            if (willId && tx) {
                await updateWillMutation.mutateAsync({
                    willId: willId,
                    transactionHash: tx,
                    status: "published",
                })
            }

            toast.success("Will published to blockchain!", {
                style: {
                    background: "oklch(0.6716 0.1368 48.513)",
                    color: "oklch(0.1797 0.0043 308.1928)",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    border: "1px solid oklch(0.6716 0.1368 48.513)",
                },
                duration: 5000,
                position: "top-right",
                icon: <CheckCircle className="w-5 h-5" />,
                description: `Transaction: ${tx}`,
            })
        } catch (error) {
            console.error("Error in handleGenerateWillOnchain:", error)
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
            toast.error(`Failed to publish will: ${errorMessage}`, {
                style: {
                    background: "oklch(0.1797 0.0043 308.1928)",
                    color: "#ef4444",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    border: "1px solid #ef4444",
                },
                duration: 7000,
                position: "top-right",
                icon: <AlertCircle className="w-5 h-5" />,
            })
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Header isScrolled={isScrolled} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <div className="container mx-auto px-4 py-8">

                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                    >
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="bg-zinc-900/50 shadow-[0_0_10px_oklch(0.6716_0.1368_48.513/0.6)] border border-border/50 rounded-xl p-4 text-center hover:border-primary/30 transition"
                            >
                                <div className="text-2xl mb-2">{stat.icon}</div>
                                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                                <div className="text-xs text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* My Wills Portfolio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-serif font-bold text-foreground">My Wills</h2>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex justify-center items-center"
                            >
                                <Link href="/will-builder">
                                    <button className="w-full px-6 py-4 border border-primary/30 rounded-lg text-primary hover:bg-primary/5 transition">
                                        + Create New Will
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {userWills?.map((will: any, idx: number) => (
                                <DashboardCardAnimation key={will.personalInfo || `will-${idx}`} delay={idx * 0.1}>
                                    <div className="group bg-zinc-900/50 border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white">{will.fullName ?? "Unknown"}</h3>
                                                <p className="text-sm text-white">DOB {will.dateOfBirth || "Unknown"}</p>
                                            </div>
                                        </div>

                                        <div className="ml-auto flex gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex-1 px-4 py-2 text-sm border bg-primary border-border/50 rounded-lg hover:bg-background/50 transition"
                                            >
                                                View
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="flex-1 px-4 py-2 text-sm border bg-primary border-border/50 rounded-lg hover:bg-background/50 transition"
                                            >
                                                Download
                                            </motion.button>
                                            {will.status === "published" ?
                                                <Link href={`https://shannon-explorer.somnia.network/tx/${will.transactionHash}`} target="_blank">
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="flex-1 px-4 py-2 text-sm bg-primary border border-primary/30 rounded-lg hover:border-primary/50 transition"
                                                    >
                                                        View On-Chain
                                                    </motion.button>
                                                </Link>
                                                :
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleMintWill({
                                                        personalInfo: {
                                                            fullName: will.fullName,
                                                            dateOfBirth: will.dateOfBirth,
                                                            address: will.address,
                                                            maritalStatus: will.maritalStatus,
                                                            occupation: will.occupation,
                                                        },
                                                        assets: will.assets,
                                                        onChainAssets: will.onChainAssets,
                                                        specialInstructions: will.specialInstructions,
                                                        createdAt: will.createdAt,
                                                    }, will.id)}
                                                    disabled={will.status === "published"}
                                                    className="flex-1 px-4 py-2 text-sm bg-primary border border-primary/30 rounded-lg hover:border-primary/50 transition"
                                                >
                                                    Mint
                                                </motion.button>
                                            }
                                        </div>
                                    </div>
                                </DashboardCardAnimation>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
