"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { AnimatedBackground } from "@/components/animated-background"
import { Loader2, CheckCircle, Star, Shield, Clock } from "lucide-react"

type RegistrationData = {
  fullName: string
  phoneNumber: string
  email: string
  state: string
  language: string
  age: string
  graduation: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    state: "",
    language: "",
    age: "",
    graduation: "",
  })

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // 🔹 This is the main function that saves your form data to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // prevent default form submission
    setIsSubmitting(true)

    try {
      // Save form data to Firestore
      await addDoc(collection(db, "clients"), {
        ...formData,
        createdAt: new Date(),
      })

      // Show success screen
      setShowSuccess(true)

      // Redirect after short delay
      setTimeout(() => router.push("/video"), 1200)
    } catch (err) {
      console.error("Firestore error:", err)
      alert("Error saving your data. Check Firestore rules or config.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 relative">
        <AnimatedBackground />
        <Logo />
        <div className="relative z-10">
          <Card className="w-full max-w-lg text-center shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
            <CardContent className="pt-12 pb-12">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-20"></div>
                <CheckCircle className="relative w-20 h-20 text-primary mx-auto" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">Registration Complete</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Redirecting to your exclusive training video...
              </p>
              <div className="flex justify-center items-center gap-3 mb-6">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="text-lg font-medium text-primary">Preparing your content...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 relative">
      <AnimatedBackground />
      <Logo />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-serif leading-tight">
            Register Now to Continue
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of achievers on their journey to success with T. Sudhakar Reddy's proven methods
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 lg:col-start-2">
            <Card className="shadow-2xl border-2 border-border bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold font-serif">Registration Form</CardTitle>
                <p className="text-muted-foreground">Fill-in your details to access exclusive content</p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" type="text" required value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input id="phoneNumber" type="tel" required value={formData.phoneNumber} onChange={(e) => handleInputChange("phoneNumber", e.target.value)} />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" required value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                  </div>

                  {/* State & Language */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select onValueChange={(value) => handleInputChange("state", value)} required>
                        <SelectTrigger><SelectValue placeholder="Select your state" /></SelectTrigger>
                        <SelectContent>{states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Preferred Language *</Label>
                      <Select onValueChange={(value) => handleInputChange("language", value)} required>
                        <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
                        <SelectContent>{languages.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Age & Graduation */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input id="age" type="number" min="18" max="100" required value={formData.age} onChange={(e) => handleInputChange("age", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="graduation">Education Level *</Label>
                      <Select onValueChange={(value) => handleInputChange("graduation", value)} required>
                        <SelectTrigger><SelectValue placeholder="Select education level" /></SelectTrigger>
                        <SelectContent>{graduationOptions.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Submit */}
                  <div>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? <><Loader2 className="animate-spin mr-2" /> Securing Your Spot...</> : "Register & Access Exclusive Content"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const states = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu and Kashmir","Ladakh"]
const languages = ["Telugu","Tamil","Hindi","English","Kannada","Malayalam","Marathi","Bengali","Gujarati","Punjabi"]
const graduationOptions = ["High School","Intermediate/12th","Diploma","Bachelor's Degree","Master's Degree","PhD","Professional Degree","Other","No Formal Education"]
