import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase" // <-- import your firebase instance
import { toast } from "react-hot-toast"

function PrivateRoute({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    // cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div> // or spinner
  }

  if (user) {
    return children
  } else {
    if (sessionStorage.getItem("justSignedOut") !== "true") {
      toast.error("You must be logged in to access this page");
    } else {
      // Clear flag so toast doesn't persist
      sessionStorage.removeItem("justSignedOut");
    }
    return <Navigate to="/" state={{ fromPrivateRoute: true }} />;
  }
}

export default PrivateRoute
