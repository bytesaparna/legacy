import { FileText, Heart, Home, Shield, User, Coins } from "lucide-react";
import { PersonalInfo } from "@/components/will-builder/personal-info"
import { Assets } from "@/components/will-builder/assets"
import { OnChainAssets } from "@/components/will-builder/onchain-assets"
import { Executor } from "@/components/will-builder/executor"
import { Instructions } from "@/components/will-builder/instructions"
import { Review } from "@/components/will-builder/review"
import { motion } from "framer-motion"


export const steps = [
    { id: 1, title: "Personal Information", icon: User, description: "Basic details about you" },
    { id: 2, title: "Assets & Beneficiaries", icon: Home, description: "Your valuable possessions" },
    { id: 3, title: "On-Chain Assets & Crypto", icon: Coins, description: "Blockchain & cryptocurrency assets" },
    { id: 4, title: "Executor & Guardians", icon: Shield, description: "Who manages your will" },
    { id: 5, title: "Special Instructions", icon: Heart, description: "Personal wishes and notes" },
    { id: 6, title: "Review & Generate", icon: FileText, description: "Finalize your will" },
]


export const personalData = [
    { id: "fullName", label: "Full Legal Name *", placeholder: "Enter your full legal name", type: "text" },
    { id: "dateOfBirth", label: "Date of Birth *", type: "date" },
    {
        id: "address",
        label: "Current Address *",
        placeholder: "Enter your full address",
        type: "textarea",
        colSpan: true,
    },
    { id: "maritalStatus", label: "Marital Status *", type: "select" },
    { id: "occupation", label: "Occupation", placeholder: "Your current occupation", type: "text" },
]

export const renderStepContent = (step: number) => {
    switch (step) {
        case 1:
            return (<PersonalInfo />)
        case 2:
            return (<Assets />)
        case 3:
            return (<OnChainAssets />)
        case 4:
            return (<Executor />)
        case 5:
            return (<Instructions />)
        case 6:
            return (<Review />)
        default:
            return (
                <motion.div className="text-center py-12">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        Step content coming soon...
                    </motion.p>
                </motion.div>
            )
    }
}