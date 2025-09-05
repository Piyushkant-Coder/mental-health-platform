"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Heart, Shield, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type UserRole = "student" | "counselor" | "admin"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("student")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    console.log("[v0] LoginForm mounted with role:", role)
    // Ensure role is always student by default
    setRole("student")
    // Clear any form auto-fill that might set role to counselor
    const timer = setTimeout(() => {
      if (role !== "student") {
        console.log("[v0] Resetting role from", role, "to student")
        setRole("student")
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Login failed")
      setError("")
      // Optionally save token: localStorage.setItem("token", data.token)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }

    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    console.log("[v0] Form submitted with role:", role)

    // Simulate authentication
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      localStorage.setItem("userRole", role)
      localStorage.setItem("isLoggedIn", "true")

      // Redirect based on role
      switch (role) {
        case "student":
          console.log("[v0] Redirecting to student dashboard")
          window.location.href = "/student/dashboard"
          break
        case "counselor":
          console.log("[v0] Redirecting to counselor dashboard")
          window.location.href = "/counselor/dashboard"
          break
        case "admin":
          console.log("[v0] Redirecting to admin dashboard")
          window.location.href = "/admin/dashboard"
          break
        default:
          console.log("[v0] Default redirect to student dashboard")
          window.location.href = "/student/dashboard"
          break
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleIcon = (roleType: UserRole) => {
    switch (roleType) {
      case "student":
        return <Heart className="h-4 w-4" />
      case "counselor":
        return <Users className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
    }
  }

  const getRoleDescription = (roleType: UserRole) => {
    switch (roleType) {
      case "student":
        return "Access resources, book appointments, and connect with support"
      case "counselor":
        return "Manage appointments and provide student support"
      case "admin":
        return "Oversee platform operations and user management"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">Sign in to your MindCare account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">I am a</Label>
            <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">
                  <div className="flex items-center gap-2">
                    {getRoleIcon("student")}
                    <span>Student</span>
                  </div>
                </SelectItem>
                <SelectItem value="counselor">
                  <div className="flex items-center gap-2">
                    {getRoleIcon("counselor")}
                    <span>Counselor</span>
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    {getRoleIcon("admin")}
                    <span>Administrator</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">{getRoleDescription(role)}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center text-sm space-y-2">
          <div>
            <span className="text-muted-foreground">Don't have an account? </span>
            <Button variant="link" className="p-0 h-auto" onClick={() => (window.location.href = "/register")}>
              Sign up here
            </Button>
          </div>
          <div>
            <span className="text-muted-foreground">Need help? </span>
            <Button variant="link" className="p-0 h-auto">
              Contact Support
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
