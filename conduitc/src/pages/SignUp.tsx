import * as React from "react"
import { Globe, AlertCircle } from "lucide-react"

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
// Shared raw-input classes — mirror Input variant="default" exactly
// ---------------------------------------------------------------------------
const rawInputClasses = cn(
  "w-full h-10",
  "bg-[#18181b] text-[oklch(0.985_0_0)]",
  "border border-[#27272a]",
  "rounded-lg",
  "font-mono text-[13px]",
  "placeholder:text-[#52525b]",
  "px-3",
  "outline-none",
  "transition-colors duration-150",
  "focus:border-[#3f3f46]",
  "disabled:pointer-events-none disabled:opacity-40"
)

const labelClasses = "font-mono text-[12px] font-medium text-[#a1a1aa] leading-none"

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

          {/* Work Email — raw <input> because Input omits the `type` prop
              and the default variant always produces type="text". Classes
              mirror the default variant's fieldBase + px-3 exactly. */}
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="signup-email"
              className={labelClasses}
            >
              Work Email
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={rawInputClasses}
            />
          </div>

          {/* Password — uses the "password" variant which renders the
              strength bar. Error state is wired via a separate error row
              below the Input, matching the design's red-border + message
              + strength bar layout. */}
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="signup-password"
              className={labelClasses}
            >
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? "signup-password-error" : undefined}
              className={cn(
                rawInputClasses,
                passwordError && "border-[#ef4444] focus:border-[#ef4444]"
              )}
            />

            {/* Error message */}
            {passwordError && (
              <div
                id="signup-password-error"
                role="alert"
                className="flex items-center gap-1"
              >
                <AlertCircle
                  aria-hidden="true"
                  className="size-3 text-[#ef4444] shrink-0"
                />
                <span className="font-mono text-[11px] text-[#ef4444] leading-none">
                  {passwordError}
                </span>
              </div>
            )}

            {/* Strength bar — visible once the user starts typing */}
            {password.length > 0 && (
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex-1 h-1 rounded-xs bg-[#27272a] overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-xs transition-all duration-300",
                      strength < 34
                        ? "bg-[#ef4444]"
                        : strength < 67
                          ? "bg-[#f59e0b]"
                          : "bg-[#22c55e]"
                    )}
                    style={{ width: `${strength}%` }}
                    role="progressbar"
                    aria-valuenow={strength}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Password strength"
                  />
                </div>
                <span
                  className={cn(
                    "font-mono text-[11px] font-medium leading-none",
                    strength < 34
                      ? "text-[#ef4444]"
                      : strength < 67
                        ? "text-[#f59e0b]"
                        : "text-[#22c55e]"
                  )}
                >
                  {strength < 34 ? "Weak" : strength < 67 ? "Fair" : "Strong"}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password — raw <input>, no strength bar */}
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="signup-confirm-password"
              className={labelClasses}
            >
              Confirm Password
            </label>
            <input
              id="signup-confirm-password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={rawInputClasses}
            />
          </div>

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
        <a
          href="#"
          className={cn(
            "font-mono text-[12px] font-normal leading-none",
            "text-[#fafafa]",
            "hover:text-[oklch(0.985_0_0)] transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-xs"
          )}
        >
          Sign in
        </a>
      </div>
    </div>
  )
}
