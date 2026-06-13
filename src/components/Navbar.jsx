import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import ThemeToggle from "./ThemeToggle"
import toast from "react-hot-toast"

function Navbar({ role = "student" }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleMySession = () => {
    const seat = localStorage.getItem("currentSeat")
    if (seat) {
      navigate(`/session/${seat}`)
    } else {
      toast.error("No active session! Book a seat first.")
    }
  }

  return (
    <nav className="relative bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 px-6 py-0 z-50">

      {/* Top accent line — brand signature */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-70" />

      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">

        {/* Logo */}
        <motion.div
          className="cursor-pointer flex items-center gap-3"
          onClick={() => navigate(role === "librarian" ? "/librarian" : "/map")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="relative w-8 h-8 flex-shrink-0">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-green-500/20 rounded-lg blur-sm"
            />
            <div className="relative w-8 h-8 bg-gray-800 border border-green-500/40 rounded-lg flex items-center justify-center">
              <span className="text-sm">🪑</span>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold text-white leading-none tracking-tight">
              Desk<span className="text-green-400">Guard</span>
            </h1>
            <p className="text-gray-600 text-[10px] tracking-widest font-medium mt-0.5">
              SEAT BOOKING
            </p>
          </div>
        </motion.div>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-1 bg-gray-800/60 rounded-xl p-1 border border-gray-700/50">
          {role === "student" && (
            <>
              <NavBtn
                active={location.pathname === "/map"}
                onClick={() => navigate("/map")}
                color="green"
              >
                🗺 Library Map
              </NavBtn>
              <NavBtn
                active={location.pathname.startsWith("/session")}
                onClick={handleMySession}
                color="green"
              >
                ⏱ My Session
              </NavBtn>
            </>
          )}

          {role === "librarian" && (
            <NavBtn
              active={location.pathname === "/librarian"}
              onClick={() => navigate("/librarian")}
              color="blue"
            >
              📊 Dashboard
            </NavBtn>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          <ThemeToggle />

          {/* Role badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
              role === "librarian"
                ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                : "bg-green-500/10 text-green-400 border-green-500/30"
            }`}
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`w-1.5 h-1.5 rounded-full inline-block ${
                role === "librarian" ? "bg-blue-400" : "bg-green-400"
              }`}
            />
            {role === "librarian" ? "Librarian" : "Student"}
          </motion.div>

          {/* Divider */}
          <div className="w-px h-5 bg-gray-700" />

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 1.05, color: "#f87171" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              localStorage.removeItem("currentSeat")
              navigate("/login")
            }}
            className="text-gray-500 hover:text-red-400 text-sm font-medium transition flex items-center gap-1.5"
          >
            <span className="text-xs">⏏</span> Logout
          </motion.button>

        </div>
      </div>
    </nav>
  )
}

function NavBtn({ children, active, onClick, color = "green" }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? color === "green"
            ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
            : "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
          : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </motion.button>
  )
}

export default Navbar