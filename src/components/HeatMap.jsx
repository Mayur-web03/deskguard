import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const heatData = {
  Monday:    [2, 3, 5, 7, 9, 10, 8, 6, 4, 3, 2, 1],
  Tuesday:   [1, 2, 4, 6, 8, 10, 9, 7, 5, 3, 2, 1],
  Wednesday: [3, 4, 6, 8, 10, 9, 7, 8, 6, 4, 3, 2],
  Thursday:  [2, 3, 5, 7, 9, 10, 8, 7, 5, 3, 2, 1],
  Friday:    [4, 5, 7, 9, 10, 8, 6, 5, 4, 3, 2, 1],
  Saturday:  [1, 1, 2, 3, 5, 6, 7, 8, 7, 5, 3, 2],
  Sunday:    [1, 1, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1],
}

const timeSlots = [
  "8AM", "9AM", "10AM", "11AM",
  "12PM", "1PM", "2PM", "3PM",
  "4PM", "5PM", "6PM", "7PM",
]

const bestSeatSuggestions = [
  { id: "C3", reason: "Near window, quiet zone, high availability", score: 95 },
  { id: "A1", reason: "Corner seat, low foot traffic, good lighting", score: 88 },
  { id: "D5", reason: "Near power outlet, away from entry noise", score: 82 },
]

function getHeatColor(value) {
  if (value <= 2) return { bg: "bg-green-500", opacity: "opacity-20", label: "Very Low" }
  if (value <= 4) return { bg: "bg-green-400", opacity: "opacity-40", label: "Low" }
  if (value <= 6) return { bg: "bg-yellow-400", opacity: "opacity-50", label: "Moderate" }
  if (value <= 8) return { bg: "bg-orange-400", opacity: "opacity-60", label: "High" }
  return { bg: "bg-red-500", opacity: "opacity-80", label: "Very High" }
}

function HeatMap() {
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [hoveredCell, setHoveredCell] = useState(null)
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)

  const days = Object.keys(heatData)
  const currentData = heatData[selectedDay]

  const bestTime = timeSlots[currentData.indexOf(Math.min(...currentData))]
  const worstTime = timeSlots[currentData.indexOf(Math.max(...currentData))]

  return (
    <div className="space-y-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 border border-gray-700 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🔥</span>
              <h3 className="text-white font-bold text-lg">Peak Hours Heatmap</h3>
              <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs px-2 py-0.5 rounded-full font-medium">
                AI Powered
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              See when the library gets crowded — plan your visit smartly
            </p>
          </div>

          {/* Smart Suggestion Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSuggestion(!showSuggestion)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-green-500/20"
          >
            <span>✨</span> Best Seat For Me
          </motion.button>
        </div>

        {/* Smart Suggestion Panel */}
        <AnimatePresence>
          {showSuggestion && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-gray-800/60 border border-green-500/20 rounded-xl p-4">
                <p className="text-green-400 text-sm font-semibold mb-3">
                  ✨ AI Recommended Seats for You
                </p>
                <div className="space-y-2">
                  {bestSeatSuggestions.map((s, i) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setSelectedSuggestion(s.id === selectedSuggestion ? null : s.id)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition border ${
                        selectedSuggestion === s.id
                          ? "bg-green-500/20 border-green-500/40"
                          : "bg-gray-700/50 border-transparent hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
                          <span className="text-green-400 font-bold text-sm">{s.id}</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">Seat {s.id}</p>
                          <p className="text-gray-500 text-xs">{s.reason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold text-sm">{s.score}%</p>
                        <p className="text-gray-600 text-xs">match</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Day Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {days.map((day) => (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedDay === day
                  ? "bg-blue-500 text-white shadow shadow-blue-500/30"
                  : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
              }`}
            >
              {day.slice(0, 3)}
            </motion.button>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">

            {/* Time Labels */}
            <div className="grid grid-cols-12 gap-1 mb-2 pl-0">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="text-center text-gray-600 text-xs"
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Heat Row */}
            <div className="grid grid-cols-12 gap-1">
              {currentData.map((value, i) => {
                const heat = getHeatColor(value)
                const isHovered = hoveredCell === i

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                    onMouseEnter={() => setHoveredCell(i)}
                    onMouseLeave={() => setHoveredCell(null)}
                    className="relative"
                  >
                    <div
                      className={`h-12 rounded-lg ${heat.bg} ${heat.opacity} border border-white/5 cursor-pointer transition-all`}
                    />

                    {/* Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-600 rounded-lg px-2 py-1.5 text-xs whitespace-nowrap z-20 shadow-xl"
                        >
                          <p className="text-white font-semibold">{timeSlots[i]}</p>
                          <p className="text-gray-400">{heat.label} occupancy</p>
                          <p className="text-blue-400">{value * 10}% seats taken</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

            {/* Heat Legend */}
            <div className="flex items-center gap-2 mt-3 justify-end">
              <span className="text-gray-600 text-xs">Less busy</span>
              {["bg-green-500", "bg-green-400", "bg-yellow-400", "bg-orange-400", "bg-red-500"].map((bg, i) => (
                <div key={i} className={`w-5 h-3 rounded ${bg} opacity-70`} />
              ))}
              <span className="text-gray-600 text-xs">More busy</span>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-green-500/10 border border-green-500/20 rounded-xl p-3"
          >
            <p className="text-green-400 text-xs font-semibold mb-1">🟢 Best Time to Visit</p>
            <p className="text-white font-bold">{bestTime}</p>
            <p className="text-gray-500 text-xs mt-0.5">Least crowded on {selectedDay}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-3"
          >
            <p className="text-red-400 text-xs font-semibold mb-1">🔴 Peak Hours</p>
            <p className="text-white font-bold">{worstTime}</p>
            <p className="text-gray-500 text-xs mt-0.5">Most crowded on {selectedDay}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3"
          >
            <p className="text-blue-400 text-xs font-semibold mb-1">💡 Smart Tip</p>
            <p className="text-white font-bold text-sm">Arrive at {bestTime}</p>
            <p className="text-gray-500 text-xs mt-0.5">70% more seats available</p>
          </motion.div>
        </div>

      </motion.div>
    </div>
  )
}

export default HeatMap