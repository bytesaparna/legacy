'use client'

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { DollarSign } from "lucide-react"

interface ValueCardProps {
    totalValue: number,
    length: number
}

export const ValueCard = ({ totalValue, length }: ValueCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <Card className="bg-gradient-to-r from-yellow-600  via-yellow-600/80  to-yellow-600 text-white border-0">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-100 mb-1">Total Asset Value</p>
                            <p className="text-3xl font-bold">${totalValue.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold">{length}</p>
                                <p className="text-blue-100 text-sm">Assets</p>
                            </div>
                            <DollarSign className="w-12 h-12 text-blue-200" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}