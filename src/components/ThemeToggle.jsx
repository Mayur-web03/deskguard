import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === "dark"

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`relative w-14 h-7 rounded-full flex items-center px-1 transition-colors duration-500 ${
        isDark ? "bg-gray-700" : "bg-yellow-300"
      }`}
      aria-label="Toggle theme"
    >
      {/* Sliding pill */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`w-5 h-5 rounded-full shadow-md flex items-center justify-center text-xs ${
          isDark ? "bg-gray-900 ml-0" : "bg-white ml-7"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? "🌙" : "☀️"}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle