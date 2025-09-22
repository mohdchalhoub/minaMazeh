"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { useState } from "react"

interface BookingFormData {
  fullName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  message: string
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })

  const [errors, setErrors] = useState<Partial<BookingFormData>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    
    // Clear error when user starts typing
    if (errors[id as keyof BookingFormData]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required'
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Preferred time is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Create email content
      const subject = encodeURIComponent(`Consultation Request from ${formData.fullName}`)
      const body = encodeURIComponent(
        `Hello Mina,

You have a new consultation request:

Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Preferred Date: ${formData.preferredDate}
Preferred Time: ${formData.preferredTime}

Message:
${formData.message || 'No additional message provided'}

Please confirm this appointment with the client.

Best regards,
Your Website`
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

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      })
      
      // Close modal
      onClose()
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Schedule Free Consultation</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && (
              <p className="text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email *
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="preferredDate" className="text-sm font-medium text-gray-700">
                Preferred Date *
              </label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleInputChange}
                className={errors.preferredDate ? "border-red-500" : ""}
              />
              {errors.preferredDate && (
                <p className="text-sm text-red-600">{errors.preferredDate}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="preferredTime" className="text-sm font-medium text-gray-700">
                Preferred Time *
              </label>
              <Input
                id="preferredTime"
                type="time"
                value={formData.preferredTime}
                onChange={handleInputChange}
                className={errors.preferredTime ? "border-red-500" : ""}
              />
              {errors.preferredTime && (
                <p className="text-sm text-red-600">{errors.preferredTime}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">
              Message (Optional)
            </label>
            <Textarea
              id="message"
              placeholder="Tell us about your goals and what you'd like to discuss..."
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
            >
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
