"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Search, MessageCircle, Heart, Reply, Plus, Clock, User } from "lucide-react"

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  category: string
  replies: number
  likes: number
  timeAgo: string
  isLiked: boolean
}

export function PeerSupportForum() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("")
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: "1",
      title: "Managing Exam Stress - Tips that Actually Work",
      content: "I've been struggling with exam anxiety and wanted to share some techniques that have helped me...",
      author: "StudentHelper23",
      category: "Academic Stress",
      replies: 12,
      likes: 24,
      timeAgo: "2 hours ago",
      isLiked: false,
    },
    {
      id: "2",
      title: "Sleep Schedule Tips for Better Mental Health",
      content: "After months of poor sleep affecting my mood, I finally found a routine that works...",
      author: "NightOwl2024",
      category: "Sleep & Wellness",
      replies: 8,
      likes: 18,
      timeAgo: "5 hours ago",
      isLiked: true,
    },
    {
      id: "3",
      title: "Dealing with Social Anxiety in Group Projects",
      content: "Group projects used to terrify me, but I've learned some strategies that might help others...",
      author: "QuietStudent",
      category: "Social Anxiety",
      replies: 15,
      likes: 31,
      timeAgo: "1 day ago",
      isLiked: false,
    },
    {
      id: "4",
      title: "Finding Balance: Work, Study, and Self-Care",
      content: "Sharing my journey of learning to balance responsibilities without burning out...",
      author: "BalancedLife",
      category: "Self-Care",
      replies: 6,
      likes: 14,
      timeAgo: "2 days ago",
      isLiked: false,
    },
  ])

  const categories = [
    "all",
    "Academic Stress",
    "Sleep & Wellness",
    "Social Anxiety",
    "Self-Care",
    "Relationships",
    "Depression",
  ]

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !newPostCategory) return

    const newPost: ForumPost = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: "You", // In real app, this would be the current user
      category: newPostCategory,
      replies: 0,
      likes: 0,
      timeAgo: "Just now",
      isLiked: false,
    }

    setForumPosts((prev) => [newPost, ...prev])

    // Reset form
    setNewPostTitle("")
    setNewPostContent("")
    setNewPostCategory("")
    setShowNewPost(false)
  }

  const handleLike = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const filteredPosts = forumPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Peer Support Forum</h1>
            <p className="text-muted-foreground">Connect with others and share your experiences</p>
          </div>
          <Button onClick={() => setShowNewPost(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
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
                    {category === "all" ? "All Topics" : category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {showNewPost && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
              <CardDescription>Share your thoughts or ask for support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Post title..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
              <Textarea
                placeholder="Share your thoughts..."
                rows={4}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <select
                  className="px-3 py-2 border rounded-md"
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.slice(1).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowNewPost(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreatePost}
                    disabled={!newPostTitle.trim() || !newPostContent.trim() || !newPostCategory}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-3">{post.content}</p>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.timeAgo}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                        <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.replies}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No discussions found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
