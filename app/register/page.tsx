import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Join MindCare</h1>
          <p className="text-muted-foreground">Create your account to get started</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
