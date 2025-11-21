'use client'
import LastWillDialog from "@/components/complete-will"
import LastWillAndTestament from "@/components/complete-will"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWillDataStore } from "@/zustand/will-data"
import { motion } from "framer-motion"
import { AlertCircle, CheckCircle, FileText, Loader2, View } from "lucide-react"
import { useState } from "react"
import { api } from "@/trpc/trpc"
import { useAccount, useWalletClient } from "wagmi"
import { toast } from "sonner"
import { publishWill } from "@/lib/somnia/publish-will"
import Link from "next/link"

export const Review = () => {
    const { willData, updateWillData } = useWillDataStore()
    const [openWillDocument, setOpenWillDocument] = useState(false)
    const { address } = useAccount()
    const { data: walletClient } = useWalletClient()
    const [willGenerated, setWillGenerated] = useState(false)
    const [publishingWillOnchain, setPublishingWillOnchain] = useState(false)
    const [willCreatedAt, setWillCreatedAt] = useState<Date | undefined>(undefined)
    const [databaseWillId, setDatabaseWillId] = useState<string | undefined>(undefined)

    const { data: userData } = api.user.getUser.useQuery(
        { walletAddress: address || "" },
        { enabled: !!address }
    )

    const utils = api.useUtils()
    const updateWillMutation = api.will.updateWill.useMutation({
        onSuccess: (data) => {
            // Invalidate and refetch the wills query after successful update
            console.log("Will updated successfully")
        }
    })

    const createWillMutation = api.will.createWill.useMutation({
        onSuccess: (data) => {
            // Store the createdAt and database will ID from the database response
            if (data.createdAt) {
                setWillCreatedAt(data.createdAt)
            }
            if (data.id) {
                setDatabaseWillId(data.id)
            }
            toast.success("Will saved successfully!", {
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
                description: "Your will has been saved and is ready to be minted on the blockchain",
                action: {
                    label: "View Will",
                    onClick: () => {
                        setOpenWillDocument(true)
                    }
                }
            })
            console.log("Will created:", data)
            setOpenWillDocument(true)
        },
        onError: (error) => {
            toast.error(`Failed to save will: ${error.message}`, {
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
    })

    const handleGenerateWill = async () => {
        if (!address) {
            toast.error("Please connect your wallet first", {
                style: {
                    background: "oklch(0.1797 0.0043 308.1928)",
                    color: "#ef4444",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    border: "1px solid #ef4444",
                },
                duration: 5000,
                position: "top-right",
                icon: <AlertCircle className="w-4 h-4" />,
                className: "bg-red-600 text-white",
                description: "Please connect your wallet first",
            })
            return
        }

        if (!walletClient) {
            toast.error("Wallet client not ready", {
                style: {
                    background: "oklch(0.1797 0.0043 308.1928)",
                    color: "#ef4444",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    border: "1px solid #ef4444",
                },
                duration: 5000,
                position: "top-right",
                icon: <AlertCircle className="w-4 h-4" />,
                className: "bg-red-600 text-white",
                description: "Please ensure your wallet is connected and try again",
            })
            return
        }

        try {
            await createWillMutation.mutateAsync({
                userId: userData!.id,
                personalInfo: {
                    fullName: willData.personalInfo.fullName,
                    dateOfBirth: willData.personalInfo.dateOfBirth,
                    address: willData.personalInfo.address,
                    maritalStatus: willData.personalInfo.maritalStatus,
                    occupation: willData.personalInfo.occupation,
                },
                assets: willData.assets.map(asset => ({
                    type: asset.type,
                    category: asset.category,
                    name: asset.name,
                    description: asset.description,
                    value: asset.value,
                    location: asset.location,
                    documents: asset.documents,
                    notes: asset.notes,
                    beneficiaries: asset.beneficiaries.map(ben => ({
                        name: ben.name,
                        relationship: ben.relationship,
                        share: ben.share,
                        walletAddress: ben.walletAddress,
                    }))
                })),
                onChainAssets: willData.onChainAssets.map(asset => ({
                    assetType: asset.assetType,
                    blockchain: asset.blockchain,
                    contractAddress: asset.contractAddress,
                    tokenId: asset.tokenId,
                    tokenSymbol: asset.tokenSymbol,
                    walletAddress: asset.walletAddress,
                    estimatedValue: asset.estimatedValue,
                    description: asset.description,
                    notes: asset.notes,
                    beneficiaries: asset.beneficiaries.map(ben => ({
                        name: ben.name,
                        relationship: ben.relationship,
                        share: ben.share,
                        walletAddress: ben.walletAddress,
                    }))
                })),
                specialInstructions: willData.specialInstructions,
                status: "draft",
            })
            setWillGenerated(true)

        } catch (error) {
            console.error("Error in handleGenerateWill:", error)
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
                icon: <AlertCircle className="w-4 h-4" />,
            })
        }
    }

    const handleGenerateWillOnchain = async () => {
        try {
            setPublishingWillOnchain(true)
            toast.info("Publishing will to Somnia blockchain...", {
                style: {
                    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    color: "#fff",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                },
                duration: 3000,
                position: "top-right",
            })

            const { tx, willId, data, encodedWillData } = await publishWill(walletClient, { ...willData })
            console.log("Will published:", { tx, willId, data, encodedWillData })

            // Update the will in the database with transaction hash and status
            // Use the database will ID, not the blockchain willId
            if (databaseWillId && tx) {
                await updateWillMutation.mutateAsync({
                    willId: databaseWillId,
                    status: "published",
                    transactionHash: tx,
                })
                // Update the zustand store to reflect the published status
                updateWillData({
                    status: "published",
                    transactionHash: tx,
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
                icon: <AlertCircle className="w-4 h-4" />,
            })
        } finally {
            setPublishingWillOnchain(false)
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 text-white"
        >
            <div className="text-center mb-8">
                <motion.h3
                    className="text-2xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Your Will is Ready!
                </motion.h3>
                <motion.p
                    className="text-slate-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Review your information and generate your professional will document.
                </motion.p>
            </div>

            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <Card className="p-6 bg-zinc-900/50 text-primary shadow-[0_0_10px_oklch(0.6716_0.1368_48.513/0.2)]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            Will Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <motion.div
                            className="space-y-2 flex justify-between"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h4 className="font-semibold">Testator</h4>
                            <p>{willData.personalInfo.fullName}</p>
                        </motion.div>
                        <motion.div
                            className="space-y-2 flex justify-between"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h4 className="font-semibold">Assets Listed</h4>
                            <p>{willData.assets.length} traditional assets, {willData.onChainAssets.length} on-chain assets</p>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                <Button
                    className="flex-1 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    onClick={handleGenerateWill}
                    disabled={createWillMutation.isPending || willGenerated}
                >
                    {createWillMutation.isPending ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <FileText className="w-4 h-4 mr-2" />
                            Generate Will Document
                        </>
                    )}
                </Button>
                {
                    (willData.status === "published" || willData.transactionHash) ?
                        <Button
                            variant="outline"
                            className="flex-1 bg-linear-to-r from-primary to-primary/80 text-black hover:text-black hover:to-black/20"
                        >
                            <Link
                                href={`https://shannon-explorer.somnia.network/tx/${willData.transactionHash}`} target="_blank" rel="noopener noreferrer">

                                View On-Chain
                            </Link>

                        </Button>
                        :
                        <Button
                            variant="outline"
                            className="flex-1 bg-linear-to-r from-primary to-primary/80 text-black hover:text-black hover:to-black/20"
                            onClick={handleGenerateWillOnchain}
                            disabled={createWillMutation.isPending || !willGenerated}
                        >
                            {publishingWillOnchain ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Minting...
                                </>
                            ) : (
                                "Mint on Blockchain"
                            )}
                        </Button>
                }
            </motion.div>

            {openWillDocument && <LastWillDialog personalInfo={willData.personalInfo} assets={willData.assets} onChainAssets={willData.onChainAssets} specialInstructions={willData.specialInstructions ?? ""} transactionHash={willData.transactionHash} createdAt={willCreatedAt} open={openWillDocument} setOpen={setOpenWillDocument} />}
        </motion.div>
    )
}