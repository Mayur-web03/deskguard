import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"

function SeatPopup({ seat, onClose, onCheckin }) {
  const navigate = useNavigate()

  if (!seat) return null

  const statusConfig = {
    free: {
      label: "Available",
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/30",
      canCheckin: true,
      dot: "bg-green-400",
    },
    occupied: {
      label: "Occupied",
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/30",
      canCheckin: false,
      dot: "bg-red-400",
    },
    away: {
      label: "Temporarily Away",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10 border-yellow-500/30",
      canCheckin: false,
      dot: "bg-yellow-400",
    },
    abandoned: {
      label: "Abandoned",
      color: "text-gray-400",
      bg: "bg-gray-500/10 border-gray-500/30",
      canCheckin: true,
      dot: "bg-gray-400",
    },
  }

  const config = statusConfig[seat.status]

  const handleCheckin = () => {
    onCheckin(seat.id)
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Popup */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪑</span>
              <h2 className="text-xl font-bold text-white">
                Seat {seat.id}
              </h2>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="text-gray-500 hover:text-white transition text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-700"
            >
              ✕
            </motion.button>
          </div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`border rounded-xl px-4 py-3 mb-6 ${config.bg}`}
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className={`w-3 h-3 rounded-full ${config.dot}`}
              />
              <span className={`font-semibold ${config.color}`}>
                {config.label}
              </span>
            </div>
          </motion.div>

          {/* Seat Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="space-y-3 mb-6"
          >
            {[
              { label: "Seat ID", value: seat.id },
              {
                label: "Row",
                value: `Row ${seat.row}, Column ${seat.col}`,
              },
              {
                label: "Features",
                value: seat.tags?.join(" • ") || "—",
              },
              ...(seat.status === "away"
                ? [
                    {
                      label: "Away Timer",
                      value: "~15 min left",
                      highlight: "text-yellow-400",
                    },
                  ]
                : []),
              ...(seat.status === "abandoned"
                ? [
                    {
                      label: "Status",
                      value: "Under Maintenance",
                      highlight: "text-gray-400",
                    },
                  ]
                : []),
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-500">{item.label}</span>
                <span
                  className={`font-medium ${
                    item.highlight || "text-white"
                  }`}
                >
                  {item.value}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {config.canCheckin ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCheckin}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>✅</span>
                Check In to Seat {seat.id}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.01 }}
                disabled
                className="w-full bg-gray-700 text-gray-500 font-semibold py-3 rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>🔒</span>
                {seat.status === "occupied"
                  ? "Seat is Occupied"
                  : "Seat Temporarily Held"}
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SeatPopup