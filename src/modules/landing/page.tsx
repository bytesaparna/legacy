"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Shield, Award, ArrowRight, Clock, Star } from "lucide-react"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"
import { FloatingElements } from "@/components/floating-elements"
import { MagneticButton } from "@/components/magnetic-button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggerContainer } from "@/components/stagger-container"
import { features, stats } from "@/utils/features"
import { Header } from "../header/page"
import { Footer } from "../footer/page"
import { Cta } from "../cta/page"
import { Features } from "../features/page"
import { Stats } from "../stats/page"



export default function Landing() {
    const { scrollYProgress } = useScroll()

    const heroY = useTransform(scrollYProgress, [0, 1], [0, -300])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute w-[700px] h-[500px] rounded-full bg-gradient-to-r from-gray-900 via-white/30 to-black blur-3xl opacity-50" />
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <motion.section className="pt-20 px-4 relative z-10" style={{ y: heroY, opacity: heroOpacity }}>
                <div className="container mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                            <Badge className="mb-6 bg-gradient-to-r from-gray-900 to-black text-yellow-600 border border-white/20 hover:bg-blue-500/20 p-2">
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                >
                                    <Star className="w-6 h-6 mr-1 fill-amber-900" />
                                </motion.div>
                                Trusted by 50,000+ families
                            </Badge>
                        </motion.div>

                        <motion.h1
                            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-black-100 bg-clip-text text-transparent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                Secure Your Legacy with
                            </motion.span>
                            <br />
                            <motion.span
                                className="bg-gradient-to-r from-gray-200 to-yellow-950 bg-clip-text text-transparent"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                            >
                                Professional Will Creation
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="text-base text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                        >
                            Create a legally compliant will in minutes, not months. Our intelligent platform guides you through every
                            step, ensuring your assets and loved ones are protected.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.1 }}
                        >
                            <Link href="/will-builder">
                                <MagneticButton
                                    size="lg"
                                    className="bg-gradient-to-r from-gray-200 to-yellow-950 hover:from-gray-300 hover:to-yellow-950 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                                >
                                    <motion.span className="flex items-center">
                                        Start Building Your Will
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                                        >
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </motion.div>
                                    </motion.span>
                                </MagneticButton>
                            </Link>
                            <Link href="/documents">
                                <MagneticButton
                                    size="lg"
                                    variant="outline"
                                    className="px-8 py-3 text-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/20 text-white transition-all duration-300"
                                >
                                    View Sample Documents
                                </MagneticButton>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="relative mx-auto w-fit">
                            <img
                                src="https://st.depositphotos.com/1010555/3118/i/450/depositphotos_31184969-stock-photo-my-will.jpg"
                                alt="My Will - Professional legal document"
                                className="mx-auto rounded-2xl shadow-2xl border-2 border-white/10 backdrop-blur-sm max-w-2xl w-full"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <ScrollReveal direction="left" delay={0.4}>
                <Stats />
            </ScrollReveal>

            {/* Features Section */}
            <ScrollReveal  direction="right" delay={0.6} >
                <Features />
            </ScrollReveal>

            {/* CTA Section */}
            <ScrollReveal direction="left" delay={0.8}>
                <Cta />
            </ScrollReveal>

            {/* Footer */}
            <Footer />
        </div>
    )
}
