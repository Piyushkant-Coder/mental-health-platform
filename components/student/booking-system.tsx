"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Counselor {
  id: string
  name: string
  specialty: string
  rating: number
  availability: string[]
}

interface Appointment {
  id: string
  counselor: string
  date: string
  time: string
  type: string
  status: "upcoming" | "completed" | "cancelled"
}

export function BookingSystem() {
  const router = useRouter()
  const [selectedCounselor, setSelectedCounselor] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      counselor: "Dr. Sarah Johnson",
      date: "Today",
      time: "2:00 PM",
      type: "Individual Session",
      status: "upcoming",
    },
    {
      id: "2",
      counselor: "Dr. Michael Chen",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "Group Therapy",
      status: "upcoming",
    },
  ])

  const counselors: Counselor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Anxiety & Depression",
      rating: 4.9,
      availability: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Academic Stress",
      rating: 4.8,
      availability: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"],
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Relationship Issues",
      rating: 4.9,
      availability: ["8:00 AM", "12:00 PM", "2:00 PM", "6:00 PM"],
    },
  ]

  const handleBooking = () => {
    if (!selectedCounselor || !selectedDate || !selectedTime) return

    const selectedCounselorData = counselors.find((c) => c.id === selectedCounselor)
    if (!selectedCounselorData) return

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      counselor: selectedCounselorData.name,
      date: selectedDate === "today" ? "Today" : selectedDate === "tomorrow" ? "Tomorrow" : "Day After Tomorrow",
      time: selectedTime,
      type: "Individual Session",
      status: "upcoming",
    }

    setAppointments((prev) => [...prev, newAppointment])

    // Reset form
    setSelectedCounselor("")
    setSelectedDate("")
    setSelectedTime("")

    // Show success message or redirect
    alert("Appointment booked successfully!")
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Booking System</h1>
            <p className="text-muted-foreground">Schedule your counseling sessions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Book New Appointment */}
          <Card>
            <CardHeader>
              <CardTitle>Book New Appointment</CardTitle>
              <CardDescription>Choose your counselor and preferred time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Counselor Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Select Counselor</label>
                <div className="space-y-3">
                  {counselors.map((counselor) => (
                    <div
                      key={counselor.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedCounselor === counselor.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedCounselor(counselor.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{counselor.name}</h4>
                          <p className="text-sm text-muted-foreground">{counselor.specialty}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-sm">⭐ {counselor.rating}</span>
                          </div>
                        </div>
                        {selectedCounselor === counselor.id && <CheckCircle className="h-5 w-5 text-primary" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="day-after">Day After Tomorrow</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Time Selection */}
              {selectedCounselor && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Available Times</label>
                  <div className="grid grid-cols-2 gap-2">
                    {counselors
                      .find((c) => c.id === selectedCounselor)
                      ?.availability.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                disabled={!selectedCounselor || !selectedDate || !selectedTime}
                onClick={handleBooking}
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Your Appointments</CardTitle>
              <CardDescription>Manage your scheduled sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{appointment.counselor}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">{appointment.type}</Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm">Join</Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
