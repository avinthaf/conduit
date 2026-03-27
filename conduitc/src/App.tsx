
import { Navigate, Route, Routes } from "react-router"
import ActiveSession from "./pages/ActiveSession"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import PostSessionReview from "./pages/PostSessionReview"
import SignUp from "./pages/SignUp"
import { ProtectedRoute } from "./context/AuthContext"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/session/active" element={<ActiveSession />} />
        <Route path="/session/review" element={<PostSessionReview />} />
      </Route>
    </Routes>
  )
}

export default App
