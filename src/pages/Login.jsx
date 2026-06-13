import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import LibraryBackground from "../components/LibraryBackground"

function Login() {
  const [role, setRole] = useState("student")
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!name || !id) {
      setError("Please fill all fields!")
      return
    }
    setError("")
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (role === "student") navigate("/map")
      else navigate("/librarian")
    }, 1500)
  }

  const handleKeyDown = (e, field) => {
    if (e.key === "Enter") {
      if (field === "name") {
        document.getElementById("id-input").focus()
      } else if (field === "id") {
        handleLogin()
      }
    }
  }

  return (
    <>
      <LibraryBackground />
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl relative z-10"
        >

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              className="flex items-center justify-center gap-2 mb-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
            >
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, -8, 8, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                🪑
              </motion.span>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Desk<span className="text-green-400">Guard</span>
              </h1>
            </motion.div>
            <p className="text-gray-400 text-sm">Library Seat Booking System</p>
          </motion.div>

          {/* Role Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative flex bg-gray-800 rounded-xl p-1 mb-6"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-[10px] shadow ${
                role === "student" ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ x: role === "student" ? 0 : "calc(100% + 0px)" }}
            />

            {["student", "librarian"].map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setError("") }}
                className={`relative z-10 flex-1 py-2 rounded-lg text-sm font-semibold transition-colors capitalize ${
                  role === r ? "text-white" : "text-gray-200 hover:text-white"
                }`}
              >
                {r === "student" ? "🎓 Student" : "📚 Librarian"}
              </button>
            ))}
          </motion.div>

          {/* Fields */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-6"
          >
            <motion.div whileFocus={{ scale: 1.01 }}>
              <label className="text-gray-400 text-sm mb-1 block">Full Name</label>
              <input
                id="name-input"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, "name")}
                className="w-full bg-gray-950 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400/40 transition-all"
              />
            </motion.div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">
                {role === "student" ? "Student ID" : "Librarian ID"}
              </label>
              <input
                id="id-input"
                type="text"
                placeholder={role === "student" ? "e.g. STU2024001" : "e.g. LIB001"}
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, "id")}
                className="w-full bg-gray-950 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400/40 transition-all"
              />
            </div>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }}
                exit={{ opacity: 0 }}
                transition={{ x: { duration: 0.4 } }}
                className="text-red-400 text-sm mb-4 text-center"
              >
                ⚠️ {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              role === "student" ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
            } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Logging in...
              </>
            ) : (
              role === "student" ? "Enter Library →" : "Librarian Login →"
            )}
          </motion.button>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-gray-400 text-xs mt-6"
          >
            WebForge 2026 · Manipal University Jaipur
          </motion.p>

        </motion.div>
      </div>
    </>
  )
}

export default Login