"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, BookOpen, Video, FileText, Download, Clock, Star } from "lucide-react"
import { useRouter } from "next/navigation"

interface Resource {
  id: string
  title: string
  type: "article" | "video" | "pdf" | "audio"
  category: string
  duration?: string
  rating: number
  description: string
  author: string
}

export function ResourceHub() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const router = useRouter()

  const resources: Resource[] = [
    {
      id: "1",
      title: "Managing Anxiety in Academic Settings",
      type: "article",
      category: "Anxiety",
      duration: "8 min read",
      rating: 4.8,
      description: "Learn practical techniques to handle anxiety during exams and presentations.",
      author: "Dr. Sarah Johnson",
    },
    {
      id: "2",
      title: "Mindfulness Meditation for Beginners",
      type: "video",
      category: "Mindfulness",
      duration: "15 min",
      rating: 4.9,
      description: "A guided meditation session to help you get started with mindfulness practice.",
      author: "Dr. Michael Chen",
    },
    {
      id: "3",
      title: "Sleep Hygiene Guide",
      type: "pdf",
      category: "Sleep",
      duration: "12 pages",
      rating: 4.7,
      description: "Comprehensive guide to improving your sleep quality and establishing healthy routines.",
      author: "Dr. Emily Rodriguez",
    },
    {
      id: "4",
      title: "Breathing Exercises for Stress Relief",
      type: "audio",
      category: "Stress",
      duration: "10 min",
      rating: 4.6,
      description: "Audio guide with various breathing techniques to manage stress and anxiety.",
      author: "Dr. Sarah Johnson",
    },
  ]

  const categories = ["all", "Anxiety", "Mindfulness", "Sleep", "Stress", "Depression", "Relationships"]

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "pdf":
        return <BookOpen className="h-5 w-5" />
      case "audio":
        return <Clock className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Resource Hub</h1>
            <p className="text-muted-foreground">Access learning materials and mental health resources</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getResourceIcon(resource.type)}
                    <Badge variant="secondary" className="capitalize">
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{resource.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>By {resource.author}</span>
                    <span>{resource.duration}</span>
                  </div>
                  <Badge variant="outline">{resource.category}</Badge>
                  <div className="flex gap-2">
                    <Button className="flex-1">{resource.type === "video" ? "Watch" : "Read"}</Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
