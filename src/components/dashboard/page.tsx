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

    const totalWills = userWills?.length ?? 0
    const beneficiaries = userWills?.reduce((acc: number, will: any) => acc + (will.beneficiaries?.length ?? 0), 0) ?? 0
    const assetsSecured = userWills?.reduce((acc: number, will: any) => acc + (will.assets?.reduce((acc: number, asset: any) => acc + asset.value, 0) ?? 0), 0) ?? 0

    const stats = [
        { label: "Total Wills", value: totalWills, icon: "📄" },
        { label: "Beneficiaries", value: beneficiaries, icon: "👥" },
        { label: "Assets Secured", value: assetsSecured, icon: "💎" },
    ]

    const handleMintWill = async (willData: WillData) => {
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

            const { tx, willId, data, encodedWillData } = await publishWill(walletClient, { ...willData, isMintedOnChain: true })
            console.log("Will published:", { tx, willId, data, encodedWillData })

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
                        <h2 className="text-2xl font-serif font-bold text-foreground mb-6">My Wills</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {userWills?.map((will: WillData, idx: number) => (
                                <DashboardCardAnimation key={will.personalInfo?.address || `will-${idx}`} delay={idx * 0.1}>
                                    <div className="group bg-zinc-900/50 border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white">{will.personalInfo?.fullName || "Unknown"}</h3>
                                                <p className="text-sm text-white">DOB {will.personalInfo?.dateOfBirth || "Unknown"}</p>
                                            </div>
                                            {/* <span
                                                className={`text-xs px-3 py-1 rounded-full ${will.minted ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                                                    }`}
                                            >
                                                {will.status}
                                            </span> */}
                                        </div>

                                        <p className="text-sm text-white mb-6">
                                            Executor: <span className="text-white font-medium">{will.executor?.name || "Not specified"} ({will.executor?.relationship || "N/A"})</span>
                                        </p>

                                        <div className="w-1/2  ml-auto flex gap-2">
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
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleMintWill(will)}
                                                className="flex-1 px-4 py-2 text-sm bg-primary border border-primary/30 rounded-lg hover:border-primary/50 transition"
                                            >
                                                {will.isMintedOnChain ? "View On-Chain" : "Mint"}
                                            </motion.button>
                                        </div>
                                    </div>
                                </DashboardCardAnimation>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <Link href="/will-builder">
                            <button className="w-full px-6 py-4 bg-gradient-to-b from-primary to-primary/80 text-primary-foreground rounded-lg font-semibold hover:-translate-y-0.5 transition">
                                + Create New Will
                            </button>
                        </Link>
                        <button className="w-full px-6 py-4 border border-primary/30 rounded-lg text-primary hover:bg-primary/5 transition">
                            Mint Latest Will
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
