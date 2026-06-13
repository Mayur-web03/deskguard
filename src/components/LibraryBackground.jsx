import { motion } from "framer-motion"

function LibraryBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-950">

      {/* ── Isometric grid floor — signature visual ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1024 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Green glow gradient */}
          <linearGradient id="gGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>

          {/* Subtle panel gradient */}
          <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
          </linearGradient>

          {/* Radial glow for center */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </radialGradient>

          {/* Clip path for entire SVG */}
          <clipPath id="svgClip">
            <rect width="1024" height="600" />
          </clipPath>
        </defs>

        {/* Base background */}
        <rect width="1024" height="600" fill="#030712" />

        {/* Center radial glow */}
        <ellipse cx="512" cy="300" rx="500" ry="300"
          fill="url(#centerGlow)" />

        {/* Isometric grid lines — horizontal */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={-200 + i * 80} y1="0"
            x2={i * 80 - 100} y2="600"
            stroke="#22c55e" strokeOpacity="0.04" strokeWidth="1"
          />
        ))}
        {/* Isometric grid lines — diagonal other way */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`d${i}`}
            x1={i * 80} y1="0"
            x2={i * 80 + 200} y2="600"
            stroke="#1e3a5f" strokeOpacity="0.06" strokeWidth="1"
          />
        ))}
        {/* Horizontal faint lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`hl${i}`}
            x1="0" y1={i * 50}
            x2="1024" y2={i * 50}
            stroke="#ffffff" strokeOpacity="0.015" strokeWidth="1"
          />
        ))}

        {/* ── LEFT: Floating Bookshelf ── */}
        <motion.g
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          clipPath="url(#svgClip)"
        >
          {/* Shelf body */}
          <rect x="30" y="100" width="170" height="240" rx="8"
            fill="url(#panel)" stroke="#22c55e" strokeOpacity="0.18" strokeWidth="1" />
          {/* Shelf dividers */}
          <line x1="30" y1="180" x2="200" y2="180"
            stroke="#1e293b" strokeWidth="2" strokeOpacity="0.8" />
          <line x1="30" y1="260" x2="200" y2="260"
            stroke="#1e293b" strokeWidth="2" strokeOpacity="0.8" />

          {/* Books row 1 */}
          {[
            { x: 45,  w: 18, h: 60, c: "#22c55e", op: 0.6 },
            { x: 68,  w: 14, h: 55, c: "#3b82f6", op: 0.4 },
            { x: 87,  w: 20, h: 62, c: "#8b5cf6", op: 0.4 },
            { x: 112, w: 16, h: 58, c: "#22c55e", op: 0.3 },
            { x: 133, w: 22, h: 64, c: "#f59e0b", op: 0.35 },
            { x: 160, w: 15, h: 57, c: "#22c55e", op: 0.5 },
          ].map((b, i) => (
            <rect key={i} x={b.x} y={178 - b.h} width={b.w} height={b.h}
              rx="2" fill={b.c} fillOpacity={b.op} />
          ))}

          {/* Books row 2 */}
          {[
            { x: 45,  w: 22, h: 55, c: "#3b82f6", op: 0.4 },
            { x: 72,  w: 16, h: 62, c: "#22c55e", op: 0.5 },
            { x: 93,  w: 18, h: 50, c: "#ec4899", op: 0.3 },
            { x: 116, w: 20, h: 58, c: "#22c55e", op: 0.4 },
            { x: 141, w: 14, h: 64, c: "#f59e0b", op: 0.35 },
            { x: 160, w: 18, h: 52, c: "#8b5cf6", op: 0.3 },
          ].map((b, i) => (
            <rect key={i} x={b.x} y={258 - b.h} width={b.w} height={b.h}
              rx="2" fill={b.c} fillOpacity={b.op} />
          ))}

          {/* Glowing accent line */}
          <rect x="30" y="100" width="4" height="240" rx="2"
            fill="#22c55e" fillOpacity="0.5" />

          {/* Top glow */}
          <rect x="30" y="100" width="170" height="2" rx="1"
            fill="#22c55e" fillOpacity="0.4" />
        </motion.g>

        {/* ── LEFT BOTTOM: Desk ── */}
        <motion.g
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          {/* Desk surface — isometric feel */}
          <rect x="20" y="430" width="180" height="90" rx="6"
            fill="url(#panel)" stroke="#334155" strokeOpacity="0.4" strokeWidth="1" />
          {/* Monitor on desk */}
          <rect x="60" y="390" width="80" height="50" rx="4"
            fill="#0f172a" stroke="#22c55e" strokeOpacity="0.4" strokeWidth="1" />
          <rect x="70" y="397" width="60" height="36" rx="2"
            fill="#22c55e" fillOpacity="0.08" />
          {/* Screen glow */}
          <rect x="70" y="397" width="60" height="3" rx="1"
            fill="#22c55e" fillOpacity="0.4" />
          {/* Desk stand */}
          <rect x="95" y="440" width="10" height="8" rx="1"
            fill="#1e293b" />
          {/* Keyboard */}
          <rect x="50" y="450" width="100" height="18" rx="3"
            fill="#111827" stroke="#1e293b" strokeWidth="1" />
          {[0,1,2,3].map(i => (
            <rect key={i} x={58 + i * 22} y={454} width="16" height="4" rx="1"
              fill="#1e293b" />
          ))}
          {/* Desk legs */}
          <rect x="30"  y="516" width="8" height="20" rx="2" fill="#0f172a" />
          <rect x="182" y="516" width="8" height="20" rx="2" fill="#0f172a" />
        </motion.g>

        {/* ── RIGHT: Floating Shelf ── */}
        <motion.g
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <rect x="820" y="40" width="160" height="210" rx="8"
            fill="url(#panel)" stroke="#22c55e" strokeOpacity="0.15" strokeWidth="1" />
          <line x1="820" y1="120" x2="980" y2="120"
            stroke="#1e293b" strokeWidth="2" />
          <line x1="820" y1="200" x2="980" y2="200"
            stroke="#1e293b" strokeWidth="2" />

          {/* Books */}
          {[
            { x: 830, w: 20, h: 58, c: "#8b5cf6", op: 0.5 },
            { x: 855, w: 16, h: 65, c: "#22c55e", op: 0.6 },
            { x: 876, w: 18, h: 52, c: "#3b82f6", op: 0.4 },
            { x: 899, w: 22, h: 60, c: "#f59e0b", op: 0.4 },
            { x: 926, w: 14, h: 55, c: "#22c55e", op: 0.35 },
            { x: 945, w: 20, h: 62, c: "#ec4899", op: 0.3 },
          ].map((b, i) => (
            <rect key={i} x={b.x} y={118 - b.h} width={b.w} height={b.h}
              rx="2" fill={b.c} fillOpacity={b.op} />
          ))}
          {[
            { x: 830, w: 16, h: 55, c: "#22c55e", op: 0.45 },
            { x: 851, w: 22, h: 62, c: "#3b82f6", op: 0.4 },
            { x: 878, w: 18, h: 48, c: "#f59e0b", op: 0.35 },
            { x: 901, w: 20, h: 58, c: "#8b5cf6", op: 0.4 },
            { x: 926, w: 14, h: 64, c: "#22c55e", op: 0.5 },
            { x: 945, w: 16, h: 52, c: "#ec4899", op: 0.3 },
          ].map((b, i) => (
            <rect key={i} x={b.x} y={198 - b.h} width={b.w} height={b.h}
              rx="2" fill={b.c} fillOpacity={b.op} />
          ))}

          <rect x="976" y="40" width="4" height="210" rx="2"
            fill="#22c55e" fillOpacity="0.4" />
          <rect x="820" y="40" width="160" height="2" rx="1"
            fill="#22c55e" fillOpacity="0.35" />
        </motion.g>

        {/* ── RIGHT BOTTOM: Study desk ── */}
        <motion.g
          animate={{ y: [0, 11, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <rect x="800" y="390" width="200" height="85" rx="6"
            fill="url(#panel)" stroke="#334155" strokeOpacity="0.35" strokeWidth="1" />
          {/* Laptop */}
          <rect x="850" y="355" width="90" height="45" rx="4"
            fill="#0f172a" stroke="#22c55e" strokeOpacity="0.35" strokeWidth="1" />
          <rect x="858" y="362" width="74" height="31" rx="2"
            fill="#22c55e" fillOpacity="0.07" />
          {/* Laptop screen glow lines */}
          <rect x="858" y="362" width="74" height="2" rx="1"
            fill="#22c55e" fillOpacity="0.35" />
          <rect x="858" y="368" width="50" height="1.5" rx="1"
            fill="#22c55e" fillOpacity="0.2" />
          <rect x="858" y="373" width="35" height="1.5" rx="1"
            fill="#22c55e" fillOpacity="0.15" />
          {/* Laptop base */}
          <rect x="845" y="400" width="110" height="8" rx="2"
            fill="#111827" />
          {/* Coffee cup */}
          <rect x="930" y="400" width="24" height="30" rx="4"
            fill="#1e293b" stroke="#374151" strokeWidth="1" />
          <rect x="930" y="400" width="24" height="6" rx="2"
            fill="#22c55e" fillOpacity="0.3" />
          {/* Desk legs */}
          <rect x="810" y="472" width="8" height="22" rx="2" fill="#0f172a" />
          <rect x="982" y="472" width="8" height="22" rx="2" fill="#0f172a" />
        </motion.g>

        {/* ── CENTER TOP: Floating geometric accent ── */}
        <motion.g
          animate={{ y: [0, -7, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          {/* Hexagonal glow ring */}
          <circle cx="512" cy="60" r="80"
            fill="none" stroke="#22c55e" strokeOpacity="0.06" strokeWidth="1" />
          <circle cx="512" cy="60" r="50"
            fill="none" stroke="#22c55e" strokeOpacity="0.08" strokeWidth="1" />
          <circle cx="512" cy="60" r="20"
            fill="#22c55e" fillOpacity="0.05" />
          {/* DG monogram */}
          <text x="512" y="65" textAnchor="middle"
            fill="#22c55e" fillOpacity="0.2" fontSize="16"
            fontFamily="monospace" fontWeight="bold" letterSpacing="3">
            DG
          </text>
        </motion.g>

        {/* ── BOTTOM CENTER: Scan line effect ── */}
        <motion.g
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <circle cx="512" cy="540" r="130"
            fill="url(#gGlow)" fillOpacity="0.12" />
        </motion.g>

        {/* Vignette overlay */}
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%"   stopColor="#030712" stopOpacity="0"   />
            <stop offset="100%" stopColor="#030712" stopOpacity="0.7" />
          </radialGradient>
        </defs>
        <rect width="1024" height="600" fill="url(#vignette)" />

      </svg>

      {/* Bottom gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/20 via-transparent to-gray-950/80 pointer-events-none" />

      {/* Subtle top-left corner accent */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/4 rounded-full blur-3xl pointer-events-none" />

    </div>
  )
}

export default LibraryBackground