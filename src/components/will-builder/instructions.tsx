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
            className="space-y-6"
        >
            <div className="text-center mb-8 text-white font-serif">
                <motion.h3
                    className="text-2xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Special Instructions
                </motion.h3>
                <motion.p
                    className="text-slate-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Add personal wishes, notes, or special requests.
                </motion.p>
            </div>
            <Textarea
                placeholder="Add Special Instructions"
                className="resize-none transition-all duration-300 focus:scale-[1.02] focus:shadow-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/20 rounded-xl text-white placeholder-white/70 p-3 min-h-[50px]"
                value={willData.specialInstructions}
                onChange={(e) => updateWillData({ specialInstructions: e.target.value })}
            />
        </motion.div>
    )
}