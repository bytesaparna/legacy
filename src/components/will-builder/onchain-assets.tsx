'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useWillDataStore } from "@/zustand/will-data"
import { motion } from "framer-motion"
import { Wallet, Plus, Trash2, UserPlus, Coins, PlusIcon } from "lucide-react"

export const OnChainAssets = () => {
  const { updateWillData, willData } = useWillDataStore()

  const updateOnChainAsset = (index: number, field: string, value: string | number) => {
    const newOnChainAssets = willData.onChainAssets.map((asset, idx) => {
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
      onChainAssets: newOnChainAssets
    })
    console.log("OnChain Asset updated:", newOnChainAssets[index])
  }

  const removeOnChainAsset = (index: number) => {
    const newOnChainAssets = willData.onChainAssets.filter((_, i) => i !== index)

    updateWillData({
      ...willData,
      onChainAssets: newOnChainAssets
    })
    console.log("OnChain Asset removed")
  }

  const addOnChainAsset = () => {
    const newEmptyAsset = {
      id: Date.now().toString(),
      assetType: "",
      blockchain: "",
      contractAddress: "",
      tokenId: "",
      tokenSymbol: "",
      walletAddress: "",
      estimatedValue: 0,
      description: "",
      notes: "",
      beneficiaries: [],
    }

    updateWillData({
      ...willData,
      onChainAssets: [...willData.onChainAssets, newEmptyAsset]
    })
  }

  const addBeneficiary = (assetIndex: number) => {
    const newOnChainAssets = willData.onChainAssets.map((asset, idx) => {
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
      onChainAssets: newOnChainAssets
    })
    console.log("OnChain Beneficiary added:", newOnChainAssets[assetIndex])
  }

  const updateBeneficiary = (assetIndex: number, beneficiaryIndex: number, field: string, value: string) => {
    const newOnChainAssets = willData.onChainAssets.map((asset, idx) => {
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
      onChainAssets: newOnChainAssets
    })
    console.log("OnChain Beneficiary updated:", newOnChainAssets[assetIndex].beneficiaries[beneficiaryIndex])
  }

  const removeBeneficiary = (assetIndex: number, beneficiaryIndex: number) => {
    const newOnChainAssets = willData.onChainAssets.map((asset, idx) => {
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
      onChainAssets: newOnChainAssets
    })
    console.log("OnChain Beneficiary removed, remaining:", newOnChainAssets[assetIndex].beneficiaries)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8 text-white font-serif">
        <motion.h3
          className="text-2xl font-bold mb-2 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          On-Chain Assets & Crypto
        </motion.h3>
        <motion.p
          className="text-slate-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          List your cryptocurrency, NFTs, and blockchain-based assets.
        </motion.p>
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
        {willData.onChainAssets.map((asset, index) => (
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
            <Card className="p-4 bg-zinc-900/50 text-primary shadow-[0_0_10px_oklch(0.6716_0.1368_48.513/0.2)] mt-8">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Asset Type */}
                <div className="space-y-2">
                  <Label>Asset Type *</Label>
                  <Select
                    value={asset.assetType || undefined}
                    onValueChange={(value) => {
                      updateOnChainAsset(index, "assetType", value)
                    }}
                  >
                    <SelectTrigger className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="nft">NFT</SelectItem>
                      <SelectItem value="token">Token</SelectItem>
                      <SelectItem value="defi">DeFi Position</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Blockchain */}
                <div className="space-y-2">
                  <Label>Blockchain *</Label>
                  <Select
                    value={asset.blockchain || undefined}
                    onValueChange={(value) => {
                      updateOnChainAsset(index, "blockchain", value)
                    }}
                  >
                    <SelectTrigger className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-white">
                      <SelectValue placeholder="Select blockchain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                      <SelectItem value="solana">Solana</SelectItem>
                      <SelectItem value="avalanche">Avalanche</SelectItem>
                      <SelectItem value="arbitrum">Arbitrum</SelectItem>
                      <SelectItem value="optimism">Optimism</SelectItem>
                      <SelectItem value="base">Base</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Token Symbol */}
                <div className="space-y-2">
                  <Label>Token Symbol</Label>
                  <Input
                    placeholder="e.g., ETH, BTC, USDC"
                    value={asset.tokenSymbol}
                    onChange={(e) => {
                      updateOnChainAsset(index, "tokenSymbol", e.target.value)
                    }}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-white placeholder-white/70"
                  />
                </div>

                {/* Wallet Address */}
                <div className="space-y-2 md:col-span-2">
                  <Label>Wallet Address *</Label>
                  <Input
                    placeholder="0x..."
                    value={asset.walletAddress}
                    onChange={(e) => {
                      updateOnChainAsset(index, "walletAddress", e.target.value)
                    }}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-white placeholder-white/70 font-mono text-sm"
                  />
                </div>

                {/* Estimated Value */}
                <div className="space-y-2">
                  <Label>Estimated Value (USD)</Label>
                  <Input
                    placeholder="$0"
                    type="number"
                    value={asset.estimatedValue}
                    onChange={(e) => {
                      updateOnChainAsset(index, "estimatedValue", parseFloat(e.target.value) || 0)
                    }}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-white placeholder-white/70"
                  />
                </div>

                {/* Contract Address */}
                <div className="space-y-2 md:col-span-2">
                  <Label>Contract Address (for NFTs/Tokens)</Label>
                  <Input
                    placeholder="0x..."
                    value={asset.contractAddress}
                    onChange={(e) => {
                      updateOnChainAsset(index, "contractAddress", e.target.value)
                    }}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-white placeholder-white/70 font-mono text-sm"
                  />
                </div>

                {/* Token ID */}
                <div className="space-y-2">
                  <Label>Token ID (for NFTs)</Label>
                  <Input
                    placeholder="e.g., 1234"
                    value={asset.tokenId}
                    onChange={(e) => {
                      updateOnChainAsset(index, "tokenId", e.target.value)
                    }}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-white placeholder-white/70"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-3">
                  <Label>Description *</Label>
                  <Textarea
                    placeholder="Describe this asset (e.g., Bitcoin holdings, Bored Ape NFT #1234, etc.)"
                    value={asset.description}
                    onChange={(e) => {
                      updateOnChainAsset(index, "description", e.target.value)
                    }}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-white placeholder-white/70"
                    rows={2}
                  />
                </div>

                {/* Notes */}
                <div className="space-y-2 md:col-span-3">
                  <Label>Additional Notes</Label>
                  <Textarea
                    placeholder="Any additional information (e.g., seed phrase location, recovery methods)"
                    value={asset.notes}
                    onChange={(e) => {
                      updateOnChainAsset(index, "notes", e.target.value)
                    }}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-white placeholder-white/70"
                    rows={2}
                  />
                </div>
              </div>

              {/* Beneficiaries Section */}
              <div className="mt-6 border-t border-white/20 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Beneficiaries for this Asset
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addBeneficiary(index)}
                    className="text-xs !bg-white/5 border-none text-white hover:bg-white/10"
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
                      <div key={beneficiaryIndex} className="grid grid-cols-4 gap-3 p-3 bg-white/10 rounded-lg border border-white/20">
                        <div className="space-y-1">
                          <Label className="text-xs">Name *</Label>
                          <Input
                            placeholder="Beneficiary name"
                            value={beneficiary.name}
                            onChange={(e) =>
                              updateBeneficiary(index, beneficiaryIndex, "name", e.target.value)
                            }
                            className="h-8 text-sm bg-white/10 border-white/20 text-white placeholder-white/60"
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
                            className="h-8 text-sm bg-white/10 border-white/20 text-white placeholder-white/60"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Share (%)</Label>
                          <Input
                            placeholder="e.g., 50%"
                            value={beneficiary.share}
                            onChange={(e) =>
                              updateBeneficiary(index, beneficiaryIndex, "share", e.target.value)
                            }
                            className="h-8 text-sm bg-white/10 border-white/20 text-white placeholder-white/60"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Wallet Address *</Label>
                          <div className="flex gap-1">
                            <Input
                              placeholder="0x..."
                              value={beneficiary.walletAddress}
                              onChange={(e) =>
                                updateBeneficiary(index, beneficiaryIndex, "walletAddress", e.target.value)
                              }
                              className="h-8 text-sm bg-white/10 border-white/20 text-white placeholder-white/60 font-mono"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBeneficiary(index, beneficiaryIndex)}
                              className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
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
                  onClick={() => removeOnChainAsset(index)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove Asset
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="outline"
            className="w-full !bg-white/5 border-none text-white hover:bg-white/10"
            onClick={addOnChainAsset}
          >
            <PlusIcon  />
            Add On-Chain Asset
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

