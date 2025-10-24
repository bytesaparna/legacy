'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWillDataStore } from "@/zustand/will-data"
import { motion } from "framer-motion"
import { CheckCircle, FileText } from "lucide-react"

export const Review = () => {
    const { updateWillData, willData, step, setStep, maximumStep } = useWillDataStore()

    return (
        <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
    >
        <div className="text-center mb-8">
            <motion.img
                src="/legal-document-graduation.png"
                alt="Will completed"
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
                Your Will is Ready!
            </motion.h3>
            <motion.p
                className="text-slate-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                Review your information and generate your professional will document.
            </motion.p>
        </div>

        <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <Card className="p-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Will Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <motion.div
                        className="space-y-2"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h4 className="font-semibold">Testator:</h4>
                        <p>{willData.personalInfo.fullName}</p>
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
                        <h4 className="font-semibold">Assets Listed:</h4>
                        <p>{willData.assets.length} assets</p>
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
                        <h4 className="font-semibold">Beneficiaries:</h4>
                        <p>{willData.beneficiaries.length} beneficiaries</p>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>

        <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
        >
            <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <FileText className="w-4 h-4 mr-2" />
                Generate Will Document
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
                Save as Draft
            </Button>
        </motion.div>
    </motion.div>
    )
}