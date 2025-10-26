"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"
import { useWillDataStore } from "@/zustand/will-data"
import { Header } from "@/components/landing/header"
import { renderStepContent, steps } from "@/utils/will-builder"
import { ProgressBar } from "./progress-bar"
import { useEffect, useState } from "react"


export const WillBuilderPage = () => {
    const { step, setStep, maximumStep, willData } = useWillDataStore()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="min-h-screen bg-background">

            {/* Header */}
            <Header isScrolled={isScrolled} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <div className="container mx-auto px-4 py-8">

                {/* Progress Header */}
                <ProgressBar />

                {/* Main Content */}
                <motion.div layout className="max-w-4xl mx-auto">
                    <Card className="overflow-hidden shadow-xl border border-border/50 backdrop-blur-sm bg-slate-200">
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
                        className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border-border/50 disabled:opacity-50 text-foreground hover:bg-background/90"
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
                        className="flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: "#e78a53", color: "#121113" }}
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
