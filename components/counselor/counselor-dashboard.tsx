"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Clock, Heart, FileText, MessageCircle } from "lucide-react"
import Link from "next/link"
import { NotificationCenter } from "@/components/shared/notification-center"
import { UserMenu } from "@/components/shared/user-menu"
import { useCurrentUser } from "@/hooks/use-current-user"

export function CounselorDashboard() {
  const { user, loading, error } = useCurrentUser();

  const todayAppointments = [
    {
      id: 1,
      student: "Alex Johnson",
      time: "9:00 AM",
      type: "Individual Session",
      status: "upcoming",
      duration: "50 min",
    },
    {
      id: 2,
      student: "Sarah Chen",
      time: "11:00 AM",
      type: "Follow-up",
      status: "upcoming",
      duration: "30 min",
    },
    {
      id: 3,
      student: "Michael Rodriguez",
      time: "2:00 PM",
      type: "Initial Consultation",
      status: "upcoming",
      duration: "60 min",
    },
  ]

  const recentCases = [
    {
      id: 1,
      student: "Emma Wilson",
      lastSession: "Yesterday",
      nextSession: "Friday, 3:00 PM",
      priority: "medium",
      notes: "Making good progress with anxiety management techniques",
    },
    {
      id: 2,
      student: "David Kim",
      lastSession: "2 days ago",
      nextSession: "Monday, 10:00 AM",
      priority: "high",
      notes: "Requires follow-up on sleep schedule improvements",
    },
  ]

  const stats = [
    { label: "Today's Sessions", value: "3", icon: Calendar },
    { label: "Active Cases", value: "12", icon: Users },
    { label: "This Week", value: "18", icon: Clock },
    { label: "Pending Notes", value: "2", icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">MindCare Platform - Counselor Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter userRole={user?.role || "counselor"} />
            {user && <UserMenu user={user} />}
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back, Dr. Johnson</h2>
          <p className="text-muted-foreground">Here's your counseling schedule and case overview for today.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Link href="/counselor/appointments">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Appointments</h3>
                  <p className="text-sm text-muted-foreground">Manage schedule</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/counselor/cases">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Case Management</h3>
                  <p className="text-sm text-muted-foreground">Student records</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/counselor/notes">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Session Notes</h3>
                  <p className="text-sm text-muted-foreground">Documentation</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/counselor/messages">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Messages</h3>
                  <p className="text-sm text-muted-foreground">Student communication</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your appointments for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{appointment.student}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.time} • {appointment.duration}
                    </p>
                    <Badge variant="secondary" className="mt-1">
                      {appointment.type}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm">Start Session</Button>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                View Full Schedule
              </Button>
            </CardContent>
          </Card>

          {/* Recent Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Active Cases</CardTitle>
              <CardDescription>Students requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCases.map((case_) => (
                <div key={case_.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{case_.student}</h4>
                    <Badge variant={case_.priority === "high" ? "destructive" : "secondary"}>
                      {case_.priority} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{case_.notes}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Last: {case_.lastSession}</span>
                    <span>Next: {case_.nextSession}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                View All Cases
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
