export const seats = [
  // Row A
  { id: "A1", row: "A", col: 1, status: "free", tags: ["Window", "Outlet"] },
  { id: "A2", row: "A", col: 2, status: "occupied", tags: ["Window"] },
  { id: "A3", row: "A", col: 3, status: "away", tags: ["Outlet"] },
  { id: "A4", row: "A", col: 4, status: "free", tags: ["Computer Desk"] },
  { id: "A5", row: "A", col: 5, status: "abandoned", tags: ["Quiet Zone"] },

  // Row B
  { id: "B1", row: "B", col: 1, status: "occupied", tags: ["Quiet Zone"] },
  { id: "B2", row: "B", col: 2, status: "free", tags: ["Outlet"] },
  { id: "B3", row: "B", col: 3, status: "free", tags: ["Window", "Outlet"] },
  { id: "B4", row: "B", col: 4, status: "occupied", tags: ["Group Study"] },
  { id: "B5", row: "B", col: 5, status: "away", tags: ["Window"] },

  // Row C
  { id: "C1", row: "C", col: 1, status: "free", tags: ["Outlet"] },
  { id: "C2", row: "C", col: 2, status: "abandoned", tags: ["Computer Desk"] },
  { id: "C3", row: "C", col: 3, status: "free", tags: ["Quiet Zone", "Window", "Outlet"], recommended: true },
  { id: "C4", row: "C", col: 4, status: "free", tags: ["Window"] },
  { id: "C5", row: "C", col: 5, status: "free", tags: ["Quiet Zone"] },

  // Row D
  { id: "D1", row: "D", col: 1, status: "away", tags: ["Group Study"] },
  { id: "D2", row: "D", col: 2, status: "free", tags: ["Outlet"] },
  { id: "D3", row: "D", col: 3, status: "free", tags: ["Window"] },
  { id: "D4", row: "D", col: 4, status: "abandoned", tags: ["Computer Desk"] },
  { id: "D5", row: "D", col: 5, status: "occupied", tags: ["Accessible"] },
]

export const seatColors = {
  free: "#22c55e",
  occupied: "#ef4444",
  away: "#eab308",
  abandoned: "#6b7280",
}

export const getStats = (seats) => ({
  total: seats.length,
  free: seats.filter(s => s.status === "free").length,
  occupied: seats.filter(s => s.status === "occupied").length,
  away: seats.filter(s => s.status === "away").length,
  abandoned: seats.filter(s => s.status === "abandoned").length,
})