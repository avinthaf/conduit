import * as React from "react"
import { Link } from "react-router"
import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// OR divider — identical to Login
// ---------------------------------------------------------------------------
function OrDivider() {
  return (
    <div className="flex items-center gap-3 w-full" role="separator" aria-label="or">
      <div className="flex-1 h-px bg-[#27272a]" />
      <span className="font-mono text-[11px] text-[#52525b] leading-none select-none">
        or
      </span>
      <div className="flex-1 h-px bg-[#27272a]" />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Password strength — 0–100 score derived from the password string
// ---------------------------------------------------------------------------
function calcStrength(password: string): number {
  if (password.length === 0) return 0
  let score = 0
  if (password.length >= 8) score += 25
  if (password.length >= 12) score += 15
  if (/[A-Z]/.test(password)) score += 20
  if (/[0-9]/.test(password)) score += 20
  if (/[^A-Za-z0-9]/.test(password)) score += 20
  return Math.min(100, score)
}

// ---------------------------------------------------------------------------
// Sign Up page
// ---------------------------------------------------------------------------
export default function SignUp() {
  const [fullName, setFullName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  const strength = calcStrength(password)
  const passwordError =
    password.length > 0 && password.length < 8
      ? "Password must be at least 8 characters"
      : ""

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: wire up account creation
  }

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center"
      aria-label="Sign up page"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Wordmark + tagline                                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col items-center gap-2 pb-8 w-100">
        <span className="font-mono font-semibold text-[28px] text-[#fafafa] leading-none text-center">
          Conduit
        </span>
        <span className="font-mono text-[13px] text-[#71717a] leading-none text-center">
          AI-powered customer service training
        </span>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Card                                                                */}
      {/* ------------------------------------------------------------------ */}
      <div
        className={cn(
          "w-100 flex flex-col",
          "bg-[#111111] border border-[#27272a] rounded-lg p-8",
          "gap-5"
        )}
      >
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          {/* Full Name */}
          <Input
            variant="default"
            label="Full Name"
            placeholder="Jane Smith"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          {/* Work Email — type="email" now accepted directly */}
          <Input
            variant="default"
            label="Work Email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password — strength bar appears when `strength` is provided;
              errorMessage surfaces the validation message below the bar. */}
          <Input
            variant="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            strength={password.length > 0 ? strength : undefined}
            errorMessage={passwordError || undefined}
          />

          {/* Confirm Password — no `strength` prop so no strength bar */}
          <Input
            variant="password"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Create account */}
          <Button
            type="submit"
            variant="primary"
            className="w-full h-10 py-0"
          >
            Create account
          </Button>
        </form>

        {/* Terms */}
        <p className="font-mono text-[11px] text-[#52525b] leading-relaxed text-center w-full">
          By creating an account you agree to our Terms and Privacy Policy
        </p>

        {/* OR divider */}
        <OrDivider />

        {/* Continue with Google */}
        <Button
          type="button"
          variant="secondary"
          className="w-full h-10 py-0 gap-2"
          onClick={() => {
            // TODO: wire up Google OAuth
          }}
        >
          <Globe aria-hidden="true" className="size-4 shrink-0 text-[#a1a1aa]" />
          Continue with Google
        </Button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Footer link                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-center gap-1 pt-6">
        <span className="font-mono text-[12px] text-[#71717a] leading-none">
          Already have an account?
        </span>
        <Link
          to="/login"
          className={cn(
            "font-mono text-[12px] font-normal leading-none",
            "text-[#fafafa]",
            "hover:text-[oklch(0.985_0_0)] transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-xs"
          )}
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}
