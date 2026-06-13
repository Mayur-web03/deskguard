import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function StatCard({ title, count, color, index = 0 }) {
  const [displayCount, setDisplayCount] = useState(0)

  // Count-up animation
  useEffect(() => {
    let start = 0
    const duration = 1000
    const increment = count / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= count) {
        setDisplayCount(count)
        clearInterval(timer)
      } else {
        setDisplayCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [count])

  const colorMap = {
    green: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: "text-green-400",
      glow: "shadow-green-500/10",
      icon: "🟢",
    },
    red: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
      glow: "shadow-red-500/10",
      icon: "🔴",
    },
    yellow: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      glow: "shadow-yellow-500/10",
      icon: "🟡",
    },
    gray: {
      bg: "bg-gray-500/10",
      border: "border-gray-500/30",
      text: "text-gray-400",
      glow: "shadow-gray-500/10",
      icon: "⚫",
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
      glow: "shadow-blue-500/10",
      icon: "🔵",
    },
  }

  const c = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -4 }}
      className={`border rounded-2xl p-5 flex flex-col gap-3 cursor-default shadow-lg ${c.bg} ${c.border} ${c.glow}`}
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-2">
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, delay: index * 0.5 }}
          className="text-lg"
        >
          {c.icon}
        </motion.span>
        <p className="text-sm font-medium text-gray-400">{title}</p>
      </div>

      {/* Count */}
      <motion.p
        className={`text-4xl font-bold ${c.text}`}
      >
        {displayCount}
      </motion.p>

      {/* Bottom bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
        className={`h-0.5 rounded-full ${c.text} opacity-30`}
        style={{ backgroundColor: "currentColor" }}
      />
    </motion.div>
  )
}

export default StatCard