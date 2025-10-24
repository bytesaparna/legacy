'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWillDataStore } from "@/zustand/will-data"
import { motion } from "framer-motion"
import { Home } from "lucide-react"
import Link from "next/link"

export const Assets = () => {
  const { updateWillData, willData } = useWillDataStore()

  const updateAsset = (index: number, field: string, value: string) => {
    const newAssets = [...willData.assets]
    newAssets[index] = { ...newAssets[index], [field]: value }

    updateWillData({
      ...willData,
      assets: newAssets
    })
    console.log(willData, "Will data after assets UPDATE")
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
      value: "",
      location: "",
      beneficiary: "",
      documents: [],
      notes: "",
    }

    updateWillData({
      ...willData,
      assets: [...willData.assets, newEmptyAsset]
    })
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
            <Card className="p-4 bg-primary/20 text-black ">
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
                      <SelectValue placeholder="Select type" />
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
                    placeholder="$0"
                    value={asset.value}
                    onChange={(e) => {
                      updateAsset(index, "value", e.target.value)
                    }}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg !bg-primary/20" 
                  />
                </motion.div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeAsset(index)}
                  className="text-red-600 hover:text-red-700"
                >
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