import type React from "react"
import type { Metadata } from "next"
import { Poppins, Playfair_Display, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "T. Sudhakar Reddy - Transform Your Future Today",
  description:
    "Your future begins the moment you decide—don't wait, create it today. Join thousands of achievers who transformed their life with Sudhakar Reddy's proven methods.",
  generator: "v0.app",
  keywords: "business mentor, entrepreneur, success coach, wealth building, T Sudhakar Reddy",
  authors: [{ name: "T. Sudhakar Reddy" }],
  openGraph: {
    title: "T. Sudhakar Reddy - Transform Your Future Today",
    description: "Your future begins the moment you decide—don't wait, create it today.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`font-sans antialiased ${poppins.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
