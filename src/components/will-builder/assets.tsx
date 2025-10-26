'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWillDataStore } from "@/zustand/will-data"
import { motion } from "framer-motion"
import { Home, Plus, Trash2, UserPlus } from "lucide-react"
import Link from "next/link"

export const Assets = () => {
  const { updateWillData, willData } = useWillDataStore()

  const updateAsset = (index: number, field: string, value: string | number) => {
    const newAssets = willData.assets.map((asset, idx) => {
      if (idx === index) {
        return {
          ...asset,
          beneficiaries: [...asset.beneficiaries], // Deep clone beneficiaries
          [field]: value
        }
      }
      return asset
    })

    updateWillData({
      ...willData,
      assets: newAssets
    })
    console.log("Asset updated:", newAssets[index])
  }

  const removeAsset = (index: number) => {
    const newAssets = willData.assets.filter((_, i) => i !== index)

    updateWillData({
      ...willData,
      assets: newAssets
    })
    console.log(willData, "Will data after assets REMOVAL")
  }

  const addAssetBar = () => {
    const newEmptyAsset = {
      id: Date.now().toString(),
      type: "",
      category: "",
      name: "",
      description: "",
      value: 0,
      location: "",
      documents: [],
      notes: "",
      beneficiaries: [],
    }

    updateWillData({
      ...willData,
      assets: [...willData.assets, newEmptyAsset]
    })
  }

  const addBeneficiary = (assetIndex: number) => {
    const newAssets = willData.assets.map((asset, idx) => {
      if (idx === assetIndex) {
        return {
          ...asset,
          beneficiaries: [
            ...asset.beneficiaries,
            {
              name: "",
              relationship: "",
              share: "",
              walletAddress: "",
            }
          ]
        }
      }
      return asset
    })

    updateWillData({
      ...willData,
      assets: newAssets
    })
    console.log("Beneficiary added:", newAssets[assetIndex])
  }

  const updateBeneficiary = (assetIndex: number, beneficiaryIndex: number, field: string, value: string) => {
    const newAssets = willData.assets.map((asset, idx) => {
      if (idx === assetIndex) {
        return {
          ...asset,
          beneficiaries: asset.beneficiaries.map((beneficiary, bIdx) => {
            if (bIdx === beneficiaryIndex) {
              return {
                ...beneficiary,
                [field]: value
              }
            }
            return beneficiary
          })
        }
      }
      return asset
    })

    updateWillData({
      ...willData,
      assets: newAssets
    })
    console.log("Beneficiary updated:", newAssets[assetIndex].beneficiaries[beneficiaryIndex])
  }

  const removeBeneficiary = (assetIndex: number, beneficiaryIndex: number) => {
    const newAssets = willData.assets.map((asset, idx) => {
      if (idx === assetIndex) {
        return {
          ...asset,
          beneficiaries: asset.beneficiaries.filter((_, bIdx) => bIdx !== beneficiaryIndex)
        }
      }
      return asset
    })

    updateWillData({
      ...willData,
      assets: newAssets
    })
    console.log("Beneficiary removed, remaining:", newAssets[assetIndex].beneficiaries)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8 text-black">
        <motion.h3
          className="text-2xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Your Assets & Property
        </motion.h3>
        <motion.p
          className="text-slate-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          List all your valuable assets that you want to include in your will.
        </motion.p>
        <div className="mt-4">
          <Link href="/assets">
            <Button variant="outline" className="bg-transparent">
              <Home className="w-4 h-4 mr-2" />
              Manage Assets in Detail
            </Button>
          </Link>
        </div>
      </div>

      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3,
            },
          },
        }}
      >
        {willData.assets.map((asset, index) => (
          <motion.div
            key={index}
            className="space-y-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-4 bg-primary/20 text-black bg-gradient-to-br from-primary/20 to-primary/60 ">
              <div className="grid md:grid-cols-4 gap-4">
                <motion.div
                  className="space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label>Asset Type</Label>
                  <Select
                    value={asset.type || undefined}
                    onValueChange={(value) => {
                      updateAsset(index, "type", value)
                    }}
                  >
                    <SelectTrigger className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg !bg-primary/20">
                      <SelectValue placeholder="Select type"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="vehicle">Vehicle</SelectItem>
                      <SelectItem value="bank-account">Bank Account</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="personal-property">Personal Property</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div
                  className="space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label>Description</Label>
                  <Input
                    placeholder="Describe the asset"
                    value={asset.description}
                    onChange={(e) => {
                      updateAsset(index, "description", e.target.value)
                    }}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg !bg-primary/20"
                  />
                </motion.div>
                <motion.div
                  className="space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label>Location</Label>
                  <Input
                    placeholder="Location of the asset"
                    value={asset.location}
                    onChange={(e) => {
                      updateAsset(index, "location", e.target.value)
                    }}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg !bg-primary/20"
                  />
                </motion.div>
                <motion.div
                  className="space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label>Estimated Value</Label>
                  <Input
                    type="number"
                    placeholder="$0"
                    value={asset.value}
                    onChange={(e) => {
                      updateAsset(index, "value", e.target.value ? parseFloat(e.target.value) : 0)
                    }}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg !bg-primary/20"
                  />
                </motion.div>
              </div>

              {/* Beneficiaries Section */}
              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Beneficiaries for this Asset
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addBeneficiary(index)}
                    className="text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Beneficiary
                  </Button>
                </div>

                {asset.beneficiaries.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No beneficiaries added yet</p>
                ) : (
                  <div className="space-y-3">
                    {asset.beneficiaries.map((beneficiary, beneficiaryIndex) => (
                      <div key={beneficiaryIndex} className="grid grid-cols-3 gap-3 p-3 bg-white/50 rounded-lg">
                        <div className="space-y-1">
                          <Label className="text-xs">Name</Label>
                          <Input
                            placeholder="Beneficiary name"
                            value={beneficiary.name}
                            onChange={(e) =>
                              updateBeneficiary(index, beneficiaryIndex, "name", e.target.value)
                            }
                            className="h-8 text-sm !bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Relationship</Label>
                          <Input
                            placeholder="e.g., Son, Daughter"
                            value={beneficiary.relationship}
                            onChange={(e) =>
                              updateBeneficiary(index, beneficiaryIndex, "relationship", e.target.value)
                            }
                            className="h-8 text-sm !bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Share (%)</Label>
                          <div className="flex gap-1">
                            <Input
                              placeholder="e.g., 50%"
                              value={beneficiary.share}
                              onChange={(e) =>
                                updateBeneficiary(index, beneficiaryIndex, "share", e.target.value)
                              }
                              className="h-8 text-sm !bg-white"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBeneficiary(index, beneficiaryIndex)}
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Wallet Address</Label>
                          <div className="flex gap-1">
                            <Input
                              placeholder="0x....."
                              value={beneficiary.walletAddress}
                              onChange={(e) =>
                                updateBeneficiary(index, beneficiaryIndex, "walletAddress", e.target.value)
                              }
                              className="h-8 text-sm !bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeAsset(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove Asset
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}

        <motion.div
          className="mt-4 text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button variant="outline" className="w-full "
            onClick={addAssetBar}
          >
            Add Another Asset
          </Button>
        </motion.div>
      </motion.div>
    </motion.div >
  )
}