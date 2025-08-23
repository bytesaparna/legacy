'use client'
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { steps } from "@/utils/will-builder"
import { useWillDataStore } from "@/zustand/will-data"
import { motion } from "framer-motion"

export const ProgressBar = () => {
    const { step, setStep, maximumStep } = useWillDataStore()
    const progress = (step / maximumStep) * 100

    return (
        <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-3xl font-bold text-yellow-700">Will Builder</h1>
                <Badge className="bg-yellow-100 text-yellow-700">
                    Step {step} of {maximumStep}
                </Badge>
            </motion.div>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 relative"
            >
                <Progress value={progress} className="h-3 bg-slate-200 overflow-hidden rounded-full" />
                <motion.div
                    className="absolute top-0 left-0 h-3 bg-gradient-to-r from-yellow-500 to-yellow-900 rounded-full shadow-lg"
                    style={{ width: `${progress}%` }}
                    animate={{
                        boxShadow: [
                            "0 0 10px rgba(59, 130, 246, 0.5)",
                            "0 0 20px rgba(59, 130, 246, 0.8)",
                            "0 0 10px rgba(59, 130, 246, 0.5)",
                        ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
            </motion.div>

            {/* Step Navigation */}
            <motion.div
                className="flex flex-wrap gap-2 mb-8"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.4,
                        },
                    },
                }}
            >
                {steps.map((stepItem) => (
                    <motion.div
                        key={stepItem.id}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer ${stepItem.id === step
                            ? "bg-yellow-700 text-white"
                            : stepItem.id < step
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep(stepItem.id)}
                    >
                        <motion.div animate={stepItem.id === step ? { rotate: 360 } : {}} transition={{ duration: 0.6 }}>
                            <stepItem.icon className="w-4 h-4" />
                        </motion.div>
                        <span className="hidden sm:inline">{stepItem.title}</span>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}