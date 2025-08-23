import { StaggerContainer } from "@/components/stagger-container"
import { stats } from "@/utils/features"
import { motion } from "framer-motion"

export const Stats = () => {
    return (
        <section className="py-16 bg-white/5 backdrop-blur-xl border-y border-white/10">
            <div className="container mx-auto px-4">
                <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="text-center"
                            whileHover={{ y: -5, scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-600 to-yellow-700 bg-clip-text text-transparent mb-2"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.2,
                                    type: "spring",
                                    stiffness: 200,
                                }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-gray-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    )
}