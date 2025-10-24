"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"
import { useWillDataStore } from "@/zustand/will-data"
import { WillBuilderHeader } from "@/components/modules/will-builder/header"
import { renderStepContent, steps } from "@/utils/will-builder"
import { ProgressBar } from "./progress-bar"


export const WillBuilderPage = () => {
    const { step, setStep, maximumStep, willData } = useWillDataStore()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <WillBuilderHeader />
            <div className="container mx-auto px-4 py-8">

                {/* Progress Header */}
                <ProgressBar />

                {/* Main Content */}
                <motion.div layout className="max-w-4xl mx-auto">
                    <Card className="overflow-hidden shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <AnimatePresence mode="wait">{renderStepContent(step)}</AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Navigation Buttons */}
                <motion.div
                    className="flex justify-between mt-8 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <MagneticButton
                        variant="outline"
                        onClick={() => setStep(step - 1)}
                        disabled={step === 1}
                        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm disabled:opacity-50 text-black"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                    </MagneticButton>

                    <MagneticButton
                        onClick={() => {
                            setStep(step + 1)
                            console.log(willData, "After Next Button Click")
                        }
                        }
                        disabled={step === maximumStep}
                        className="flex items-center gap-2  bg-yellow-700 text-white shadow-lg"
                    >
                        Next
                        <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                            <ArrowRight className="w-4 h-4" />
                        </motion.div>
                    </MagneticButton>
                </motion.div>
            </div>
        </div>
    )
}
