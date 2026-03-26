
import { Navigate, Route, Routes } from "react-router"
import ActiveSession from "./pages/ActiveSession"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import PostSessionReview from "./pages/PostSessionReview"
import SignUp from "./pages/SignUp"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/session/active" element={<ActiveSession />} />
      <Route path="/session/review" element={<PostSessionReview />} />
    </Routes>
  )
}

export default App
