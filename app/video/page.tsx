"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { AnimatedBackground } from "@/components/animated-background"
import { ExternalLink, CheckCircle, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function VideoPage() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [isJoining, setIsJoining] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState("Telugu")
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState<any>(null)
  const [wakeLock, setWakeLock] = useState<any>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [maxTime, setMaxTime] = useState(0) // maximum watched time
  const playerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const languages = [
    { code: "Telugu", name: "తెలుగు", flag: "🇮🇳" },
    { code: "Tamil", name: "தமிழ்", flag: "🇮🇳" },
    { code: "Hindi", name: "हिंदी", flag: "🇮🇳" },
    { code: "English", name: "English", flag: "🇺🇸" },
  ]

  const videoEmbeds: Record<string, string> = {
    Telugu: "0jKeLVFi00k",
    Tamil: "WCtslzTrHO0",
    Hindi: "V0HZdfx5PSI",
    English: "cQWFCuorBk0",
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => setShowScrollHint(false), 6000)
    const onScroll = () => {
      if (window.scrollY > 80) setShowScrollHint(false)
    }
    window.addEventListener("scroll", onScroll)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  // Load YouTube API and init player
  useEffect(() => {
    if (!isPlaying || !playerRef.current) return
    if ((window as any).YT) {
      initPlayer()
    } else {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      document.body.appendChild(tag)
      ;(window as any).onYouTubeIframeAPIReady = initPlayer
    }
  }, [isPlaying, selectedLanguage])

  const initPlayer = () => {
    if (!playerRef.current) return
    const newPlayer = new (window as any).YT.Player(playerRef.current, {
      videoId: videoEmbeds[selectedLanguage],
      playerVars: {
        autoplay: 1,
        controls: 0, // hide native controls
        modestbranding: 1,
        rel: 0,
        disablekb: 1,
      },
      events: {
        onReady: (event: any) => {
          event.target.playVideo()
          setDuration(event.target.getDuration())
          setMaxTime(0)
          requestWakeLock()
          monitorTime(event.target)
        },
      },
    })
    setPlayer(newPlayer)
  }

  const monitorTime = (ytPlayer: any) => {
    const interval = setInterval(() => {
      const t = ytPlayer.getCurrentTime()
      if (t > maxTime) setMaxTime(t) // track max watched time
      setCurrentTime(t)
    }, 500)
    ytPlayer.monitorInterval = interval
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!progressRef.current || !player) return
    const rect = progressRef.current.getBoundingClientRect()
    const clickPos = e.clientX - rect.left
    const clickTime = (clickPos / rect.width) * duration
    if (clickTime <= maxTime) {
      player.seekTo(clickTime, true)
    }
  }

  const handleJoinNow = () => {
    setIsJoining(true)
    window.open(
      "https://910005109542.fbo.foreverliving.com/join/ind/en-us/personalinfo",
      "_blank",
      "noopener,noreferrer",
    )
    const onFocus = () => {
      window.removeEventListener("focus", onFocus)
      router.push("/thank-you")
    }
    window.addEventListener("focus", onFocus)
    setTimeout(() => setIsJoining(false), 2000)
  }

  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator) {
        const lock = await (navigator as any).wakeLock.request("screen")
        setWakeLock(lock)
        lock.addEventListener("release", () => console.log("Wake Lock released"))
      }
    } catch (err) {
      console.error("Wake Lock failed", err)
    }
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 relative">
        <AnimatedBackground />
        <Logo />
        <div className="relative z-10 text-center">
          <div className="animate-professional-zoom-in">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-3xl opacity-30"></div>
              <CheckCircle className="relative w-20 h-20 text-primary mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-serif">
              Welcome to Your Journey
            </h1>
            <p className="text-lg text-muted-foreground">
              Loading your exclusive training...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Logo />

      <div className="relative z-10">
        <main className="py-10 md:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Language Selector */}
            <div className="mb-8 text-center">
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                Choose Your Language
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code)
                      setIsPlaying(false)
                      if (player) {
                        player.destroy()
                        setPlayer(null)
                        setCurrentTime(0)
                        setMaxTime(0)
                      }
                    }}
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
            </div>

            {/* Video Section */}
            <Card className="shadow-2xl overflow-hidden border border-border bg-card/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                  {!isPlaying ? (
                    <div className="absolute inset-0 flex items-center justify-center cursor-pointer group">
                      <div className="absolute inset-0 bg-black opacity-60" />
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="z-10 w-20 h-20 flex items-center justify-center bg-white bg-opacity-90 rounded-full shadow-lg group-hover:scale-110 transition transform"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10 text-primary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div ref={playerRef} className="absolute inset-0 w-full h-full" />
                      {/* Custom progress bar */}
                      <div
                        ref={progressRef}
                        onClick={handleProgressClick}
                        className="absolute bottom-4 left-0 w-full h-3 bg-gray-700/50 cursor-pointer rounded"
                      >
                        <div
                          className="h-3 bg-red-500 rounded"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                        <div
                          className="absolute top-0 right-0 h-3 w-1 bg-white opacity-50 cursor-not-allowed"
                          style={{
                            left: `${(maxTime / duration) * 100}%`,
                          }}
                          title="Forward seeking disabled"
                        />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {showScrollHint && (
              <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
                <div className="px-4 md:px-5 py-2 rounded-full bg-background/80 border border-border shadow-lg backdrop-blur-md text-sm md:text-base flex items-center gap-2">
                  <ChevronDown className="w-4 h-4 text-primary" />
                  <span className="font-medium">
                    Scroll down to see the JOIN button
                  </span>
                </div>
              </div>
            )}

            {/* Join Section */}
            <div className="mt-10 md:mt-14 text-center">
              <Card className="bg-gradient-to-br from-primary via-primary/95 to-accent text-primary-foreground shadow-2xl border-2 border-primary/30 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
                <CardContent className="py-10 px-6 md:py-14 md:px-12 relative">
                  <h2 className="text-2xl md:text-4xl font-bold font-serif leading-tight mb-4">
                    Ready to Join?
                  </h2>
                  <p className="text-base md:text-lg opacity-90 mb-8">
                    Take action now and start your journey with proven strategies
                    and ongoing mentorship.
                  </p>
                  <Button
                    onClick={handleJoinNow}
                    disabled={isJoining}
                    size="lg"
                    className="relative bg-white text-primary hover:bg-white/90 text-lg md:text-xl px-8 md:px-12 py-6 rounded-2xl shadow-2xl font-bold"
                  >
                    <span className="flex items-center gap-3">
                      {isJoining ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                          Opening...
                        </>
                      ) : (
                        <>
                          Join Now
                          <ExternalLink className="w-5 h-5" />
                        </>
                      )}
                    </span>
                  </Button>

                  <div className="mt-6">
                    <a
                      href="/thank-you"
                      className="underline underline-offset-4 text-white/90 hover:text-white"
                    >
                      I’ve completed joining — continue
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
