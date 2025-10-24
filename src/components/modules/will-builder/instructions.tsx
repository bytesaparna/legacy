'use client'
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export const Instructions = () => {
    return (
        <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6 text-black"
    >
        <div className="text-center mb-8">
            <motion.h3
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                Special Instructions
            </motion.h3>
            <motion.p
                className="text-slate-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                Add personal wishes, notes, or special requests.
            </motion.p>
        </div>

        <Card className="p-6">
            <CardContent className="space-y-4">
                <p className="text-center text-slate-500">Special Instructions form coming soon...</p>
            </CardContent>
        </Card>
    </motion.div>
    )
}