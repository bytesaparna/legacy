import { MagneticButton } from "@/components/magnetic-button"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Award } from "lucide-react"
import Link from "next/link"


export const Header = () => {
    return (
        <header className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50 py-4 bg-gradient-to-r from-black via-black/10 to-black text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-400/10 via-transparent to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400/10 via-transparent to-transparent rounded-full blur-2xl" />
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <img src="/pen.webp" width={80} height={80} className="rounded-full"></img>
                        </motion.div>
                        <span className="text-2xl font-extrabold bg-gradient-to-br from-white to-white bg-clip-text text-transparent">
                            LegacyBuilder
                        </span>
                    </motion.div>

                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Link href="/documents">
                            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                                <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-white/10 text-lg">
                                    Documents
                                </Button>
                            </motion.div>
                        </Link>
                        <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                            <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-white/10 text-lg">
                                Sign In
                            </Button>
                        </motion.div>
                        <MagneticButton className="bg-gradient-to-br from-white to-white hover:from-blue-600 hover:to-purple-700 text-black text-base p-6">
                            Get Started
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>
        </header>
    )
}