'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface AssetsOverviewProps {
    categoryTotals: any[]
    selectedCategory: string
    onCategorySelect: (category: string) => void
}

export const AssetsOverview = ({ categoryTotals, selectedCategory, onCategorySelect }: AssetsOverviewProps) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Asset Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categoryTotals.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => onCategorySelect(category.id)}
                        className="cursor-pointer"
                    >
                        <Card
                            className={`hover:shadow-lg transition-all duration-300 bg-yellow-600/70 ${selectedCategory === category.id ? "ring-2 ring-blue-500" : ""
                                }`}
                        >
                            <CardContent className="p-4 text-center">
                                <div
                                    className={`w-12 h-12 mx-auto mb-3 rounded-lg ${category.bgColor} flex items-center justify-center`}
                                >
                                    <category.icon className={`w-6 h-6 ${category.color}`} />
                                </div>
                                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                                <p className="text-lg font-bold text-slate-900">${category.total.toLocaleString()}</p>
                                <p className="text-xs text-slate-500">{category.count} items</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}