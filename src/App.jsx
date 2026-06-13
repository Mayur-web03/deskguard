import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import LibraryMap from "./pages/LibraryMap"
import ActiveSession from "./pages/ActiveSession"
import LibrarianDashboard from "./pages/LibrarianDashboard"
import GlowCursor from "./components/GlowCursor"
function App() {
  return (
    <>
    <GlowCursor />
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Student */}
        <Route path="/map" element={<LibraryMap />} />
        <Route path="/session/:seatId" element={<ActiveSession />} />

        {/* Librarian */}
        <Route path="/librarian" element={<LibrarianDashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App