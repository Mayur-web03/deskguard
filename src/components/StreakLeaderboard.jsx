import { motion } from "framer-motion"

const leaderboard = [
  { name: "You", sessions: 14, streak: 5, you: true },
  { name: "Aarav Sharma", sessions: 18, streak: 7 },
  { name: "Priya Mehta", sessions: 16, streak: 4 },
  { name: "Rohan Gupta", sessions: 12, streak: 3 },
  { name: "Sneha Patel", sessions: 10, streak: 2 },
]

function StreakLeaderboard({onViewFull}) {
  const sorted = [...leaderboard].sort((a, b) => b.sessions - a.sessions)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5"
    >
      <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
        🔥 Your Streak
      </h3>
      <div className="flex items-center gap-2 mb-4">
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-3xl"
        >
          🔥
        </motion.span>
        <div>
          <p className="text-orange-400 font-bold text-2xl leading-none">5 Days</p>
          <p className="text-gray-500 text-xs">Keep it going!</p>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-3">
        <p className="text-gray-400 text-xs font-semibold mb-2">🏆 Top Visitors This Week</p>
        <div className="space-y-2">
          {sorted.map((u, i) => (
            <motion.div
              key={u.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`flex items-center justify-between text-sm rounded-lg px-2 py-1.5 ${
                u.you ? "bg-green-500/10 border border-green-500/20" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xs w-4">{i + 1}</span>
                <span className={u.you ? "text-green-400 font-semibold" : "text-gray-300"}>{u.name}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-gray-500">{u.sessions} sessions</span>
                <span className="text-orange-400">🔥 {u.streak}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default StreakLeaderboard