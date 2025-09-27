import { useState } from "react"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate,Link} from "react-router-dom"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleReset = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    if (!email) {
      setError("Please enter your email.")
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      setMessage("✅ Password reset link sent! Check your inbox.")
      setTimeout(() => navigate("/login"), 3000) // redirect after 3s
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.")
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {message && <p className="text-green-500 mb-4 text-sm">{message}</p>}

        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder=" Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  )
}
