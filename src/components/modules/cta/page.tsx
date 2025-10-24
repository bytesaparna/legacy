import { StaggerContainer } from "@/components/stagger-container"
import { Button } from "@/components/ui/button"
import { stats } from "@/utils/features"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export const Cta = () => {
    return (
        <section className="py-24 bg-gradient-to-r from-white/20 via-yellow-500/30 to-white/20 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-400/10 via-transparent to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400/10 via-transparent to-transparent rounded-full blur-2xl" />

            <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Secure Your Familys Future?</h2>
                    <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of families who have already protected their legacy with our professional will creation platform.
                    </p>
                    <Link href="/will-builder">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="px-10 py-4 text-lg bg-white text-black hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl font-semibold"
                        >
                            Create Your Will Now
                            <Sparkles className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}