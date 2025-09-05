"use client"

import { LoginForm } from "@/components/auth/login-form"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] HomePage component mounted - showing login page")
    if (window.location.pathname !== "/") {
      console.log("[v0] Redirecting from", window.location.pathname, "to root")
      router.replace("/")
    }
    localStorage.removeItem("userRole")
    localStorage.removeItem("isLoggedIn")
    sessionStorage.clear()
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">MindCare Platform</h1>
          <p className="text-muted-foreground">Your trusted mental health support system</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
