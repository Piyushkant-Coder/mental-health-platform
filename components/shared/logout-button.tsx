"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface LogoutButtonProps {
  userRole?: "student" | "counselor" | "admin"
  variant?: "ghost" | "outline" | "default"
  size?: "sm" | "default" | "lg" | "icon"
  showText?: boolean
}

export function LogoutButton({ userRole, variant = "ghost", size = "icon", showText = false }: LogoutButtonProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      // Simulate logout process
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Clear any stored authentication data
      localStorage.removeItem("authToken")
      sessionStorage.clear()

      window.location.href = "/"
    } catch (error) {
      console.error("Logout failed:", error)
      setIsLoggingOut(false)
    }
  }

  const getRoleSpecificMessage = () => {
    switch (userRole) {
      case "student":
        return "You will be logged out of your student account. Any unsaved progress will be lost."
      case "counselor":
        return "You will be logged out of your counselor portal. Make sure all session notes are saved."
      case "admin":
        return "You will be logged out of the admin dashboard. Ensure all system changes are saved."
      default:
        return "You will be logged out of your account. Any unsaved changes will be lost."
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={isLoggingOut}
          className={showText ? "w-full justify-start" : ""}
        >
          <LogOut className="h-4 w-4" />
          {showText && <span className="ml-2">Logout</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>{getRoleSpecificMessage()}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? "Logging out..." : "Logout"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
