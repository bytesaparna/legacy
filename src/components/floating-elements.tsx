"use client"

import { motion } from "framer-motion"
import { Award, Shield, FileText, Users, Heart, Star } from "lucide-react"

const floatingIcons = [
  { Icon: Award, delay: 0, x: 100, y: 200 },
  { Icon: Shield, delay: 2, x: 300, y: 100 },
  { Icon: FileText, delay: 4, x: 500, y: 300 },
  { Icon: Users, delay: 1, x: 200, y: 400 },
  { Icon: Heart, delay: 3, x: 400, y: 150 },
  { Icon: Star, delay: 5, x: 150, y: 350 },
]

export function FloatingElements() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute opacity-5"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.05, 0],
            scale: [0, 1, 0],
            y: [0, -100, -200],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            delay: delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Icon className="w-12 h-12 text-blue-600" />
        </motion.div>
      ))}
    </div>
  )
}
