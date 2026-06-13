import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

function ForgotPassword() {
  const [step, setStep] = useState(1) // 1=email, 2=otp, 3=newpass, 4=success
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", ""])
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendOtp = () => {
    if (!email) { setError("Please enter your email!"); return }
    setError("")
    setIsLoading(true)
    setTimeout(() => { setIsLoading(false); setStep(2) }, 1500)
  }

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    // Auto focus next
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
  }

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus()
    }
  }

  const handleVerifyOtp = () => {
    if (otp.join("").length < 4) { setError("Enter complete OTP!"); return }
    setError("")
    setIsLoading(true)
    setTimeout(() => { setIsLoading(false); setStep(3) }, 1500)
  }

  const handleResetPassword = () => {
    if (!newPass || !confirmPass) { setError("Please fill all fields!"); return }
    if (newPass !== confirmPass) { setError("Passwords do not match!"); return }
    if (newPass.length < 6) { setError("Password must be at least 6 characters!"); return }
    setError("")
    setIsLoading(true)
    setTimeout(() => { setIsLoading(false); setStep(4) }, 1500)
  }

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter") action()
  }

  const stepTitles = {
    1: { title: "Forgot Password?", subtitle: "Enter your registered email" },
    2: { title: "Enter OTP", subtitle: `OTP sent to ${email}` },
    3: { title: "New Password", subtitle: "Choose a strong password" },
    4: { title: "Password Reset!", subtitle: "You can now login with new password" },
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl relative z-10"
      >

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Desk<span className="text-green-400">Guard</span>
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <motion.div
                animate={{
                  backgroundColor: step >= s ? "#22c55e" : "#374151",
                  scale: step === s ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
              >
                {step > s ? "✓" : s}
              </motion.div>
              {s < 4 && (
                <motion.div
                  animate={{ backgroundColor: step > s ? "#22c55e" : "#374151" }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-0.5"
                />
              )}
            </div>
          ))}
        </div>

        {/* Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-6"
          >
            <h2 className="text-xl font-bold text-white">{stepTitles[step].title}</h2>
            <p className="text-gray-400 text-sm mt-1">{stepTitles[step].subtitle}</p>
          </motion.div>
        </AnimatePresence>

        {/* Step Content */}
        <AnimatePresence mode="wait">

          {/* Step 1 — Email */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <label className="text-gray-400 text-sm mb-1 block">
                Email / Student ID
              </label>
              <input
                type="text"
                placeholder="e.g. STU2024001@muj.manipal.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleSendOtp)}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition mb-4"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSendOtp}
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending OTP...
                  </>
                ) : "Send OTP →"}
              </motion.button>
            </motion.div>
          )}

          {/* Step 2 — OTP */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, index) => (
                  <motion.input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    whileFocus={{ scale: 1.1, borderColor: "#22c55e" }}
                    className="w-14 h-14 text-center text-2xl font-bold bg-gray-800 border-2 border-gray-600 rounded-xl text-white focus:outline-none focus:border-green-400 transition"
                  />
                ))}
              </div>

              <p className="text-center text-gray-500 text-xs mb-4">
                Didn't receive?{" "}
                <button
                  onClick={() => setOtp(["", "", "", ""])}
                  className="text-green-400 hover:underline"
                >
                  Resend OTP
                </button>
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Verifying...
                  </>
                ) : "Verify OTP →"}
              </motion.button>
            </motion.div>
          )}

          {/* Step 3 — New Password */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label className="text-gray-400 text-sm mb-1 block">New Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Min 6 characters"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") document.getElementById("confirm-pass").focus()
                    }}
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition"
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                  >
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">Confirm Password</label>
                <input
                  id="confirm-pass"
                  type={showPass ? "text" : "password"}
                  placeholder="Repeat password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleResetPassword)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleResetPassword}
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Resetting...
                  </>
                ) : "Reset Password →"}
              </motion.button>
            </motion.div>
          )}

          {/* Step 4 — Success */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-500/20 border-2 border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-4xl">✅</span>
              </motion.div>
              <p className="text-gray-400 text-sm mb-6">
                Your password has been reset successfully!
              </p>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
                >
                  Back to Login →
                </motion.button>
              </Link>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-sm mt-4 text-center"
            >
              ⚠️ {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Back to login */}
        {step !== 4 && (
          <p className="text-center text-gray-600 text-xs mt-6">
            Remember password?{" "}
            <Link to="/login" className="text-green-400 hover:underline">
              Back to Login
            </Link>
          </p>
        )}

      </motion.div>
    </div>
  )
}

export default ForgotPassword