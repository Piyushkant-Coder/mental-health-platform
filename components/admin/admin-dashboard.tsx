"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  Calendar,
  Activity,
  Shield,
  Bell,
  User,
  LogOut,
  Heart,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export function AdminDashboard() {
  const platformStats = [
    { label: "Total Users", value: "1,247", change: "+12%", icon: Users, trend: "up" },
    { label: "Active Sessions", value: "89", change: "+5%", icon: Activity, trend: "up" },
    { label: "This Month", value: "2,156", change: "+18%", icon: Calendar, trend: "up" },
    { label: "System Health", value: "99.9%", change: "Stable", icon: Shield, trend: "stable" },
  ]

  const recentAlerts = [
    {
      id: 1,
      type: "warning",
      message: "High session volume detected - consider scaling resources",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "info",
      message: "Weekly backup completed successfully",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "success",
      message: "New counselor Dr. Martinez onboarded",
      time: "2 days ago",
    },
  ]

  const userBreakdown = [
    { role: "Students", count: 1089, percentage: 87 },
    { role: "Counselors", count: 142, percentage: 11 },
    { role: "Admins", count: 16, percentage: 2 },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Activity className="h-4 w-4 text-blue-600" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "success":
        return "border-green-200 bg-green-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">MindCare Platform - Admin Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Platform Overview</h2>
          <p className="text-muted-foreground">Monitor and manage the MindCare mental health platform.</p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {platformStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                    <span className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-muted-foreground"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Link href="/admin/users">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">User Management</h3>
                  <p className="text-sm text-muted-foreground">Manage accounts</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Analytics</h3>
                  <p className="text-sm text-muted-foreground">Platform insights</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/security">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Security</h3>
                  <p className="text-sm text-muted-foreground">System monitoring</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/settings">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Settings</h3>
                  <p className="text-sm text-muted-foreground">Platform config</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent platform notifications and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 border rounded-lg ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                View All Alerts
              </Button>
            </CardContent>
          </Card>

          {/* User Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Platform user breakdown by role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userBreakdown.map((user, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{user.role}</span>
                    <span className="text-sm text-muted-foreground">{user.count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${user.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                Detailed User Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
