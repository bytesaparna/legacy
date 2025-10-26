'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { api } from "@/trpc/trpc"
import { useState } from "react"
import { useAccount } from "wagmi"
import { toast } from "sonner"
import { Bell, BellOff, Calendar, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export const WellnessCheckSettings = () => {
    const { address } = useAccount()
    const [isUpdating, setIsUpdating] = useState(false)

    const { data: userData } = api.user.getUser.useQuery(
        { walletAddress: address || "" },
        { enabled: !!address }
    )

    const { data: wellnessStatus, refetch } = api.user.getWellnessCheckStatus.useQuery(
        { userId: userData?.id || "" },
        { enabled: !!userData?.id }
    )

    const updatePreference = api.user.updateWellnessCheckPreference.useMutation({
        onSuccess: (data) => {
            toast.success(
                data.wellnessCheckEnabled 
                    ? "Wellness checks enabled!" 
                    : "Wellness checks disabled",
                {
                    style: {
                        background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                        color: "#fff",
                        borderRadius: "0.75rem",
                        padding: "1rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                    },
                }
            )
            refetch()
            setIsUpdating(false)
        },
        onError: (error) => {
            toast.error(`Failed to update preferences: ${error.message}`)
            setIsUpdating(false)
        }
    })

    const handleToggle = async () => {
        if (!userData?.id || !wellnessStatus) return
        
        setIsUpdating(true)
        await updatePreference.mutateAsync({
            userId: userData.id,
            enabled: !wellnessStatus.wellnessCheckEnabled
        })
    }

    if (!userData || !wellnessStatus) {
        return (
            <Card className="bg-primary/10">
                <CardHeader>
                    <CardTitle>Wellness Check Settings</CardTitle>
                    <CardDescription>Please connect your wallet to manage wellness checks</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="bg-gradient-to-br from-primary/10 to-primary/20 border-primary/30">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg">
                            <Bell className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">30-Day Wellness Checks</CardTitle>
                            <CardDescription className="text-base">
                                Regular check-ins to ensure your will stays up-to-date
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-white/80 backdrop-blur rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {wellnessStatus.wellnessCheckEnabled ? (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : (
                                    <BellOff className="w-5 h-5 text-gray-400" />
                                )}
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        Status: {wellnessStatus.wellnessCheckEnabled ? "Enabled" : "Disabled"}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {wellnessStatus.wellnessCheckEnabled 
                                            ? "You'll receive wellness check emails every 30 days"
                                            : "You won't receive wellness check emails"
                                        }
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={handleToggle}
                                disabled={isUpdating}
                                variant={wellnessStatus.wellnessCheckEnabled ? "outline" : "default"}
                                className={wellnessStatus.wellnessCheckEnabled 
                                    ? "border-orange-500 text-orange-600 hover:bg-orange-50" 
                                    : "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700"
                                }
                            >
                                {isUpdating ? "Updating..." : wellnessStatus.wellnessCheckEnabled ? "Disable" : "Enable"}
                            </Button>
                        </div>

                        {wellnessStatus.wellnessCheckEnabled && wellnessStatus.lastWellnessCheck && (
                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        Last check: {new Date(wellnessStatus.lastWellnessCheck).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-500"
                                            style={{ 
                                                width: `${((30 - wellnessStatus.daysUntilNextCheck) / 30) * 100}%` 
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-orange-600 min-w-[80px] text-right">
                                        {wellnessStatus.daysUntilNextCheck} days left
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 className="font-semibold text-orange-900 mb-2">📧 What to expect:</h4>
                        <ul className="space-y-2 text-sm text-orange-800">
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-0.5">•</span>
                                    <span>You will receive a friendly email every 30 days</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-0.5">•</span>
                                <span>We will check if you need to update any information</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-0.5">•</span>
                                <span>Helps ensure your legacy plans stay current</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-0.5">•</span>
                                <span>You can disable this anytime</span>
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

