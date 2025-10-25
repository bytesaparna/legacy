import { AnimatePresence, motion } from "framer-motion"
import { Button } from "./ui/button"
import { Wallet, X } from "lucide-react"
import { Card } from "./ui/card"
import ConnectWalletButton from "./modules/connect-button/button"

interface ConnectWalletModalProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export const ConnectWalletModal = ({ isOpen, setIsOpen }: ConnectWalletModalProps) => {

    return (
        <div>
            {
                isOpen && (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                                onClick={() => {
                                    setIsOpen(false)
                                }}
                            />

                            {/* Modal Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                className="relative z-10 w-full max-w-md"
                            >
                                <Card className="border-0 bg-gradient-to-br from-orange-50 via-white to-orange-100 shadow-2xl rounded-2xl">
                                    <div className="p-8 text-center relative">
                                        {/* Close button */}
                                        <Button
                                            onClick={() => setIsOpen(false)}
                                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-100"
                                        >
                                            <X className="h-5 w-5 text-black" />
                                        </Button>

                                        {/* Icon */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white shadow-md"
                                        >
                                            <Wallet className="h-8 w-8" />
                                        </motion.div>

                                        {/* Heading */}
                                        <h2 className="text-4xl font-bold tracking-tight text-black sm:text-xl lg:text-2xl">
                                            Connect Your Wallet
                                        </h2>

                                        {/* Description */}
                                        <p className="text-gray-600 mt-2 mb-8 text-sm max-w-sm mx-auto">
                                            Connect your wallet to securely manage your will, view assets,
                                            and access personalized blockchain services.
                                        </p>

                                        {/* Wallet Button */}
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                                            <ConnectWalletButton className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors" />
                                        </motion.div>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence >
                )
            }
        </div>
    )

}