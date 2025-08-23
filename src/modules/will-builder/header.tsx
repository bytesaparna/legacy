import { motion } from "framer-motion"
import { Award, Badge, Shield } from "lucide-react"
import Link from "next/link"

export const WillBuilderHeader = () => {
    return (
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <motion.div
                            className="w-8 h-8 bg-gradient-to-br from-yellow-900 to-yellow-600 rounded-lg flex items-center justify-center"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Award className="w-5 h-5 text-white" />
                        </motion.div>
                        <span className="text-xl font-bold  bg-yellow-700 bg-clip-text text-transparent">
                            LegacyBuilder
                        </span>
                    </Link>

                    <motion.div
                        // animate={{ scale: [1, 1.05, 1] }}
                        // transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="flex flex-col items-center"
                    >
                        <Badge className=" text-yellow-700">
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                                <Shield className="w-3 h-3 mr-1" />
                            </motion.div>

                        </Badge>
                        <p className="text-black text-sm font-semibold"> Secure & Confidential</p>
                    </motion.div>
                </div>
            </div>
        </header>
    )
}