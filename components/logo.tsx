"use client"

import Image from "next/image"

export function Logo() {
  return (
    <div className="fixed top-6 right-8 z-50">
      <Image src="/tsreddy-logo.png" alt="TSReddy Logo" width={120} height={60} className="drop-shadow-lg" priority />
    </div>
  )
}
