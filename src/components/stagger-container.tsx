"use client"

import type React from "react"

import { motion } from "framer-motion"

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.1 }: StaggerContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div>{children}</motion.div>
      )}
    </motion.div>
  )
}
