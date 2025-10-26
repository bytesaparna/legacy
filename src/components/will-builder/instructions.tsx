'use client'
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useWillDataStore } from "@/zustand/will-data"

export const Instructions = () => {
    const { updateWillData, willData } = useWillDataStore()
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
            <Textarea
                placeholder="Add Special Instructions"
                className="resize-none !bg-primary/30 focus:scale-[1.02] focus:shadow-lg"
                value={willData.specialInstructions}
                onChange={(e) => updateWillData({ specialInstructions: e.target.value })}
            />
        </motion.div>
    )
}