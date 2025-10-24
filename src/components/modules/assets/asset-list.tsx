'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { assetCategories, Assets } from "@/utils/assets"
import { useWillDataStore, WillData } from "@/zustand/will-data"
import { motion } from "framer-motion"
import { Edit, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

export const AssetLists = () => {
    const { willData, updateWillData } = useWillDataStore()
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [isScrolled, setIsScrolled] = useState(false)
    const filteredAssets =
        selectedCategory === "all" ? willData.assets : willData.assets.filter((asset) => asset.category === selectedCategory)

    const deleteAsset = (id: string) => {
        const newAssets = willData.assets.filter((asset) => asset.id !== id)
        updateWillData({
            ...willData,
            assets: newAssets
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])



    return (
        <div className="grid gap-4">
            {filteredAssets.map((asset, index) => {
                const category = assetCategories.find((c) => c.id === asset.category)
                return (
                    <motion.div
                        key={asset.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card className="hover:shadow-lg transition-all duration-300 bg-white border-4 bg-gradient-to-br from-gray-100 to-yellow-500/50 border-yellow-600">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div
                                            className={`w-12 h-12 rounded-lg ${category?.bgColor} flex items-center justify-center flex-shrink-0`}
                                        >
                                            {category?.icon && <category.icon className={`w-6 h-6 ${category.color}`} />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-lg font-semibold text-slate-900">{asset.name}</h3>
                                                <Badge variant="secondary" className="text-xs">
                                                    {asset.type}
                                                </Badge>
                                            </div>
                                            <p className="text-slate-600 mb-2">{asset.description}</p>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                <div>
                                                    <p className="text-slate-500">Value</p>
                                                    <p className="font-semibold text-green-600">${asset.value}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500">Location</p>
                                                    <p className="font-medium">{asset.location}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500">Documents</p>
                                                    <p className="font-medium">{asset.documents.length} files</p>
                                                </div>
                                            </div>
                                            {asset.notes && (
                                                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                                                    <p className="text-sm text-slate-600">{asset.notes}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <Button variant="ghost" size="sm">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteAsset(asset.id)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )
            })}
        </div>
    )
}