"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface JoinCourseButtonProps {
  size?: "sm" | "lg" | "default"
  className?: string
  children?: React.ReactNode
}

export function JoinCourseButton({ 
  size = "lg", 
  className = "",
  children = "Join our next course"
}: JoinCourseButtonProps) {
  const handleJoinCourse = () => {
    // Create email content
    const subject = encodeURIComponent("Join Next Language Course")
    const body = encodeURIComponent(
      `Hello Mazehmina Team,

I would like to join your next language course. Here are my details:

- Full Name: 
- Age: 
- Language I want to study: 
- My current level (if known): 
- Availability (Days/Times): 
- Phone or WhatsApp: 

Thank you!`
    )

    // Open email client with mailto
    const mailtoLink = `mailto:mazehmina@gmail.com?subject=${subject}&body=${body}`
    
    // Try multiple methods to ensure email client opens
    try {
      // Method 1: window.location.href (most reliable)
      window.location.href = mailtoLink
    } catch (error) {
      // Method 2: window.open as fallback
      window.open(mailtoLink, '_blank')
    }
  }

  return (
    <Button 
      size={size} 
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg ${className}`}
      onClick={handleJoinCourse}
    >
      <span className="flex items-center justify-center gap-2">
        {children}
        <ArrowRight className="w-4 h-4" />
      </span>
    </Button>
  )
}
