import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { seatColors } from "../data/seats"
import SeatPopup from "./SeatPopup"

const statusConfig = {
  free:      { label: "Available",   emoji: "🪑", text: "text-green-400",  border: "border-green-500/40",  bg: "bg-green-500/10",  glow: "shadow-green-500/20" },
  occupied:  { label: "Occupied",    emoji: "🪑", text: "text-red-400",    border: "border-red-500/40",    bg: "bg-red-500/10",    glow: "shadow-red-500/10"   },
  away:      { label: "Away",        emoji: "⏸",  text: "text-yellow-400", border: "border-yellow-500/40", bg: "bg-yellow-500/10", glow: "shadow-yellow-500/10"},
  abandoned: { label: "Maintenance", emoji: "🔧", text: "text-gray-400",   border: "border-gray-600/40",   bg: "bg-gray-500/10",   glow: "shadow-gray-500/10"  },
}

const rows = ["A", "B", "C", "D"]
const cols = [1, 2, 3, 4, 5]

function SeatMap({ seats, onCheckin }) {
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [hoveredSeat,  setHoveredSeat]  = useState(null)
  const [viewMode,     setViewMode]     = useState("grid")

  return (
    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">

      {/* Legend + View Toggle — single row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

        {/* Legend */}
        <div className="flex flex-wrap gap-4">
          {[
            { status: "free",      label: "Available"    },
            { status: "occupied",  label: "Occupied"     },
            { status: "away",      label: "Away"         },
            { status: "abandoned", label: "Maintenance"  },
          ].map((item, i) => (
            <motion.div
              key={item.status}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={item.status === "free" ? { scale: [1, 1.3, 1], opacity: [1, 0.6, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: seatColors[item.status] }}
              />
              <span className="text-gray-400 text-xs font-medium">{item.label}</span>
            </motion.div>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-purple-400 text-xs">⭐</span>
            <span className="text-gray-400 text-xs font-medium">Recommended</span>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-800 rounded-lg p-0.5 gap-0.5">
          {[
            { mode: "grid",      icon: "⊞", label: "Grid"       },
            { mode: "floorplan", icon: "🗺", label: "Floor Plan" },
          ].map((v) => (
            <motion.button
              key={v.mode}
              onClick={() => setViewMode(v.mode)}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                viewMode === v.mode
                  ? "bg-green-500 text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span>{v.icon}</span> {v.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Views */}
      <AnimatePresence mode="wait">

        {/* ── Grid View ── */}
        {viewMode === "grid" && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="overflow-x-auto"
          >
            <div className="min-w-[560px]">

              {/* Column headers */}
              <div className="grid grid-cols-[40px_repeat(5,1fr)] gap-3 mb-3">
                <div />
                {cols.map((col) => (
                  <div key={col} className="text-center text-gray-500 text-xs font-semibold">
                    Col {col}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {rows.map((row, rowIdx) => (
                <div key={row} className="grid grid-cols-[40px_repeat(5,1fr)] gap-3 mb-3">
                  <div className="flex items-center justify-center text-gray-500 font-bold text-sm">
                    {row}
                  </div>

                  {cols.map((col, colIdx) => {
                    const seat   = seats.find((s) => s.row === row && s.col === col)
                    if (!seat) return <div key={col} />

                    const config    = statusConfig[seat.status]
                    const isHovered = hoveredSeat === seat.id
                    const delay     = (rowIdx * 5 + colIdx) * 0.02

                    return (
                      <motion.div
                        key={seat.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedSeat(seat)}
                        onMouseEnter={() => setHoveredSeat(seat.id)}
                        onMouseLeave={() => setHoveredSeat(null)}
                        className={`relative cursor-pointer rounded-xl border ${config.border} ${config.bg} px-3 py-3 flex flex-col items-center gap-1 transition-shadow ${
                          isHovered ? `shadow-lg ${config.glow}` : ""
                        } ${seat.recommended ? "ring-2 ring-purple-500/60" : ""}`}
                      >
                        {seat.recommended && (
                          <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 1.8 }}
                            className="absolute -top-2 -right-2 bg-purple-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40"
                          >
                            ⭐
                          </motion.div>
                        )}

                        {seat.status === "free" && (
                          <motion.div
                            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-green-400"
                          />
                        )}

                        <span className="text-xl">{config.emoji}</span>
                        <span className={`font-bold text-sm ${config.text}`}>{seat.id}</span>
                        <span className="text-gray-500 text-[10px] text-center leading-tight">
                          {config.label}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Floor Plan View ── */}
{viewMode === "floorplan" && (
  <motion.div
    key="floorplan"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.22 }}
    className="relative w-full rounded-2xl overflow-hidden"
    style={{ minHeight: 500 }}
  >
    {/* Room SVG background */}
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Room floor */}
      <rect width="800" height="500" fill="#0a0f1a" />

      {/* Grid lines - subtle */}
      {[...Array(16)].map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500"
          stroke="#ffffff" strokeOpacity="0.025" strokeWidth="1" />
      ))}
      {[...Array(10)].map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50}
          stroke="#ffffff" strokeOpacity="0.025" strokeWidth="1" />
      ))}

      {/* Outer walls */}
      <rect x="20" y="20" width="760" height="460"
        fill="none" stroke="#22c55e" strokeOpacity="0.15" strokeWidth="2" rx="8" />

      {/* Window wall - left side */}
      <rect x="20" y="20" width="6" height="460"
        fill="#22c55e" fillOpacity="0.3" />
      {[60, 120, 180, 240, 300, 360].map((y) => (
        <rect key={y} x="20" y={y} width="6" height="40"
          fill="#22c55e" fillOpacity="0.6" />
      ))}

      {/* Entrance - bottom */}
      <rect x="340" y="464" width="120" height="16"
        fill="#0a0f1a" />
      <line x1="340" y1="464" x2="340" y2="480"
        stroke="#22c55e" strokeOpacity="0.4" strokeWidth="2" />
      <line x1="460" y1="464" x2="460" y2="480"
        stroke="#22c55e" strokeOpacity="0.4" strokeWidth="2" />

      {/* Bookshelf - right wall */}
      {[40, 100, 160, 220, 280, 340, 400].map((y) => (
        <rect key={y} x="740" y={y} width="36" height="55"
          fill="#1e293b" stroke="#334155" strokeWidth="1" rx="2" />
      ))}

      {/* Table groups — 4 clusters */}
      {/* Cluster A - top left */}
      <rect x="80" y="70" width="220" height="110" rx="8"
        fill="#111827" stroke="#1f2937" strokeWidth="1.5" />
      {/* Cluster B - top right */}
      <rect x="380" y="70" width="220" height="110" rx="8"
        fill="#111827" stroke="#1f2937" strokeWidth="1.5" />
      {/* Cluster C - bottom left */}
      <rect x="80" y="280" width="220" height="110" rx="8"
        fill="#111827" stroke="#1f2937" strokeWidth="1.5" />
      {/* Cluster D - bottom right */}
      <rect x="380" y="280" width="220" height="110" rx="8"
        fill="#111827" stroke="#1f2937" strokeWidth="1.5" />

      {/* Aisle labels */}
      <text x="330" y="175" textAnchor="middle"
        fill="#374151" fontSize="10" fontFamily="monospace" letterSpacing="2">
        AISLE
      </text>
      <text x="400" y="260" textAnchor="middle"
        fill="#374151" fontSize="10" fontFamily="monospace" letterSpacing="2">
        AISLE
      </text>

      {/* Window label */}
      <text x="14" y="260" textAnchor="middle"
        fill="#22c55e" fontSize="9" fontFamily="monospace"
        letterSpacing="1" transform="rotate(-90, 14, 260)" fillOpacity="0.6">
        WINDOW SIDE
      </text>

      {/* Entrance label */}
      <text x="400" y="496" textAnchor="middle"
        fill="#22c55e" fontSize="10" fontFamily="monospace"
        letterSpacing="3" fillOpacity="0.7">
        ▲ ENTRANCE
      </text>

      {/* Bookshelf label */}
      <text x="793" y="260" textAnchor="middle"
        fill="#374151" fontSize="9" fontFamily="monospace"
        letterSpacing="1" transform="rotate(90, 793, 260)" fillOpacity="0.8">
        BOOKSHELVES
      </text>

      {/* Row labels */}
      {["A","B","C","D"].map((row, i) => {
        const y = i < 2 ? 125 : 335
        return (
          <text key={row} x="55" y={y}
            textAnchor="middle" dominantBaseline="middle"
            fill="#4b5563" fontSize="11" fontFamily="monospace" fontWeight="bold">
            {row}
          </text>
        )
      })}
    </svg>

    {/* Seat positions overlaid on SVG */}
    {seats.map((seat) => {
      const config = statusConfig[seat.status]

      // Map row/col to pixel positions matching the SVG table clusters
      const rowGroup = { A: 0, B: 1, C: 2, D: 3 }[seat.row]
      const isTopHalf = rowGroup < 2
      const clusterLeft = rowGroup % 2 === 0 ? 80 : 380  // left vs right cluster
      const baseX = clusterLeft + ((seat.col - 1) * 44) + 22
      const baseY = isTopHalf
        ? 70 + (rowGroup === 0 ? 28 : 72)
        : 280 + (rowGroup === 2 ? 28 : 72)

      return (
        <motion.div
          key={seat.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: (["A","B","C","D"].indexOf(seat.row) * 5 + seat.col - 1) * 0.04,
            type: "spring", stiffness: 260, damping: 20,
          }}
          whileHover={{ scale: 1.3, zIndex: 30 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedSeat(seat)}
          className="absolute cursor-pointer group"
          style={{
            left: baseX,
            top: baseY,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Pulse ring for free seats */}
          {seat.status === "free" && (
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className="absolute inset-0 rounded-lg bg-green-400/30 pointer-events-none"
            />
          )}

          {/* Seat card */}
          <motion.div
            animate={
              seat.status === "free"
                ? { boxShadow: ["0 0 0px #22c55e40", "0 0 12px #22c55e80", "0 0 0px #22c55e40"] }
                : {}
            }
            transition={{ repeat: Infinity, duration: 2.2 }}
            className={`w-11 h-11 rounded-lg ${config.bg} border ${config.border} flex flex-col items-center justify-center gap-0.5 ${
              seat.recommended ? "ring-2 ring-purple-500/70" : ""
            }`}
          >
            <span className="text-sm leading-none">{config.emoji}</span>
            <span className={`font-bold text-[10px] leading-none ${config.text}`}>{seat.id}</span>
          </motion.div>

          {/* Hover tooltip */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-600 rounded-md px-2 py-1 text-[9px] text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-150 z-40 pointer-events-none">
            {seat.id} · {config.label}
            {seat.tags?.length ? ` · ${seat.tags[0]}` : ""}
          </div>
        </motion.div>
      )
    })}
  </motion.div>
)}
      </AnimatePresence>

      {/* Popup */}
      <AnimatePresence>
        {selectedSeat && (
          <SeatPopup
            seat={selectedSeat}
            onClose={() => setSelectedSeat(null)}
            onCheckin={(seatId) => {
              onCheckin(seatId)
              setSelectedSeat(null)
            }}
          />
        )}
      </AnimatePresence>

    </div>
  )
}

export default SeatMap