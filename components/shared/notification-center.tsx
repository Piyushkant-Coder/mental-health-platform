"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, MessageCircle, Bot, CheckCircle, X, Clock, UserCheck, AlertTriangle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Notification {
  id: string
  type: "appointment" | "forum" | "ai-chat" | "system" | "counselor" | "reminder"
  title: string
  message: string
  time: string
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
}

interface NotificationCenterProps {
  userRole: "student" | "counselor" | "admin"
}

export function NotificationCenter({ userRole }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "appointment",
      title: "Upcoming Session",
      message: "Your session with Dr. Sarah Johnson starts in 30 minutes",
      time: "30 min ago",
      read: false,
      priority: "high",
      actionUrl: "/student/booking",
    },
    {
      id: "2",
      type: "forum",
      title: "New Forum Reply",
      message: "Alex replied to your post 'Managing exam stress during finals week'",
      time: "2 hours ago",
      read: false,
      priority: "medium",
      actionUrl: "/student/forum",
    },
    {
      id: "3",
      type: "counselor",
      title: "Session Notes Available",
      message: "Dr. Johnson has added notes from your last session",
      time: "1 day ago",
      read: false,
      priority: "medium",
      actionUrl: "/student/booking",
    },
    {
      id: "4",
      type: "ai-chat",
      title: "AI Mitr Daily Check-in",
      message: "How are you feeling today? I noticed you haven't checked in recently",
      time: "1 day ago",
      read: true,
      priority: "low",
      actionUrl: "/student/ai-chat",
    },
    {
      id: "5",
      type: "forum",
      title: "Post Liked",
      message: "Your post about 'Mindfulness techniques' received 5 new likes",
      time: "2 days ago",
      read: true,
      priority: "low",
      actionUrl: "/student/forum",
    },
    {
      id: "6",
      type: "reminder",
      title: "PHQ-9 Assessment Due",
      message: "Your monthly mental health screening is due. Complete it now.",
      time: "3 days ago",
      read: false,
      priority: "high",
      actionUrl: "/student/screening",
    },
    {
      id: "7",
      type: "system",
      title: "Profile Updated",
      message: "Your emergency contact information has been successfully updated",
      time: "1 week ago",
      read: true,
      priority: "low",
      actionUrl: "/profile",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate receiving new notifications occasionally
      if (Math.random() < 0.1) {
        // 10% chance every 30 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: "ai-chat",
          title: "AI Mitr Check-in",
          message: "I'm here if you need someone to talk to today",
          time: "Just now",
          read: false,
          priority: "low",
          actionUrl: "/student/ai-chat",
        }
        setNotifications((prev) => [newNotification, ...prev])
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-4 w-4 text-primary" />
      case "forum":
        return <MessageCircle className="h-4 w-4 text-blue-600" />
      case "ai-chat":
        return <Bot className="h-4 w-4 text-green-600" />
      case "counselor":
        return <UserCheck className="h-4 w-4 text-purple-600" />
      case "reminder":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      default:
        return "secondary"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
            </div>
            <CardDescription>{unreadCount} unread notifications</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b hover:bg-muted/50 transition-colors cursor-pointer ${
                        !notification.read ? "bg-primary/5" : ""
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium truncate">{notification.title}</h4>
                            {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    markAsRead(notification.id)
                                  }}
                                  className="h-6 px-2 text-xs"
                                >
                                  <CheckCircle className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeNotification(notification.id)
                                }}
                                className="h-6 px-2 text-xs"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="p-3 border-t">
                <Button variant="outline" className="w-full bg-transparent" size="sm">
                  View All Notifications
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
