import { useEffect, useState } from "react"  
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
function BookingConfirmed({ seat, onClose }) {
  useEffect(() => {
  if (!seat) return

  // Center burst
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.55 },
    colors: ["#22c55e", "#4ade80", "#86efac", "#ffffff", "#a855f7"],
  })

  // Side cannons
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
    })

    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
    })
  }, 200)
}, [seat])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-900 border border-green-500/30 rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl shadow-green-500/10"
        >
          {/* Animated tick */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/10 border-2 border-green-400 flex items-center justify-center"
          >
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M4 12.5l5 5L20 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
              />
            </motion.svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-white mb-1"
          >
            Seat Booked!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-gray-400 text-sm mb-5"
          >
            You're checked in to your seat
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-5"
          >
            <p className="text-gray-500 text-xs mb-1">Seat Code</p>
            <p className="text-green-400 font-bold text-3xl tracking-widest">{seat.id}</p>
            <p className="text-gray-500 text-xs mt-2">{seat.tags?.join(" • ")}</p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 rounded-xl"
          >
            Done
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default BookingConfirmed