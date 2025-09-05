"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, HelpCircle } from "lucide-react"
import Link from "next/link"
import { LogoutButton } from "./logout-button"

interface UserMenuProps {
  user: {
    name: string
    email: string
    role: "student" | "counselor" | "admin"
    avatar?: string
  }
}

export function UserMenu({ user }: UserMenuProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-red-600"
      case "counselor":
        return "text-blue-600"
      case "student":
        return "text-green-600"
      default:
        return "text-muted-foreground"
    }
  }

  // Return DropdownMenu JSX directly
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full transition-colors hover:bg-green-600 hover:text-white"
        >
          <Avatar className="h-10 w-10">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name || "User"} />
            ) : null}
            <AvatarFallback>{getInitials(user.name || "U")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email || "No email"}</p>
            <p className={`text-xs leading-none capitalize ${getRoleColor(user.role)}`}>{user.role || "user"}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <LogoutButton userRole={user.role || "user"} variant="ghost" showText={true} size="sm" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
