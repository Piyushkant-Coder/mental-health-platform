import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageCircle, BookOpen, Bot, Heart, ClipboardList } from "lucide-react"
import Link from "next/link"
import { NotificationCenter } from "@/components/shared/notification-center"
import { UserMenu } from "@/components/shared/user-menu"
import { useCurrentUser } from "@/hooks/use-current-user"

export function StudentDashboard() {
  const { user, loading, error } = useCurrentUser();

  const upcomingAppointments = [
    {
      id: 1,
      counselor: "Dr. Sarah Johnson",
      date: "Today, 2:00 PM",
      type: "Individual Session",
    },
    {
      id: 2,
      counselor: "Dr. Michael Chen",
      date: "Tomorrow, 10:00 AM",
      type: "Group Therapy",
    },
  ];

  const recentForumPosts = [
    {
      id: 1,
      title: "Managing Exam Stress",
      replies: 12,
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      title: "Sleep Schedule Tips",
      replies: 8,
      lastActivity: "5 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header with gradient and motivational quote */}
      <header className="border-b bg-gradient-to-r from-green-400 via-blue-300 to-blue-500 shadow-lg">
        <div className="flex h-20 items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-white drop-shadow" />
            <h1 className="text-2xl font-bold text-white drop-shadow">MindCare Platform</h1>
          </div>
          <div className="flex items-center gap-6">
            <NotificationCenter userRole={user?.role || "student"} />
            <UserMenu user={user || { name: "User", email: "", role: "student" }} />
          </div>
        </div>
        <div className="px-8 pb-4">
          <p className="text-lg italic text-white/90">“Your present circumstances don’t determine where you can go; they merely determine where you start.”</p>
        </div>
      </header>

      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-green-700 mb-2">Welcome back, {user?.name || "Student"}!</h2>
          <p className="text-lg text-muted-foreground">Here's what's happening with your mental health journey today.</p>
        </div>

        {/* Daily Mood Check-in */}
        <div className="mb-8">
          <Card className="shadow-lg rounded-xl bg-gradient-to-r from-green-100 via-white to-blue-100">
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
              <div className="flex items-center gap-3">
                <span className="text-xl font-semibold text-green-700">How are you feeling today?</span>
                <span className="ml-2 text-2xl">🙂 😐 🙁</span>
              </div>
              <Button variant="default" className="bg-green-600 text-white hover:bg-green-700 transition">Check In</Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Link href="/student/booking">
            <Card className="cursor-pointer shadow-lg rounded-xl hover:scale-105 hover:shadow-2xl transition-transform bg-white">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-700">Book Session</h3>
                  <p className="text-sm text-muted-foreground">Schedule appointment</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/student/resources">
            <Card className="cursor-pointer shadow-lg rounded-xl hover:scale-105 hover:shadow-2xl transition-transform bg-white">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-700">Resources</h3>
                  <p className="text-sm text-muted-foreground">Learning materials</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/student/forum">
            <Card className="cursor-pointer shadow-lg rounded-xl hover:scale-105 hover:shadow-2xl transition-transform bg-white">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-700">Forum</h3>
                  <p className="text-sm text-muted-foreground">Peer support</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/student/ai-chat">
            <Card className="cursor-pointer shadow-lg rounded-xl hover:scale-105 hover:shadow-2xl transition-transform bg-white">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Bot className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-700">AI Mitr</h3>
                  <p className="text-sm text-muted-foreground">Chat assistant</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/student/screening">
            <Card className="cursor-pointer shadow-lg rounded-xl hover:scale-105 hover:shadow-2xl transition-transform bg-white">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <ClipboardList className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-pink-700">Screening</h3>
                  <p className="text-sm text-muted-foreground">PHQ-9 & GAD-7</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <Card className="shadow-lg rounded-xl bg-white">
            <CardHeader>
              <CardTitle className="text-green-700">Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled counseling sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-green-50 transition">
                  <div>
                    <p className="font-medium text-green-700">{appointment.counselor}</p>
                    <p className="text-sm text-muted-foreground">{appointment.date}</p>
                    <Badge variant="secondary" className="mt-1">
                      {appointment.type}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="border-green-600 text-green-700 hover:bg-green-100">Join</Button>
                </div>
              ))}
              <Link href="/student/booking">
                <Button variant="outline" className="w-full bg-green-50 text-green-700 hover:bg-green-100">View All Appointments</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Forum Activity */}
          <Card className="shadow-lg rounded-xl bg-white">
            <CardHeader>
              <CardTitle className="text-purple-700">Recent Forum Activity</CardTitle>
              <CardDescription>Latest discussions in peer support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentForumPosts.map((post) => (
                <div key={post.id} className="p-3 border rounded-lg hover:bg-purple-50 transition">
                  <h4 className="font-medium text-purple-700 mb-1">{post.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.replies} replies</span>
                    <span>{post.lastActivity}</span>
                  </div>
                </div>
              ))}
              <Link href="/student/forum">
                <Button variant="outline" className="w-full bg-purple-50 text-purple-700 hover:bg-purple-100">Visit Forum</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

