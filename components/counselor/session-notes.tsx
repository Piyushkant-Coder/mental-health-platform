"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Search, FileText, Calendar, User, Plus, Save, Edit } from "lucide-react"

interface SessionNote {
  id: string
  student: string
  date: string
  sessionType: string
  duration: string
  notes: string
  goals: string[]
  nextSteps: string
  status: "draft" | "completed"
}

export function SessionNotes() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNote, setSelectedNote] = useState<SessionNote | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const sessionNotes: SessionNote[] = [
    {
      id: "1",
      student: "Alex Johnson",
      date: "2024-01-20",
      sessionType: "Individual Session",
      duration: "50 min",
      notes:
        "Student reported significant improvement in managing test anxiety. Practiced deep breathing exercises during session. Discussed upcoming midterm exams and strategies for preparation without overwhelming stress.",
      goals: ["Reduce test anxiety", "Improve study habits"],
      nextSteps: "Continue practicing breathing techniques. Schedule follow-up before midterms.",
      status: "completed",
    },
    {
      id: "2",
      student: "Sarah Chen",
      date: "2024-01-19",
      sessionType: "Follow-up",
      duration: "30 min",
      notes:
        "Excellent progress with sleep hygiene routine. Student reports falling asleep within 15 minutes consistently. Energy levels improved significantly.",
      goals: ["Establish sleep routine", "Improve energy levels"],
      nextSteps: "Maintain current routine. Discuss time management strategies next session.",
      status: "completed",
    },
    {
      id: "3",
      student: "Michael Rodriguez",
      date: "2024-01-18",
      sessionType: "Crisis Intervention",
      duration: "60 min",
      notes: "",
      goals: ["Assess current mental state", "Develop safety plan"],
      nextSteps: "",
      status: "draft",
    },
  ]

  const filteredNotes = sessionNotes.filter((note) => note.student.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push("/counselor/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Session Notes</h1>
            <p className="text-muted-foreground">Document and manage counseling session records</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notes List */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            {filteredNotes.map((note) => (
              <Card
                key={note.id}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  selectedNote?.id === note.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => {
                  setSelectedNote(note)
                  setIsEditing(false)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{note.student}</h3>
                    <Badge variant={note.status === "completed" ? "secondary" : "destructive"}>{note.status}</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(note.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>
                        {note.sessionType} • {note.duration}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Note Details/Editor */}
          <div className="lg:col-span-2">
            {selectedNote ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {selectedNote.student}
                      </CardTitle>
                      <CardDescription>
                        {selectedNote.sessionType} • {new Date(selectedNote.date).toLocaleDateString()} •{" "}
                        {selectedNote.duration}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {!isEditing ? (
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      ) : (
                        <Button onClick={() => setIsEditing(false)}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Session Goals */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Session Goals</label>
                    {isEditing ? (
                      <Input placeholder="Add goals..." />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {selectedNote.goals.map((goal, index) => (
                          <Badge key={index} variant="outline">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Session Notes */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Session Notes</label>
                    {isEditing ? (
                      <Textarea placeholder="Document session details..." rows={8} defaultValue={selectedNote.notes} />
                    ) : (
                      <div className="p-3 bg-muted rounded-lg">
                        {selectedNote.notes || (
                          <span className="text-muted-foreground italic">No notes added yet...</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Next Steps */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Next Steps</label>
                    {isEditing ? (
                      <Textarea placeholder="Plan for next session..." rows={3} defaultValue={selectedNote.nextSteps} />
                    ) : (
                      <div className="p-3 bg-muted rounded-lg">
                        {selectedNote.nextSteps || (
                          <span className="text-muted-foreground italic">No next steps defined...</span>
                        )}
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-4 border-t">
                      <Button className="flex-1">Save as Draft</Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Complete Note
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Session Note</h3>
                  <p className="text-muted-foreground">Choose a session note to view or edit documentation.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
