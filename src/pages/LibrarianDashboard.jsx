import { useState } from "react"
import { seats as initialSeats, getStats } from "../data/seats"
import Navbar from "../components/Navbar"
import StatCard from "../components/StatCard"
import SeatMap from "../components/SeatMap"
import HeatMap from "../components/HeatMap"

function LibrarianDashboard() {
  const [seats, setSeats] = useState(initialSeats)
  const [activeTab, setActiveTab] = useState("overview") // overview | map

  const stats = getStats(seats)

  const abandonedSeats = seats.filter((s) => s.status === "abandoned")
  const occupiedSeats = seats.filter((s) => s.status === "occupied")
  const awaySeats = seats.filter((s) => s.status === "away")

  const handleReset = (seatId) => {
    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === seatId ? { ...seat, status: "free" } : seat
      )
    )
  }

  const handleResetAll = () => {
    setSeats((prev) =>
      prev.map((seat) =>
        seat.status === "abandoned" ? { ...seat, status: "free" } : seat
      )
    )
  }

  const handleCheckin = (seatId) => {
  setSeats((prev) =>
    prev.map((seat) =>
      seat.id === seatId
        ? { ...seat, status: "occupied" }
        : seat
    )
  )
}

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar role="librarian" />

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Library Operations Center
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Real-time occupancy monitoring and smart seat management
            </p>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 px-4 py-2 rounded-xl">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-medium">
              Live Monitoring
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-5">
            <p className="text-gray-400 text-xs">Occupancy Rate</p>
            <h2 className="text-3xl font-bold text-blue-400">
              {Math.round((stats.occupied / stats.total) * 100)}%
            </h2>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-5">
            <p className="text-gray-400 text-xs">Available Seats</p>
            <h2 className="text-3xl font-bold text-green-400">
              {stats.free}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-5">
            <p className="text-gray-400 text-xs">Alerts</p>
            <h2 className="text-3xl font-bold text-red-400">
              {stats.abandoned}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-5">
            <p className="text-gray-400 text-xs">Peak Hour</p>
            <h2 className="text-3xl font-bold text-purple-400">
              1 PM
            </h2>
          </div>

        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 mb-8">

  <div className="flex justify-between mb-2">
    <span className="text-sm text-gray-400">
      Current Occupancy
    </span>

    <span className="text-green-400 font-semibold">
      {Math.round((stats.occupied / stats.total) * 100)}%
    </span>
  </div>

  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
      style={{
        width: `${(stats.occupied / stats.total) * 100}%`,
      }}
    />
  </div>
      <p className="text-xs text-gray-500 mt-2">
  Updated 15 seconds ago
</p>
</div>


  <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 mb-6">

  <h3 className="text-white font-semibold mb-4">
    📡 Recent Activity
  </h3>

  <div className="space-y-3 text-sm">

    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-red-400 rounded-full" />
      <span className="text-gray-300">
        11:20 AM • Seat A2 marked abandoned
      </span>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-green-400 rounded-full" />
      <span className="text-gray-300">
        11:24 AM • Librarian freed seat C2
      </span>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-blue-400 rounded-full" />
      <span className="text-gray-300">
        11:29 AM • Student checked into B3
      </span>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
      <span className="text-gray-300">
        11:35 AM • Seat D1 moved to away status
      </span>
    </div>

  </div>

</div>
<div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-5 mb-6">


  <div className="flex items-center gap-2">
    <span>🤖</span>

    <div>
      <p className="text-green-400 font-semibold">
        AI Prediction
      </p>

      <p className="text-gray-400 text-sm">
        Peak crowd expected at 1 PM.
        Recommended intervention: free abandoned seats before rush hour.
      </p>
    </div>
  </div>

</div>
<div className="mb-8">
  <HeatMap />
</div>
        {/* Tabs */}
        <div className="flex bg-gray-900 border border-gray-700 rounded-xl p-1 mb-6 w-fit">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "overview"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "map"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Live Map
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">

            {/* Abandoned Seats Table */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span>⚠️</span>
                  <h3 className="text-white font-semibold">Abandoned Seats</h3>
                  <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                    {abandonedSeats.length}
                  </span>
                </div>
                {abandonedSeats.length > 0 && (
                  <button
                    onClick={handleResetAll}
                    className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg transition"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {abandonedSeats.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl">✅</span>
                  <p className="text-gray-500 text-sm mt-2">
                    No abandoned seats right now
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left text-gray-500 font-medium pb-3">
                          Seat ID
                        </th>
                        <th className="text-left text-gray-500 font-medium pb-3">
                          Row
                        </th>
                        <th className="text-left text-gray-500 font-medium pb-3">
                          Since
                        </th>
                        <th className="text-left text-gray-500 font-medium pb-3">
                          Status
                        </th>
                        <th className="text-right text-gray-500 font-medium pb-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {abandonedSeats.map((seat) => (
                        <tr key={seat.id}>
                          <td className="py-3 text-white font-medium">
                            {seat.id}
                          </td>
                          <td className="py-3 text-gray-400">Row {seat.row}</td>
                          <td className="py-3 text-gray-400">~2 hrs ago</td>
                          <td className="py-3">
                            <span className="bg-gray-500/20 text-gray-400 border border-gray-500/30 px-2 py-0.5 rounded-full text-xs">
                              Abandoned
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => handleReset(seat.id)}
                              className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-lg text-xs transition"
                            >
                              Free Seat
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Occupied Seats Table */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span>🔴</span>
                <h3 className="text-white font-semibold">Occupied Seats</h3>
                <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                  {occupiedSeats.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-gray-500 font-medium pb-3">
                        Seat ID
                      </th>
                      <th className="text-left text-gray-500 font-medium pb-3">
                        Row
                      </th>
                      <th className="text-left text-gray-500 font-medium pb-3">
                        Since
                      </th>
                      <th className="text-left text-gray-500 font-medium pb-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {occupiedSeats.map((seat) => (
                      <tr key={seat.id}>
                        <td className="py-3 text-white font-medium">
                          {seat.id}
                        </td>
                        <td className="py-3 text-gray-400">Row {seat.row}</td>
                        <td className="py-3 text-gray-400">~45 min ago</td>
                        <td className="py-3">
                          <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full text-xs">
                            Occupied
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Away Seats Table */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span>🟡</span>
                <h3 className="text-white font-semibold">Away Seats</h3>
                <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                  {awaySeats.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-gray-500 font-medium pb-3">
                        Seat ID
                      </th>
                      <th className="text-left text-gray-500 font-medium pb-3">
                        Row
                      </th>
                      <th className="text-left text-gray-500 font-medium pb-3">
                        Away Since
                      </th>
                      <th className="text-left text-gray-500 font-medium pb-3">
                        Time Left
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {awaySeats.map((seat) => (
                      <tr key={seat.id}>
                        <td className="py-3 text-white font-medium">
                          {seat.id}
                        </td>
                        <td className="py-3 text-gray-400">Row {seat.row}</td>
                        <td className="py-3 text-gray-400">~10 min ago</td>
                        <td className="py-3 text-yellow-400 font-medium">
                          ~10 min
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Map Tab */}
        {activeTab === "map" && (
          <div className="space-y-6">

            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-2">
                Live Library View
              </h3>

              <p className="text-gray-500 text-sm">
                Real-time monitoring of seat occupancy.
              </p>
            </div>

            <SeatMap
              seats={seats}
              onCheckin={handleCheckin}
            />

          </div>
        )}

      </div>
    </div>
  )
}

export default LibrarianDashboard