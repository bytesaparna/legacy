'use client'

import { StaggerContainer } from "@/components/stagger-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { features } from "@/utils/features"
import { motion } from "framer-motion"
import { useState } from "react"


export const Features = () => {
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

    return (
        <section className="py-20 px-4 relative z-10">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4 text-white">Everything You Need to Protect Your Legacy</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Our comprehensive platform provides all the tools and guidance you need to create a professional,
                        legally compliant will.
                    </p>
                </motion.div>

                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            onHoverStart={() => setHoveredFeature(index)}
                            onHoverEnd={() => setHoveredFeature(null)}
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="h-full shadow-2xl transition-all duration-500 bg-gradient-to-br from-white/40 to-yellow-600/40 backdrop-blur-xl overflow-hidden group">
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    initial={false}
                                />
                                <CardHeader className="text-center pb-4 relative z-10">
                                    <motion.div
                                        animate={{
                                            scale: hoveredFeature === index ? 1.2 : 1,
                                            rotate: hoveredFeature === index ? 360 : 0,
                                        }}
                                        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                                        className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-yellow-900/80 flex items-center justify-center ${feature.color} relative overflow-hidden`}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            animate={{ x: [-100, 100] }}
                                            transition={{
                                                duration: 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                repeatDelay: 3,
                                                ease: "easeInOut",
                                            }}
                                        />
                                        <feature.icon className="w-6 h-6 relative z-10" />
                                    </motion.div>
                                    <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="relative z-10">
                                    <CardDescription className="text-center text-gray-300">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    )
}