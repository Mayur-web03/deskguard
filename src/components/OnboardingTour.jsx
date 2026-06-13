import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const steps = [
  {
    title: "Welcome to DeskGuard! 👋",
    desc: "Your smart library seat booking system. Let's show you around in 3 quick steps.",
    icon: "🪑",
    position: "center",
  },
  {
    title: "Filter Your Perfect Seat",
    desc: "Use the filter chips to find seats with specific features — Quiet Zone, Window, Outlet and more.",
    icon: "🔍",
    position: "top",
  },
  {
    title: "Book in One Click",
    desc: "Click any green seat on the map, or hit 'Book This Seat' on the recommended card. Done!",
    icon: "✅",
    position: "center",
  },
]

function OnboardingTour({ onDone }) {
  const [step, setStep] = useState(0)
  const current = steps[step]
  const isLast = step === steps.length - 1

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center px-4"
      >
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="bg-gray-900 border border-green-500/30 rounded-2xl p-8 w-full max-w-sm shadow-2xl shadow-green-500/10 text-center"
        >
          {/* Step indicator */}
          <div className="flex justify-center gap-1.5 mb-5">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                animate={{ width: i === step ? 24 : 8 }}
                transition={{ duration: 0.3 }}
                className={`h-1.5 rounded-full transition-colors ${
                  i === step ? "bg-green-400" : i < step ? "bg-green-700" : "bg-gray-700"
                }`}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 260 }}
            className="text-5xl mb-4"
          >
            {current.icon}
          </motion.div>

          <h2 className="text-xl font-bold text-white mb-2">{current.title}</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-7">{current.desc}</p>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={onDone}
              className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 text-sm font-medium hover:bg-gray-800 transition"
            >
              Skip Tour
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => (isLast ? onDone() : setStep((s) => s + 1))}
              className="flex-1 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition"
            >
              {isLast ? "Let's Go 🚀" : "Next →"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OnboardingTour