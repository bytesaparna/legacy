'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWillDataStore } from "@/zustand/will-data"
import { motion } from "framer-motion"
import { Users } from "lucide-react"
import Link from "next/link"

export const Beneficiaries = () => {
  const { updateWillData, willData } = useWillDataStore()

    return (
        <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <motion.img
            src="/legacy-graduation.png"
            alt="Beneficiaries"
            className="mx-auto rounded-lg shadow-lg mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          />
          <motion.h3
            className="text-2xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your Beneficiaries
          </motion.h3>
          <motion.p
            className="text-slate-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Specify who will inherit your assets and in what proportions.
          </motion.p>
          <div className="mt-4">
            <Link href="/beneficiaries">
              <Button variant="outline" className="bg-transparent">
                <Users className="w-4 h-4 mr-2" />
                Manage Beneficiaries in Detail
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
          {willData.beneficiaries.map((beneficiary, index) => (
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
              <Card className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-2"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label>Full Name</Label>
                    <Input
                      placeholder="Beneficiary's full name"
                      // value={beneficiary.name}
                      // onChange={(e) => {
                      //   const newBeneficiaries = [...willData.beneficiaries]
                      //   newBeneficiaries[index].name = e.target.value
                      //   setWillData((prev) => ({ ...prev, beneficiaries: newBeneficiaries }))
                      // }}
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
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
                    <Label>Relationship</Label>
                    <Input
                      placeholder="e.g., Spouse, Child, Friend"
                      // value={beneficiary.relationship}
                      // onChange={(e) => {
                      //   const newBeneficiaries = [...willData.beneficiaries]
                      //   newBeneficiaries[index].relationship = e.target.value
                      //   setWillData((prev) => ({ ...prev, beneficiaries: newBeneficiaries }))
                      // }}
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
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
                    <Label>Inheritance Percentage</Label>
                    <Input
                      placeholder="e.g., 50%"
                      // value={beneficiary.percentage}
                      // onChange={(e) => {
                      //   const newBeneficiaries = [...willData.beneficiaries]
                      //   newBeneficiaries[index].percentage = e.target.value
                      //   setWillData((prev) => ({ ...prev, beneficiaries: newBeneficiaries }))
                      // }}
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
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
                    <Label>Address</Label>
                    <Input
                      placeholder="Beneficiary's address"
                      // value={beneficiary.address}
                      // onChange={(e) => {
                      //   const newBeneficiaries = [...willData.beneficiaries]
                      //   newBeneficiaries[index].address = e.target.value
                      //   setWillData((prev) => ({ ...prev, beneficiaries: newBeneficiaries }))
                      // }}
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                    />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}

          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button variant="outline" className="w-full bg-transparent">
              Add Another Beneficiary
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

    )
}