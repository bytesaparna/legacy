"use client"

import type React from "react"

import { motion } from "framer-motion"

export function DashboardCardAnimation({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay,
            }}
            viewport={{ once: true, amount: 0.3 }}
        >
            {children}
        </motion.div>
    )
}
