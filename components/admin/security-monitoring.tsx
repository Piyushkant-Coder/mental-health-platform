"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Lock, Activity, Eye } from "lucide-react"

export function SecurityMonitoring() {
  const securityAlerts = [
    {
      id: 1,
      type: "warning",
      title: "Multiple Failed Login Attempts",
      description: "User alex.johnson@university.edu - 5 failed attempts in 10 minutes",
      time: "2 hours ago",
      severity: "medium",
    },
    {
      id: 2,
      type: "info",
      title: "New Admin Login",
      description: "Admin user logged in from new IP address: 192.168.1.100",
      time: "4 hours ago",
      severity: "low",
    },
    {
      id: 3,
      type: "success",
      title: "Security Scan Completed",
      description: "Weekly vulnerability scan completed - No issues found",
      time: "1 day ago",
      severity: "low",
    },
  ]

  const systemHealth = {
    encryption: { status: "active", description: "All data encrypted at rest and in transit" },
    authentication: { status: "secure", description: "Multi-factor authentication enabled" },
    backups: { status: "current", description: "Last backup: 2 hours ago" },
    monitoring: { status: "active", description: "Real-time threat monitoring enabled" },
  }

  const accessLogs = [
    {
      id: 1,
      user: "Dr. Sarah Johnson",
      action: "Accessed patient records",
      ip: "192.168.1.45",
      time: "10:30 AM",
      status: "success",
    },
    {
      id: 2,
      user: "Alex Johnson",
      action: "Login attempt",
      ip: "10.0.0.123",
      time: "10:15 AM",
      status: "failed",
    },
    {
      id: 3,
      user: "Admin User",
      action: "System configuration change",
      ip: "192.168.1.100",
      time: "09:45 AM",
      status: "success",
    },
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

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-yellow-200 bg-yellow-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "secure":
      case "current":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Security Monitoring</h1>
            <p className="text-muted-foreground">Monitor platform security and system health</p>
          </div>
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">Secure</p>
                <p className="text-sm text-muted-foreground">System Status</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">256-bit</p>
                <p className="text-sm text-muted-foreground">Encryption</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-muted-foreground">Monitoring</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Security Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Security Alerts</CardTitle>
              <CardDescription>Recent security events and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 border rounded-lg ${getAlertColor(alert.severity)}`}>
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                View All Alerts
              </Button>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Security system status and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(systemHealth).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3 p-3 border rounded-lg">
                  {getStatusIcon(value.status)}
                  <div className="flex-1">
                    <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Access Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Access Logs</CardTitle>
            <CardDescription>User activity and system access records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {accessLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${log.status === "success" ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <div>
                      <p className="font-medium">{log.user}</p>
                      <p className="text-sm text-muted-foreground">{log.action}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{log.time}</p>
                    <p>IP: {log.ip}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View Full Access Log
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
