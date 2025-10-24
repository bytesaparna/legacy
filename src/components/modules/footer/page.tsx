import { motion } from "framer-motion"
import { Award } from "lucide-react"


export const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 text-white py-12 relative overflow-hidden">
            <motion.div
                className="absolute inset-0 opacity-5"
                animate={{ y: [0, -50] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]" />
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="flex items-center justify-center mb-8"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img src="/pen.webp" width={40} height={40} className="rounded-full"></img>
                    </motion.div>
                    <span className="text-xl font-bold ml-2">LegacyBuilder</span>
                </motion.div>
                <div className="text-center text-gray-400">
                    <p>&copy; 2025 LegacyBuilder. All rights reserved. Protecting families since 2025.</p>
                </div>
            </div>
        </footer>
    )
}