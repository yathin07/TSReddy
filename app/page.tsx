"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { AnimatedBackground } from "@/components/animated-background"
import { ChevronDown, Star, Users, Award, TrendingUp, Play, Loader2 } from "lucide-react"

export default function LandingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("Telugu")
  const [isLanguageLoading, setIsLanguageLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const languages = [
    { code: "Telugu", name: "తెలుగు", flag: "🇮🇳" },
    { code: "Tamil", name: "தமிழ்", flag: "🇮🇳" },
    { code: "Hindi", name: "हिंदी", flag: "🇮🇳" },
    { code: "English", name: "English", flag: "🇺🇸" },
  ]

  const shortEmbeds: Record<string, string> = {
    Telugu: "https://www.youtube.com/embed/rlNeCu6fgp8",
    Tamil: "https://www.youtube.com/embed/9l_hcnVvsng",
    Hindi: "https://www.youtube.com/embed/wq16qCEqk9E",
    English: "https://www.youtube.com/embed/rS6tlsAI6fk",
  }

  const handleLanguageChange = (langCode: string) => {
    if (langCode === selectedLanguage) return

    setIsLanguageLoading(true)
    setIsPlaying(false)
    setTimeout(() => {
      setSelectedLanguage(langCode)
      setIsLanguageLoading(false)
    }, 800) // Professional loading delay
  }

  const testimonials = [
    {
      name: "Mr. M. Ranga",
      role: "Software Engineer → Multimillionaire Entrepreneur",
      content:
        "Sudhakar Reddy's guidance transformed my career from a regular software engineer to building a multimillion-dollar business. His practical strategies work!",
      rating: 5,
      image: "/placeholder-user.jpg",
    },
    {
      name: "Mrs. M. Kalavathi",
      role: "Housewife → Successful Entrepreneur",
      content:
        "Despite having no formal education, Sudhakar sir's methods helped me build a thriving business and completely change my family's lifestyle.",
      rating: 5,
      image: "/placeholder-user.jpg",
    },
    {
      name: "Mr. A. Srinivasa Reddy",
      role: "Traditional Businessman → Millionaire Mentor",
      content:
        "I went from running a small traditional business to becoming a millionaire mentor myself, all thanks to the proven systems Sudhakar Reddy taught me.",
      rating: 5,
      image: "/placeholder-user.jpg",
    },
  ]

  const scrollToRegistration = () => {
    window.location.href = "/register"
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <AnimatedBackground />

      <div className="relative z-10">
        <Logo />

        {/* Hero Section */}
        <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 relative">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-10 md:gap-16">
            {/* Title and copy */}
            <div className="max-w-3xl">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-sm md:text-base font-semibold tracking-wide uppercase">
                  Transform Your Future Today
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance font-serif leading-[1.1]">
                Your future begins the moment you decide—
                <span className="block text-primary relative">
                  don't wait, create it today.
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-30" />
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                Join thousands of achievers who transformed their lives with proven strategies from T. Sudhakar Reddy.
              </p>

              <Button
                onClick={scrollToRegistration}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl px-8 py-6 font-bold"
              >
                Register Now
              </Button>
            </div>

            {/* Language selector and short video */}
            <div className="w-full max-w-3xl">
              <div className="mb-4">
                <h3 className="text-lg md:text-xl font-bold text-foreground">Choose Your Language</h3>
                <p className="text-muted-foreground text-sm">Experience the intro in your preferred language</p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    disabled={isLanguageLoading}
                    className={`px-5 py-3 rounded-xl text-sm font-semibold border transition-all ${
                      selectedLanguage === lang.code
                        ? "bg-primary text-primary-foreground border-primary/60"
                        : "bg-card text-card-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>

              <div className="relative w-full overflow-hidden rounded-2xl border border-border shadow-lg">
                {isLanguageLoading ? (
                  <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-3" />
                      <p className="text-foreground">Loading {selectedLanguage}...</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    {isPlaying ? (
                      <iframe
                        key={selectedLanguage}
                        className="absolute inset-0 w-full h-full"
                        src={`${shortEmbeds[selectedLanguage]}?autoplay=1&modestbranding=1&rel=0&playsinline=1&controls=1`}
                        title={`${selectedLanguage} short video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <button
                          onClick={() => setIsPlaying(true)}
                          className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-primary shadow-lg hover:scale-110 transition"
                        >
                          <Play className="w-10 h-10 text-white" />
                        </button>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow">
                      <div className="flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5" />
                        {selectedLanguage} Intro
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ...rest of your code remains unchanged... */}

        <section className="py-32 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-block mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-lg font-semibold tracking-wide uppercase">
                  Real Success Stories
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 font-serif">Success Stories</h2>
              <p className="text-2xl text-muted-foreground italic max-w-4xl mx-auto leading-relaxed">
                Real words from real people thanking Mr. T. Sudhakar Reddy for this life-changing opportunity
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1 group bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/30"
                >
                  <CardContent className="p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>

                    <div className="flex mb-8 justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-7 h-7 fill-accent text-accent" />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-10 leading-relaxed relative z-10 text-lg italic">
                      "{testimonial.content}"
                    </p>

                    <div className="border-t-2 border-primary/20 pt-8 relative z-10 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{testimonial.name.charAt(0)}</span>
                      </div>
                      <h4 className="font-bold text-foreground text-xl mb-2">{testimonial.name}</h4>
                      <p className="text-accent font-semibold text-lg">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}