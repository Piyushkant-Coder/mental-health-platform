"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, User, Calendar, FileText, AlertTriangle, TrendingUp, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StudentCase {
  id: string
  student: string
  email: string
  startDate: string
  lastSession: string
  nextSession: string
  totalSessions: number
  priority: "low" | "medium" | "high"
  status: "active" | "on-hold" | "completed"
  primaryConcerns: string[]
  progress: "excellent" | "good" | "fair" | "needs-attention"
  notes: string
}

export function CaseManagement() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedCase, setSelectedCase] = useState<StudentCase | null>(null)

  const cases: StudentCase[] = [
    {
      id: "1",
      student: "Alex Johnson",
      email: "alex.johnson@university.edu",
      startDate: "2024-01-15",
      lastSession: "2024-01-20",
      nextSession: "2024-01-27",
      totalSessions: 8,
      priority: "medium",
      status: "active",
      primaryConcerns: ["Anxiety", "Academic Stress"],
      progress: "good",
      notes:
        "Student showing consistent improvement in managing test anxiety. Continues to practice breathing techniques learned in sessions.",
    },
    {
      id: "2",
      student: "Sarah Chen",
      email: "sarah.chen@university.edu",
      startDate: "2024-01-10",
      lastSession: "2024-01-19",
      nextSession: "2024-01-26",
      totalSessions: 12,
      priority: "low",
      status: "active",
      primaryConcerns: ["Sleep Issues", "Time Management"],
      progress: "excellent",
      notes:
        "Excellent progress with sleep hygiene. Student has established consistent bedtime routine and reports improved energy levels.",
    },
    {
      id: "3",
      student: "Michael Rodriguez",
      email: "michael.rodriguez@university.edu",
      startDate: "2024-01-08",
      lastSession: "2024-01-18",
      nextSession: "2024-01-25",
      totalSessions: 15,
      priority: "high",
      status: "active",
      primaryConcerns: ["Depression", "Social Isolation"],
      progress: "needs-attention",
      notes:
        "Student missed last two sessions. Requires immediate follow-up to assess current mental state and provide additional support.",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-yellow-100 text-yellow-800"
      case "needs-attention":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredCases = cases.filter((case_) => {
    const matchesSearch = case_.student.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = priorityFilter === "all" || case_.priority === priorityFilter
    return matchesSearch && matchesPriority
  })

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push("/counselor/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Case Management</h1>
            <p className="text-muted-foreground">Manage student cases and track progress</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cases List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by student name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Cases */}
            {filteredCases.map((case_) => (
              <Card
                key={case_.id}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  selectedCase?.id === case_.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedCase(case_)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{case_.student}</h3>
                      <p className="text-sm text-muted-foreground">{case_.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getPriorityColor(case_.priority)}>{case_.priority} priority</Badge>
                      <Badge className={getProgressColor(case_.progress)}>{case_.progress}</Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {case_.primaryConcerns.map((concern, index) => (
                      <Badge key={index} variant="outline">
                        {concern}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Last: {new Date(case_.lastSession).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Next: {new Date(case_.nextSession).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{case_.totalSessions} sessions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>Since {new Date(case_.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Case Details */}
          <div className="space-y-4">
            {selectedCase ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {selectedCase.student}
                    </CardTitle>
                    <CardDescription>Case Details & Progress</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Primary Concerns</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedCase.primaryConcerns.map((concern, index) => (
                          <Badge key={index} variant="outline">
                            {concern}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Progress Status</label>
                      <Badge className={`${getProgressColor(selectedCase.progress)} mt-1`}>
                        {selectedCase.progress}
                      </Badge>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Session Count</label>
                      <p className="text-sm text-muted-foreground">{selectedCase.totalSessions} sessions completed</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Latest Notes</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedCase.notes}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Schedule Session
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Add Note
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      View Session History
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Reschedule Appointment
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Flag for Review
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Case</h3>
                  <p className="text-muted-foreground">Choose a student case to view details and manage progress.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
