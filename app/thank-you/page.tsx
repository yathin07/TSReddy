"use client"

import { Logo } from "@/components/logo"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Logo />
        <main className="px-4 py-20">
          <div className="max-w-3xl mx-auto text-center bg-card/80 backdrop-blur-sm border border-border rounded-3xl shadow-2xl p-10">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Thank You!</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              We’re excited to have you on this journey. Check your email and stay tuned for next steps and resources.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button asChild className="rounded-xl">
                <a href="/">Back to Home</a>
              </Button>
              <Button asChild variant="secondary" className="rounded-xl">
                <a href="/video">Watch Again</a>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
