"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { AnimatedBackground } from "@/components/animated-background"
import { Star, Play, Loader2 } from "lucide-react"

import Tsreddy from "@/public/sudhakar-reddy-photo.png"

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
    Telugu: "https://www.youtube.com/embed/mE__snk_6Sg",
    Tamil: "https://www.youtube.com/embed/HK8dU1apRCw",
    Hindi: "https://www.youtube.com/embed/csB901pkwTo",
    English: "https://www.youtube.com/embed/u7nbqeFkzHY",
  }

  const testimonials = [
    {
      name: "Mr. M. Ranga",
      role: "Software Engineer → Multimillionaire Entrepreneur",
      content:
        "Sudhakar Reddy's guidance transformed my career from a regular software engineer to building a multimillion-dollar business. His practical strategies work!",
      rating: 5,
    },
    {
      name: "Mrs. M. Kalavathi",
      role: "Housewife → Successful Entrepreneur",
      content:
        "Despite having no formal education, Sudhakar sir's methods helped me build a thriving business and completely change my family's lifestyle.",
      rating: 5,
    },
    {
      name: "Mr. A. Srinivasa Reddy",
      role: "Traditional Businessman → Millionaire Mentor",
      content:
        "I went from running a small traditional business to becoming a millionaire mentor myself, all thanks to the proven systems Sudhakar Reddy taught me.",
      rating: 5,
    },
    {
      name: "Mr. T. Jayanna",
      role: "NGO → Millionaire",
      content:
        "I'm Jayanna from Nandyala, I went from working in a small Organization to becoming a millionaire, all thanks to Sudhakar Reddy sir for this great opportunity.",
      rating: 5,
    },
    {
      name: "Mr. Gowri Shankar",
      role: "Admin at hospital",
      content:
        "Working as admin at prestigious hospital sector at Hyderabad, but this part time work made me Millionaire.",
      rating: 5,
    },
  ]

  const extraTestimonials = [
    {
      name: "Mr. T. Chaitanya Kumar",
      role: "Mobile Service Center",
      content:
        "I was running a small mobile service center. I decided to work with Sudhakar Reddy sir and achieved an income of 1 lakh+ per month.",
      rating: 5,
    },
    {
      name: "Mr. Shaiksha Vali",
      role: "13k Salaried Employee",
      content:
        "I was working as a 13k salaried employee in the private sector, Kurnool. Through this opportunity, I’m now earning over 1 lakh per month. Thanks to Sudhakar Reddy sir!",
      rating: 5,
    },
    {
      name: "Mr. Dharbar Vali",
      role: "Bus Conductor",
      content:
        "Earning 1 lakh+ every month through this part-time opportunity while working as a bus conductor.",
      rating: 4,
    },
  ]

  const allTestimonials = [...testimonials, ...extraTestimonials]
  const loopedTestimonials = [...allTestimonials, ...allTestimonials]

  const handleLanguageChange = (langCode: string) => {
    if (langCode === selectedLanguage) return
    setIsLanguageLoading(true)
    setIsPlaying(false)
    setTimeout(() => {
      setSelectedLanguage(langCode)
      setIsLanguageLoading(false)
    }, 800)
  }

  const scrollToRegistration = () => {
    window.location.href = "/register"
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Logo />

        {/* HERO SECTION */}
        <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 relative">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-10 md:gap-16">
            <div className="max-w-3xl">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-sm md:text-base font-semibold tracking-wide uppercase">
                  Transform Your Future Today
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-serif leading-[1.1]">
                Your future begins the moment you decide—
                <span className="block text-primary relative">
                  don't wait, create it today.
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-30" />
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                Join thousands of achievers who transformed their lives with proven strategies from T. Sudhakar Reddy.
              </p>
            </div>

            {/* Language Selector */}
            <div className="w-full max-w-5xl">
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

              {/* Video */}
              <div className="relative w-full overflow-hidden rounded-2xl border border-border shadow-lg">
                {isLanguageLoading ? (
                  <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-blue-50/30 to-background">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="relative flex justify-center">
              <Image
                src={Tsreddy}
                alt="T. Sudhakar Reddy"
                width={400}
                height={600}
                className="rounded-2xl shadow-2xl object-cover w-full h-[500px] md:h-[900px]"
              />
              <div className="absolute bottom-5 bg-primary text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                15+ Years Experience
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6 font-serif">
                About Your Host, T. Sudhakar Reddy
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                T. Sudhakar Reddy is a renowned multi-millionaire entrepreneur and business coach who has helped thousands of individuals transform their lives through his proven business strategies and wealth-building methods.
                <br />
                <br />
                With decades of experience in building successful businesses, Sudhakar Reddy has developed a blueprint for financial freedom that works for ordinary people from all walks of life.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  "Successful Business Owner",
                  "Award-Winning Mentor",
                  "10,000+ Achievers",
                  "Created 100+ Millionaires",
                ].map((item) => (
                  <span
                    key={item}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm border border-blue-300 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-2">Why Learn From Sudhakar Reddy?</h3>
                <p className="italic text-base">
                  "I've built multiple successful business owners and helped hundreds of ordinary people achieve extraordinary results. My methods are practical, ethical, and designed for the needy who want real results."
                </p>
                <p className="mt-3 font-bold">– T. Sudhakar Reddy</p>
              </div>
            </div>
          </div>
        </section>

        {/* REGISTER BUTTON */}
        <section className="py-20 px-4 bg-background flex justify-center">
          <Button
            onClick={scrollToRegistration}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            Register Now
          </Button>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-32 px-4 bg-background overflow-hidden">
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-20">
              <div className="inline-block mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-lg font-semibold tracking-wide uppercase">
                  Real Success Stories
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 font-serif">
                Success Stories
              </h2>
              <p className="text-2xl text-muted-foreground italic max-w-4xl mx-auto leading-relaxed">
                Real words from real people thanking Mr. T. Sudhakar Reddy for this life-changing opportunity.
              </p>
            </div>

            <div className="relative w-full overflow-hidden">
              <div className="flex gap-12 animate-scroll">
                {loopedTestimonials.map((t, i) => (
                  <Card
                    key={i}
                    className="flex-shrink-0 w-80 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 hover:rotate-1 group bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/30"
                  >
                    <CardContent className="p-6 relative overflow-hidden">
                      <div className="flex mb-4 justify-center">
                        {[...Array(t.rating)].map((_, starIndex) => (
                          <Star key={starIndex} className="w-5 h-5 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed relative z-10 text-base italic">
                        "{t.content}"
                      </p>
                      <div className="border-t-2 border-primary/20 pt-4 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-xl font-bold text-white">{t.name.charAt(0)}</span>
                        </div>
                        <h4 className="font-bold text-foreground text-lg mb-1">{t.name}</h4>
                        <p className="text-accent font-semibold text-sm">{t.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SCROLL ANIMATION STYLE */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </div>
  )
}
