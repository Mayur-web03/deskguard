import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import StillHerePopup from "../components/StillHerePopup"

function ActiveSession() {
  const { seatId } = useParams()
  const navigate = useNavigate()

  const [status, setStatus] = useState("occupied") // occupied | away
  const [showStillHere, setShowStillHere] = useState(false)
  const [awayTime, setAwayTime] = useState(0)

  const handleAway = () => {
    setStatus("away")
    setAwayTime(20)
  }

  const handleBack = () => {
    setStatus("occupied")
    setAwayTime(0)
  }

  const handleLeave = () => {
    navigate("/map")
  }

  const handleStillHereYes = () => {
    setShowStillHere(false)
    setStatus("occupied")
  }

  const handleStillHereNo = () => {
    setShowStillHere(false)
    navigate("/map")
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar role="student" />

      <div className="max-w-lg mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              status === "occupied"
                ? "bg-green-500/10 border-2 border-green-500/40"
                : "bg-yellow-500/10 border-2 border-yellow-500/40"
            }`}
          >
            <span className="text-4xl">🪑</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Seat {seatId}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${
                status === "occupied" ? "bg-green-400" : "bg-yellow-400"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                status === "occupied" ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {status === "occupied" ? "Active Session" : "Away Mode"}
            </span>
          </div>
        </div>

        {/* Session Info Card */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 mb-6">
          <div className="space-y-4">

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Seat</span>
              <span className="text-white font-semibold">{seatId}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Zone</span>
              <span className="text-white font-semibold">Ground Floor</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Checked In</span>
              <span className="text-white font-semibold">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Session Timer</span>
              <span className="text-green-400 font-semibold">2:00:00</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Status</span>
              <span
                className={`font-semibold px-3 py-1 rounded-full text-xs ${
                  status === "occupied"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                }`}
              >
                {status === "occupied" ? "Occupied" : "Away"}
              </span>
            </div>

          </div>
        </div>

        {/* Away Mode Banner */}
        {status === "away" && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-xl">⏸</span>
              <div>
                <p className="text-yellow-400 font-semibold text-sm">
                  Away Mode Active
                </p>
                <p className="text-yellow-500/70 text-xs mt-1">
                  Your seat is held for 20 minutes. Come back before time runs
                  out or your seat will be released.
                </p>
                <p className="text-yellow-400 font-bold text-sm mt-2">
                  ~{awayTime} min remaining
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">

          {status === "occupied" ? (
            <button
              onClick={handleAway}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              <span>⏸</span> Mark as Away (max 20 min)
            </button>
          ) : (
            <button
              onClick={handleBack}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              <span>✅</span> I'm Back!
            </button>
          )}

          <button
            onClick={() => setShowStillHere(true)}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 rounded-xl transition border border-gray-600 flex items-center justify-center gap-2"
          >
            <span>⏰</span> Simulate "Still Here?" Prompt
          </button>

          <button
            onClick={handleLeave}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold py-3 rounded-xl transition border border-red-500/30 flex items-center justify-center gap-2"
          >
            <span>🚪</span> Leave Seat
          </button>

        </div>

        {/* Info Note */}
        <p className="text-center text-gray-600 text-xs mt-6">
          You will be asked "Still here?" every 2 hours. <br />
          No response = seat auto-released.
        </p>

      </div>

      {/* Still Here Popup */}
      {showStillHere && (
        <StillHerePopup
          seatId={seatId}
          onYes={handleStillHereYes}
          onNo={handleStillHereNo}
        />
      )}

    </div>
  )
}

export default ActiveSession