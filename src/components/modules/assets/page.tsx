'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { assetCategories, Assets } from "@/utils/assets"
import { Award, BarChart3, Calculator, Car, DollarSign, Download, Edit, FileText, Home, PieChart, Plus, Shield, Trash2, TrendingUp, Upload } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { WillBuilderHeader } from "../will-builder/header"
import { ValueCard } from "./value-card"
import { useWillDataStore, WillData } from "@/zustand/will-data"
import { AssetsOverview } from "./assets-overview"

export const AssetsPage = () => {
    const { willData, updateWillData } = useWillDataStore()
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [isAddingAsset, setIsAddingAsset] = useState(false)


    const [newAsset, setNewAsset] = useState({
        id: "",
        type: "",
        category: "",
        name: "",
        description: "",
        value: 0,
        location: "",
        beneficiary: "",
        documents: [],
        notes: "",
    })

    const totalValue = willData.assets.reduce((sum, asset) => sum + Number(asset.value), 0)

    const categoryTotals = assetCategories.map((category) => ({
        ...category,
        total: willData.assets.filter((asset) => asset.category === category.id).reduce((sum, asset) => sum + Number(asset.value), 0),
        count: willData.assets.filter((asset) => asset.category === category.id).length,
    }))

    const filteredAssets =
        selectedCategory === "all" ? willData.assets : willData.assets.filter((asset) => asset.category === selectedCategory)

    const addAsset = () => {
        if (newAsset.name && newAsset.value) {
            const asset = {
                id: Date.now().toString(),
                type: newAsset.type || "",
                category: newAsset.category || "",
                name: newAsset.name,
                description: newAsset.description || "",
                value: newAsset.value.toString(),
                location: newAsset.location || "",
                beneficiary: newAsset.beneficiary || "",
                documents: newAsset.documents || [],
                notes: newAsset.notes || "",
            }
            updateWillData({
                ...willData,
                assets: [...willData.assets, asset]
            })

            setNewAsset({
                id: "",
                type: "",
                category: "",
                name: "",
                description: "",
                value: 0,
                location: "",
                beneficiary: "",
                documents: [],
                notes: "",
            })
            setIsAddingAsset(false)
        }
    }

    const deleteAsset = (id: string) => {
        const newAssets = willData.assets.filter((asset) => asset.id !== id)
        updateWillData({
            ...willData,
            assets: newAssets
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <WillBuilderHeader />

            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className="text-4xl font-bold text-yellow-700 mb-2">Asset Management</h1>
                        <p className="text-base text-gray-600 mb-6">
                            Organize and track all your valuable assets in one secure location
                        </p>
                    </motion.div>

                    {/* Total Value Card */}
                    <ValueCard totalValue={totalValue} length={willData.assets.length}></ValueCard>
                </div>

                {/* Category Overview */}
                <AssetsOverview categoryTotals={categoryTotals} selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />

                {/* Main Content */}
                <Tabs defaultValue="list" className="space-y-6">
                    <div className="flex items-center justify-between">
                        <TabsList className="grid w-fit grid-cols-3">
                            <TabsTrigger value="list" className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                List View
                            </TabsTrigger>
                            <TabsTrigger value="analytics" className="flex items-center gap-2">
                                <BarChart3 className="w-4 h-4" />
                                Analytics
                            </TabsTrigger>
                            <TabsTrigger value="tools" className="flex items-center gap-2">
                                <Calculator className="w-4 h-4" />
                                Tools
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center gap-2 text-black">
                            <Button variant="outline" className="bg-transparent">
                                <Upload className="w-4 h-4 mr-2" />
                                Import
                            </Button>
                            <Button variant="outline" className="bg-transparent">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                            <Dialog open={isAddingAsset} onOpenChange={setIsAddingAsset}>
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Asset
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle>Add New Asset</DialogTitle>
                                        <DialogDescription>Enter the details of your asset to add it to your portfolio.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-2 gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Select
                                                value={newAsset.category}
                                                onValueChange={(value) => setNewAsset({ ...newAsset, category: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {assetCategories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Asset Type</Label>
                                            <Input
                                                id="type"
                                                placeholder="e.g., Primary Residence"
                                                value={newAsset.type}
                                                onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <Label htmlFor="name">Asset Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="e.g., Family Home"
                                                value={newAsset.name}
                                                onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                placeholder="Detailed description of the asset"
                                                value={newAsset.description}
                                                onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="value">Estimated Value ($)</Label>
                                            <Input
                                                id="value"
                                                type="number"
                                                placeholder="0"
                                                value={newAsset.value}
                                                onChange={(e) => setNewAsset({ ...newAsset, value: Number.parseFloat(e.target.value) || 0 })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                placeholder="Where is this asset located?"
                                                value={newAsset.location}
                                                onChange={(e) => setNewAsset({ ...newAsset, location: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="beneficiary">Intended Beneficiary</Label>
                                            <Input
                                                id="beneficiary"
                                                placeholder="Who should inherit this asset?"
                                                value={newAsset.beneficiary}
                                                onChange={(e) => setNewAsset({ ...newAsset, beneficiary: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <Label htmlFor="notes">Additional Notes</Label>
                                            <Textarea
                                                id="notes"
                                                placeholder="Any additional information about this asset"
                                                value={newAsset.notes}
                                                onChange={(e) => setNewAsset({ ...newAsset, notes: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => setIsAddingAsset(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={addAsset}>Add Asset</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <TabsContent value="list" className="space-y-4">
                        {/* Filter Bar */}
                        <div className="flex items-center gap-4 mb-6 text-black">
                            <Button
                                variant={selectedCategory === "all" ? "default" : "outline"}
                                onClick={() => setSelectedCategory("all")}
                                className={selectedCategory === "all" ? "" : "bg-transparent"}
                            >
                                All Assets ({willData.assets.length})
                            </Button>
                            {assetCategories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategory === category.id ? "default" : "outline"}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={selectedCategory === category.id ? "" : "bg-transparent"}
                                >
                                    {category.name} ({willData.assets.filter((a) => a.category === category.id).length})
                                </Button>
                            ))}
                        </div>

                        {/* Assets List  have a componnet fix tomorrow*/}
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
                                                                    <p className="text-slate-500">Beneficiary</p>
                                                                    <p className="font-medium">{asset.beneficiary}</p>
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
                    </TabsContent>

                    <TabsContent value="analytics" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <PieChart className="w-5 h-5" />
                                        Asset Distribution
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {categoryTotals.map((category) => {
                                            const percentage = totalValue > 0 ? (category.total / totalValue) * 100 : 0
                                            return (
                                                <div key={category.id} className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-2">
                                                            <category.icon className={`w-4 h-4 ${category.color}`} />
                                                            <span className="text-sm font-medium">{category.name}</span>
                                                        </div>
                                                        <span className="text-sm text-slate-600">{percentage.toFixed(1)}%</span>
                                                    </div>
                                                    <div className="w-full bg-slate-200 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-sm font-semibold">${category.total.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5" />
                                        Asset Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                                            <span className="font-medium">Total Assets</span>
                                            <span className="text-2xl font-bold text-blue-600">{willData.assets.length}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                                            <span className="font-medium">Total Value</span>
                                            <span className="text-2xl font-bold text-green-600">${totalValue.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                                            <span className="font-medium">Average Value</span>
                                            <span className="text-2xl font-bold text-purple-600">
                                                ${willData.assets.length > 0 ? Math.round(totalValue / willData.assets.length).toLocaleString() : "0"}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="tools" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Asset Valuation Tools</CardTitle>
                                    <CardDescription>Get help estimating the value of your assets</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <Home className="w-4 h-4 mr-2" />
                                        Real Estate Estimator
                                    </Button>
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <Car className="w-4 h-4 mr-2" />
                                        Vehicle Value Lookup
                                    </Button>
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        Investment Portfolio Analysis
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Document Management</CardTitle>
                                    <CardDescription>Organize important documents for your assets</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Documents
                                    </Button>
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Generate Asset Report
                                    </Button>
                                    <Button className="w-full justify-start bg-transparent" variant="outline">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Asset List
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}