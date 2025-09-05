import { useState, useEffect } from "react"

export function useCurrentUser() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://localhost:4000/api/users/me", { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch user")
        return res.json()
      })
      .then(data => {
        setUser(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { user, loading, error }
}
