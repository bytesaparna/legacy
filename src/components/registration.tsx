"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"
import { api } from "@/trpc/trpc"
import { useAccount } from "wagmi"

interface RegistrationFormData {
  fullName: string
  email: string
  walletAddress: string,
}

interface RegistrationPopupProps {
  isRegistrationPopupOpen: boolean
  setIsRegistrationPopupOpen: (isRegistrationPopupOpen: boolean) => void
  onRegistrationSuccess?: () => void
}


export function RegistrationPopup({ isRegistrationPopupOpen, setIsRegistrationPopupOpen, onRegistrationSuccess }: RegistrationPopupProps) {
  const { address } = useAccount()
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    email: "",
    walletAddress: address ?? "",
  })

  // Update wallet address when it changes
  useEffect(() => {
    if (address) {
      setFormData((prev) => ({
        ...prev,
        walletAddress: address,
      }))
    }
  }, [address])

  const [errors, setErrors] = useState<Partial<RegistrationFormData>>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const registerUserMutation = api.user.registerUser.useMutation()

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationFormData> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.walletAddress.trim()) {
      newErrors.walletAddress = "Wallet address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await registerUserMutation.mutateAsync({
        name: formData.fullName,
        email: formData.email,
        walletAddress: formData.walletAddress
      })

      setShowSuccess(true)

      // Close popup and refresh user data after 2 seconds
      setTimeout(() => {
        setShowSuccess(false)
        setIsRegistrationPopupOpen(false)
        onRegistrationSuccess?.()
      }, 2000)
    } catch (error) {
      console.error("Registration failed:", error)
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof RegistrationFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  return (
    <>
      {isRegistrationPopupOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 text-black"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative z-10 w-full max-w-md"
            >
              <Card className="border-0 bg-gradient-to-br from-orange-100 via-white to-orange-100 shadow-2xl">
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <h2 id="main-title" className="text-4xl font-bold tracking-tight text-black sm:text-6xl lg:text-7xl">
                      Join Us <strong>Today</strong><br />
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">Complete your registration to get started</p>
                  </div>

                  {/* Success Message */}
                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-700"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Registration successful!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name Input */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={ `text-black border-gray-300 focus:border-orange-500 focus:ring-orange-500 !bg-primary/20 ${errors.fullName ? "border-red-500" : ""
                          }`}
                      />
                      {errors.fullName && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 flex items-center gap-1 text-xs text-red-600"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.fullName}
                        </motion.div>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`border-gray-300 text-black focus:border-orange-500 focus:ring-orange-500 !bg-primary/20 ${errors.email ? "border-red-500" : ""
                          }`}
                      />
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 flex items-center gap-1 text-xs text-red-600"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </motion.div>
                      )}
                    </div>

                    {/* Wallet Address Input */}
                    <div>
                      <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700 mb-1">
                        Wallet Address
                      </label>
                      <Input
                        id="walletAddress"
                        name="walletAddress"
                        type="text"
                        placeholder="0x..."
                        value={formData.walletAddress}
                        readOnly
                        disabled
                        className={`border-gray-300 text-black focus:border-orange-500 focus:ring-orange-500 !bg-primary/20 cursor-not-allowed ${errors.walletAddress ? "border-red-500" : ""
                          }`}
                      />
                      {errors.walletAddress && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 flex items-center gap-1 text-xs text-red-600"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.walletAddress}
                        </motion.div>
                      )}
                    </div>

                    {/* Register Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors"
                      >
                        {isSubmitting ? "Registering..." : "Register"}
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}
