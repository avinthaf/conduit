import * as React from "react"
import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

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
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: wire up authentication
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

          {/* Password — raw <input> because the Input component's "password"
              variant renders an unwanted strength bar. Classes mirror the
              `default` variant's fieldBase + px-3 exactly. */}
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="login-password"
              className="font-mono text-[12px] font-medium text-[#a1a1aa] leading-none"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={cn(
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
              )}
            />
          </div>

          {/* Sign in */}
          <Button
            type="submit"
            variant="primary"
            className="w-full h-10 py-0"
          >
            Sign in
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
          Don't have an account?
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
          Sign up
        </a>
      </div>
    </div>
  )
}
