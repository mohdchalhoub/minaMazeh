"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollToTop } from "@/components/scroll-to-top"
import { MobileNav } from "@/components/mobile-nav"
import { BookingModal } from "@/components/booking-modal"
import { JoinCourseButton } from "@/components/join-course-button"
import {
  GraduationCap,
  FileText,
  Award,
  Plane,
  Home,
  Users,
  BookOpen,
  Phone,
  Mail,
  Instagram,
  Clock,
  ArrowRight,
} from "lucide-react"
import { useEffect, useState } from "react"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function HomePage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSendMessage = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields.')
      return
    }

    // Create email content
    const subject = encodeURIComponent(formData.subject)
    const body = encodeURIComponent(
      `Hello Mina,

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

Best regards,
${formData.name}`
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

    // Clear the form after opening email client
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium tracking-tight">Mina Mazeh</div>
            <div className="hidden md:flex space-x-12">
              <a
                href="#hero"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                About
              </a>
              <a
                href="#services"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                Services
              </a>
              <a
                href="#courses"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                Italian Courses
              </a>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                Contact
              </a>
            </div>
            <MobileNav isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen} />
          </div>
        </div>
      </nav>

      <section id="hero" className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="space-y-6 sm:space-y-8 animate-fade-in-up order-2 lg:order-1">
                <div className="space-y-4 sm:space-y-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-balance leading-[0.9]">
                    Your guide to studying in Italy
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
                    I'm Mina Mazeh, your dedicated educational consultant specializing in Italian university
                    applications, scholarships, visas, and Italian language courses. Let me help you turn your dream of
                    studying in Italy into reality.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="px-6 sm:px-8 py-3 text-base font-normal" asChild>
                    <a href="#contact" className="flex items-center justify-center gap-2">
                      Start your journey
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="lg" className="px-6 sm:px-8 py-3 text-base font-normal" asChild>
                    <a href="#services">View services</a>
                  </Button>
                </div>
              </div>

              <div className="relative animate-fade-in-up animation-delay-200 order-1 lg:order-2">
                <div className="aspect-[4/5] relative overflow-hidden bg-muted/20 border border-border max-w-md mx-auto lg:max-w-none">
                  <img
                    src="/minaMazehProfile.jpg"
                    alt="Mina Mazeh - Educational Consultant"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-background border border-border p-4 sm:p-6 max-w-xs">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Mina Mazeh</div>
                    <div className="text-xs text-muted-foreground">Educational Consultant</div>
                    <div className="text-xs text-muted-foreground">Helping students since 2020</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 sm:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-balance mb-4 sm:mb-6">
                About Mina Mazeh
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Dedicated to helping students navigate their journey to Italian universities
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
              <div className="space-y-6 sm:space-y-8 animate-fade-in-up animation-delay-200">
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-4xl sm:text-6xl font-light text-muted-foreground">01</div>
                  <h3 className="text-xl sm:text-2xl font-light">Expert guidance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    With extensive knowledge of the Italian education system, I provide personalized guidance to help
                    students choose the right university and navigate complex application processes.
                  </p>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8 animate-fade-in-up animation-delay-400">
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-4xl sm:text-6xl font-light text-muted-foreground">02</div>
                  <h3 className="text-xl sm:text-2xl font-light">Proven success</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    My mission is to make studying in Italy accessible to everyone. I've helped countless students
                    secure scholarships, obtain visas, and successfully begin their academic journey in Italy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 sm:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-balance mb-4 sm:mb-6">
                Services
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive support for your Italian education journey
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <Card className="border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg animate-fade-in-up animation-delay-200 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <GraduationCap className="w-6 h-6 text-foreground" />
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <CardTitle className="text-lg font-normal">University Applications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>University selection guidance</li>
                    <li>Ministry of Education applications</li>
                    <li>Entrance exam applications</li>
                    <li>IMAT registration</li>
                    <li>Document preparation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg animate-fade-in-up animation-delay-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Award className="w-6 h-6 text-foreground" />
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <CardTitle className="text-lg font-normal">Scholarships & Visas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>100% scholarship applications</li>
                    <li>Scholarship document verification</li>
                    <li>Visa application assistance</li>
                    <li>Declaration of Value applications</li>
                  </ul>
                  <Badge variant="secondary" className="text-xs font-normal">
                    Covers fees, dorms, canteen & pocket money
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg animate-fade-in-up animation-delay-400 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Home className="w-6 h-6 text-foreground" />
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <CardTitle className="text-lg font-normal">Housing & Residency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Housing search assistance</li>
                    <li>Property owner contact</li>
                    <li>Permit of Stay applications</li>
                    <li>Residence appointments</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg animate-fade-in-up animation-delay-500 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="w-6 h-6 text-foreground" />
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <CardTitle className="text-lg font-normal">Document Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Document preparation</li>
                    <li>Verification services</li>
                    <li>Translation assistance</li>
                    <li>Apostille guidance</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg animate-fade-in-up animation-delay-600 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Plane className="w-6 h-6 text-foreground" />
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <CardTitle className="text-lg font-normal">Travel & Immigration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Visa interview preparation</li>
                    <li>Travel planning assistance</li>
                    <li>Immigration guidance</li>
                    <li>Airport pickup coordination</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg animate-fade-in-up animation-delay-700 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-6 h-6 text-foreground" />
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <CardTitle className="text-lg font-normal">Ongoing Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Online appointment scheduling</li>
                    <li>Italian bureaucracy guidance</li>
                    <li>Ongoing student support</li>
                    <li>Emergency assistance</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="py-16 sm:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-balance mb-4 sm:mb-6">
                Italian Language Courses
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Master Italian with our comprehensive online courses
              </p>
            </div>

            <Card className="border-border animate-fade-in-up animation-delay-200">
              <CardContent className="p-6 sm:p-12">
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <BookOpen className="w-8 h-8 text-foreground" />
                      <h3 className="text-2xl sm:text-3xl font-light">Online Italian Classes</h3>
                      <p className="text-muted-foreground">A1, A2, and B1 Levels</p>
                    </div>

                    <div className="space-y-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4" />
                        <span>6-month program</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4" />
                        <span>Monday to Thursday, 2 hours per day</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4" />
                        <span>Interactive online format</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-6 border border-border">
                        <div className="text-2xl sm:text-3xl font-light mb-2">A1</div>
                        <div className="text-sm text-muted-foreground">Beginner</div>
                      </div>
                      <div className="text-center p-6 border border-border">
                        <div className="text-2xl sm:text-3xl font-light mb-2">A2</div>
                        <div className="text-sm text-muted-foreground">Elementary</div>
                      </div>
                      <div className="text-center p-6 border border-border">
                        <div className="text-2xl sm:text-3xl font-light mb-2">B1</div>
                        <div className="text-sm text-muted-foreground">Intermediate</div>
                      </div>
                    </div>

                    <JoinCourseButton />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 sm:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-balance mb-4 sm:mb-6">
                Get in touch
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Ready to start your journey to studying in Italy? Contact me today.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
              <div className="space-y-8 animate-fade-in-up animation-delay-200">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-normal text-muted-foreground">
                        Name *
                      </label>
                      <Input 
                        id="name" 
                        placeholder="Your full name" 
                        className="border-border" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-normal text-muted-foreground">
                        Email *
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your.email@example.com" 
                        className="border-border" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-normal text-muted-foreground">
                      Subject *
                    </label>
                    <Input 
                      id="subject" 
                      placeholder="What can I help you with?" 
                      className="border-border" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-normal text-muted-foreground">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your goals and how I can help you achieve them..."
                      rows={6}
                      className="border-border resize-none"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button 
                    type="button"
                    size="lg" 
                    className="w-full"
                    onClick={handleSendMessage}
                  >
                    Send message
                  </Button>
                </div>
              </div>

              <div className="space-y-12 animate-fade-in-up animation-delay-400">
                <div className="space-y-8">
                  <h3 className="text-xl sm:text-2xl font-light">Contact information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-normal mb-1">Phone</div>
                        <div className="text-muted-foreground">+39 339 432 0308</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-normal mb-1">Email</div>
                        <div className="text-muted-foreground">mazehmina@gmail.com</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Instagram className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-normal mb-1">Instagram</div>
                        <div className="text-muted-foreground">@minamazeh</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl sm:text-2xl font-light">Office hours</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Saturday</span>
                      <span>Closed</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-border">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg sm:text-xl font-light">Ready to start?</h3>
                    <p className="text-sm text-muted-foreground">Book a free consultation to discuss your goals.</p>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full bg-transparent"
                      onClick={() => setIsBookingModalOpen(true)}
                    >
                      Schedule free consultation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-normal mb-2">Mina Mazeh</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Your guide to studying in Italy</p>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Professional educational consulting services helping students achieve their dreams of studying in
                  Italy through expert guidance and comprehensive support.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-base sm:text-lg font-normal">Quick links</h4>
                <div className="space-y-3 text-sm sm:text-base">
                  <a href="#about" className="block text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </a>
                  <a href="#services" className="block text-muted-foreground hover:text-foreground transition-colors">
                    Services
                  </a>
                  <a href="#courses" className="block text-muted-foreground hover:text-foreground transition-colors">
                    Italian Courses
                  </a>
                  <a href="#contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-base sm:text-lg font-normal">Contact details</h4>
                <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+39 339 432 0308</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>mazehmina@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    <span>@minamazeh</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-sm sm:text-base text-muted-foreground">
              <p>&copy; 2025 Mina Mazeh. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTop />
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  )
}
