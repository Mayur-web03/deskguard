import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"

function StillHerePopup({ seatId, onYes, onNo }) {
  const [timeLeft, setTimeLeft] = useState(300) // 5 min = 300 seconds
  const [isShaking, setIsShaking] = useState(false)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          toast.error(`⚠️ Seat ${seatId} auto-released!`)
          onNo()
          return 0
        }
        // Shake when less than 60 seconds
        if (prev === 60) setIsShaking(true)
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = (timeLeft / 300) * 100

  const getProgressColor = () => {
    if (timeLeft > 180) return "#22c55e"
    if (timeLeft > 60) return "#eab308"
    return "#ef4444"
  }

  const handleYes = () => {
    toast.success(`✅ Session continued for Seat ${seatId}!`)
    onYes()
  }

  const handleNo = () => {
    toast(`🚪 Seat ${seatId} has been released.`, { icon: "👋" })
    onNo()
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
      />

{/* Popup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: isShaking
            ? [0, -8, 8, -8, 8, -4, 4, 0]
            : 0,
        }}
        exit={{ opacity: 0, scale: 0.8, y: 40 }}
        transition={
          isShaking
            ? { duration: 0.5, ease: "easeInOut" }
            : { type: "spring", stiffness: 300, damping: 25 }
        }
        onAnimationComplete={() => setIsShaking(false)}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <div className="bg-gray-900 border border-yellow-500/40 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-sm">
          {/* Warning Icon */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex justify-center mb-4"
          >
            <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center">
              <span className="text-3xl">⏰</span>
            </div>
          </motion.div>

          {/* Title */}
          <h2 className="text-xl font-bold text-white text-center mb-2">
            Still Here?
          </h2>

          {/* Message */}
          <p className="text-gray-400 text-sm text-center mb-1">
            You have been at{" "}
            <span className="text-yellow-400 font-semibold">
              Seat {seatId}
            </span>{" "}
            for 2 hours.
          </p>
          <p className="text-gray-500 text-xs text-center mb-6">
            Confirm your presence or your seat will be auto-released.
          </p>

          {/* Countdown Timer */}
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-500">Auto-release in</span>
              <motion.span
                animate={{ color: getProgressColor() }}
                className="font-bold text-sm"
              >
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </motion.span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                animate={{
                  width: `${progress}%`,
                  backgroundColor: getProgressColor(),
                }}
                transition={{ duration: 0.5 }}
                className="h-2 rounded-full"
              />
            </div>
          </div>

          {/* Urgent warning when low time */}
          <AnimatePresence>
            {timeLeft <= 60 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2 mb-4"
              >
                <p className="text-red-400 text-xs text-center font-medium">
                  🚨 Less than 1 minute! Respond now or lose your seat!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNo}
              className="flex-1 py-3 rounded-xl border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 font-medium text-sm transition"
            >
              🚪 Leave Seat
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleYes}
              className="flex-1 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-sm transition"
            >
              ✋ Yes, I'm Here!
            </motion.button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default StillHerePopup