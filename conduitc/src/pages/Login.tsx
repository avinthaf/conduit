import * as React from "react"
import { Link } from "react-router"
import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"

// ---------------------------------------------------------------------------
// OR divider
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
// Login page
// ---------------------------------------------------------------------------
export default function Login() {
  const { signIn, signInWithGoogle } = useAuth()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await signIn(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setError("")
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign in failed")
    }
  }

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center"
      aria-label="Login page"
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
          {/* Email */}
          <Input
            variant="default"
            label="Email"
            placeholder="you@company.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password — variant="password" without a `strength` prop omits
              the strength bar, giving us a plain password field. */}
          <Input
            variant="password"
            label="Password"
            type="password"
            placeholder="••••••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Error message */}
          {error && (
            <p className="font-mono text-[12px] text-[#ef4444] leading-snug">
              {error}
            </p>
          )}

          {/* Sign in */}
          <Button
            type="submit"
            variant="primary"
            className="w-full h-10 py-0"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        {/* Forgot password — centered, below Sign in button */}
        <div className="flex justify-center w-full">
          <a
            href="#"
            className={cn(
              "font-mono text-[12px] font-normal leading-none",
              "text-[#a1a1aa]",
              "hover:text-[#d4d4d8] transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-xs"
            )}
          >
            Forgot password?
          </a>
        </div>

        {/* OR divider */}
        <OrDivider />

        {/* Continue with Google */}
        <Button
          type="button"
          variant="secondary"
          className="w-full h-10 py-0 gap-2"
          onClick={handleGoogleSignIn}
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
          Don't have an account?
        </span>
        <Link
          to="/signup"
          className={cn(
            "font-mono text-[12px] font-normal leading-none",
            "text-[#fafafa]",
            "hover:text-[oklch(0.985_0_0)] transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-xs"
          )}
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}
