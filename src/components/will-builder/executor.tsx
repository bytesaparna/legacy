'use client'
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export const Executor = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-8 text-white font-serif">
                <motion.h3
                    className="text-2xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Executor & Guardians
                </motion.h3>
                <motion.p
                    className="text-slate-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Choose who will manage your will and care for dependents.
                </motion.p>
            </div>

            <Card className="p-6 bg-zinc-900/50 text-white shadow-[0_0_10px_oklch(0.6716_0.1368_48.513/0.2)]">
                <CardContent className="space-y-4">
                    <p className="text-center text-slate-300">Executor & Guardians form coming soon...</p>
                </CardContent>
            </Card>
        </motion.div>
    )
}