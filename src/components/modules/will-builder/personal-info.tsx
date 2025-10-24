'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { personalData } from "@/utils/will-builder"
import { useWillDataStore } from "@/zustand/will-data"
import { motion } from "framer-motion"

export const PersonalInfo = () => {
  const { updateWillData, willData } = useWillDataStore()
  console.log(willData, "Data after Personal Info")

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
          Lets Start with Your Personal Information
        </motion.h3>
        <motion.p
          className="text-slate-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          We need some basic details to create your personalized will.
        </motion.p>
      </div>

      <motion.div
        className="grid md:grid-cols-2 gap-6"
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
        {personalData.map((field) => (
          <motion.div
            key={field.id}
            className={`space-y-2 text-black ${field.colSpan ? "md:col-span-2" : ""}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Label htmlFor={field.id}>{field.label}</Label>
            {field.type === "textarea" ? (
              <Textarea
                id={field.id}
                placeholder={field.placeholder}
                value={willData.personalInfo.address}
                onChange={(e) =>
                  updateWillData({
                    personalInfo: {
                      ...willData.personalInfo,
                      address: e.target.value
                    }
                  })
                }
                required
                className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg !bg-primary/20"
              />
            ) : field.type === "select" ? (
              <Select
                value={willData.personalInfo.maritalStatus}
                onValueChange={(value) =>
                  updateWillData({
                    personalInfo: {
                      ...willData.personalInfo,
                      maritalStatus: value
                    }
                  })
                }
                required
              >
                <SelectTrigger className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg !bg-primary/20">
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={
                  field.id === "fullName"
                    ? willData.personalInfo.fullName
                    : field.id === "dateOfBirth"
                      ? willData.personalInfo.dateOfBirth
                      : field.id === "occupation"
                        ? willData.personalInfo.occupation
                        : ""
                }
                onChange={(e) => {
                  const { id, value } = e.target
                  updateWillData({
                    personalInfo: {
                      ...willData.personalInfo,
                      [id]: value
                    }
                  })
                }}
                required={field.id !== "occupation"}
                className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg !bg-primary/20"
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>

  )
}