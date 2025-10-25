// app/(app)/layout.tsx
"use client"

import { ReactNode, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useAccount } from "wagmi"
import { api } from "@/trpc/trpc"
import { RegistrationPopup } from "@/components/registration"
import { ConnectWalletModal } from "@/components/connect-wallet-modal"
import { useRouter } from "next/navigation"

export default function AppSectionLayout({ children }: { children: ReactNode }) {
    const { address, isConnected } = useAccount()
    const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false)
    const [isConnectWalletOpen, setConnectWalletOpen] = useState(false)
    const router = useRouter()

    // Query user registration status
    const { data: user, isLoading, refetch } = api.user.getUser.useQuery(
        { walletAddress: address ?? "" },
        { enabled: !!address && isConnected }
    )


    useEffect(() => {
        if (!isConnected) {
            setConnectWalletOpen(true)
        } else {
            setConnectWalletOpen(false)
        }
        // If wallet is connected but user is not registered, show registration popup
        if (isConnected && address && !isLoading && !user) {
            setIsRegistrationPopupOpen(true)
        } else {
            setIsRegistrationPopupOpen(false)
        }
    }, [user, address])

    const handleCloseModal = () => {
        setConnectWalletOpen(false)
        // Only redirect if wallet is not connected
        if (!isConnected) {
            router.push('/')
        }
    }

    // If wallet is not connected, show connect wallet overlay
    if (isConnectWalletOpen) {
        return (
            <ConnectWalletModal isOpen={isConnectWalletOpen} setIsOpen={handleCloseModal} />
        )
    }

    // If loading user data, show loading state
    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen flex flex-col items-center justify-center bg-[#faf7f1] text-gray-900"
            >
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </motion.div>
        )
    }

    // Show registration popup if user is not registered
    if (isConnected && address && !user) {
        return (
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="min-h-screen flex flex-col bg-[#faf7f1] text-gray-900"
                >
                    <RegistrationPopup
                        isRegistrationPopupOpen={isRegistrationPopupOpen}
                        setIsRegistrationPopupOpen={setIsRegistrationPopupOpen}
                        onRegistrationSuccess={() => refetch()}
                    />
                </motion.div>
            </>
        )
    }

    // If wallet is connected and user is registered, show the app
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col bg-[#faf7f1] text-gray-900"
        >
            {/* Main content */}
            {children}
        </motion.div>
    )
}
