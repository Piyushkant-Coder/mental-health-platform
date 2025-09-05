"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ClipboardList, AlertCircle, CheckCircle } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  id: string
  text: string
  options: { value: number; label: string }[]
}

export function ScreeningTools() {
  const router = useRouter()
  const [activeTest, setActiveTest] = useState<"phq9" | "gad7" | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [completed, setCompleted] = useState<string[]>([])

  const phq9Questions: Question[] = [
    {
      id: "phq1",
      text: "Little interest or pleasure in doing things",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "phq2",
      text: "Feeling down, depressed, or hopeless",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "phq3",
      text: "Trouble falling or staying asleep, or sleeping too much",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "phq4",
      text: "Feeling tired or having little energy",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "phq5",
      text: "Poor appetite or overeating",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "phq6",
      text: "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "phq7",
      text: "Trouble concentrating on things, such as reading the newspaper or watching television",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "phq8",
      text: "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "phq9",
      text: "Thoughts that you would be better off dead, or of hurting yourself",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
  ]

  const gad7Questions: Question[] = [
    {
      id: "gad1",
      text: "Feeling nervous, anxious, or on edge",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "gad2",
      text: "Not being able to stop or control worrying",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "gad3",
      text: "Worrying too much about different things",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "gad4",
      text: "Trouble relaxing",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "gad5",
      text: "Being so restless that it is hard to sit still",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "gad6",
      text: "Becoming easily annoyed or irritable",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
    {
      id: "gad7",
      text: "Feeling afraid, as if something awful might happen",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" },
      ],
    },
  ]

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const calculateScore = (questions: Question[]) => {
    return questions.reduce((total, question) => {
      return total + (answers[question.id] || 0)
    }, 0)
  }

  const getScoreInterpretation = (score: number, testType: "phq9" | "gad7") => {
    if (testType === "phq9") {
      if (score <= 4)
        return { level: "Minimal", color: "bg-green-100 text-green-800", description: "Minimal depression" }
      if (score <= 9) return { level: "Mild", color: "bg-yellow-100 text-yellow-800", description: "Mild depression" }
      if (score <= 14)
        return { level: "Moderate", color: "bg-orange-100 text-orange-800", description: "Moderate depression" }
      if (score <= 19)
        return {
          level: "Moderately Severe",
          color: "bg-red-100 text-red-800",
          description: "Moderately severe depression",
        }
      return { level: "Severe", color: "bg-red-200 text-red-900", description: "Severe depression" }
    } else {
      if (score <= 4) return { level: "Minimal", color: "bg-green-100 text-green-800", description: "Minimal anxiety" }
      if (score <= 9) return { level: "Mild", color: "bg-yellow-100 text-yellow-800", description: "Mild anxiety" }
      if (score <= 14)
        return { level: "Moderate", color: "bg-orange-100 text-orange-800", description: "Moderate anxiety" }
      return { level: "Severe", color: "bg-red-100 text-red-800", description: "Severe anxiety" }
    }
  }

  const completeTest = (testType: "phq9" | "gad7") => {
    setCompleted((prev) => [...prev, testType])
    setActiveTest(null)
    setAnswers({})
  }

  const currentQuestions = activeTest === "phq9" ? phq9Questions : gad7Questions
  const allAnswered = currentQuestions.every((q) => answers[q.id] !== undefined)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Mental Health Screening</h1>
            <p className="text-muted-foreground">Standardized assessment tools for depression and anxiety</p>
          </div>
        </div>

        {!activeTest && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PHQ-9 Depression Screening */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  PHQ-9 Depression Screening
                  {completed.includes("phq9") && <CheckCircle className="h-5 w-5 text-green-600" />}
                </CardTitle>
                <CardDescription>
                  Patient Health Questionnaire-9 (PHQ-9) is a validated tool for screening and monitoring depression
                  severity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Duration:</strong> 2-3 minutes
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Questions:</strong> 9 items about depression symptoms
                  </p>
                  <Badge variant="outline">Validated Assessment</Badge>
                </div>
                <Button
                  className="w-full"
                  onClick={() => setActiveTest("phq9")}
                  variant={completed.includes("phq9") ? "outline" : "default"}
                >
                  {completed.includes("phq9") ? "Retake Assessment" : "Start PHQ-9"}
                </Button>
              </CardContent>
            </Card>

            {/* GAD-7 Anxiety Screening */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  GAD-7 Anxiety Screening
                  {completed.includes("gad7") && <CheckCircle className="h-5 w-5 text-green-600" />}
                </CardTitle>
                <CardDescription>
                  Generalized Anxiety Disorder-7 (GAD-7) is a validated tool for screening and measuring anxiety
                  severity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Duration:</strong> 2-3 minutes
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Questions:</strong> 7 items about anxiety symptoms
                  </p>
                  <Badge variant="outline">Validated Assessment</Badge>
                </div>
                <Button
                  className="w-full"
                  onClick={() => setActiveTest("gad7")}
                  variant={completed.includes("gad7") ? "outline" : "default"}
                >
                  {completed.includes("gad7") ? "Retake Assessment" : "Start GAD-7"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTest && (
          <Card>
            <CardHeader>
              <CardTitle>{activeTest === "phq9" ? "PHQ-9 Depression Screening" : "GAD-7 Anxiety Screening"}</CardTitle>
              <CardDescription>
                Over the last 2 weeks, how often have you been bothered by any of the following problems?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentQuestions.map((question, index) => (
                <div key={question.id} className="space-y-3">
                  <h4 className="font-medium">
                    {index + 1}. {question.text}
                  </h4>
                  <RadioGroup
                    value={answers[question.id]?.toString() || ""}
                    onValueChange={(value) => handleAnswerChange(question.id, Number.parseInt(value))}
                  >
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value.toString()} id={`${question.id}-${option.value}`} />
                        <Label htmlFor={`${question.id}-${option.value}`} className="cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}

              <div className="flex justify-between pt-6 border-t">
                <Button variant="outline" onClick={() => setActiveTest(null)}>
                  Cancel
                </Button>
                <Button
                  disabled={!allAnswered}
                  onClick={() => {
                    const score = calculateScore(currentQuestions)
                    const interpretation = getScoreInterpretation(score, activeTest)
                    alert(
                      `Assessment Complete!\n\nScore: ${score}/${currentQuestions.length * 3}\nLevel: ${interpretation.level}\n\n${interpretation.description}\n\nPlease discuss these results with a mental health professional.`,
                    )
                    completeTest(activeTest)
                  }}
                >
                  Complete Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!activeTest && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• These screening tools are for educational purposes and initial assessment only</p>
              <p>• Results should not be used for self-diagnosis or as a substitute for professional evaluation</p>
              <p>
                • If you're experiencing thoughts of self-harm, please contact emergency services or a crisis hotline
                immediately
              </p>
              <p>
                • Consider sharing your results with a mental health professional for proper evaluation and treatment
                planning
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
