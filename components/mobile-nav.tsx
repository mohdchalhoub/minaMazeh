"use client"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useEffect } from "react"

interface MobileNavProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function MobileNav({ isOpen, setIsOpen }: MobileNavProps) {
  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#courses", label: "Italian Courses" },
    { href: "#contact", label: "Contact" },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false)
        }
      }

      document.addEventListener("keydown", handleEscape)

      return () => {
        document.body.style.overflow = "unset"
        document.removeEventListener("keydown", handleEscape)
      }
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, setIsOpen])

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden p-2 hover:bg-muted/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <div className="relative w-5 h-5">
          <Menu
            className={`w-5 h-5 absolute transition-all duration-300 ${isOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"}`}
          />
          <X
            className={`w-5 h-5 absolute transition-all duration-300 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"}`}
          />
        </div>
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 transform transition-all duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
        }`}
        style={{
          backgroundColor: '#ffffff',
          borderLeft: '1px solid #e5e7eb'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: '#ffffff' }}
        />

        <div 
          className="relative z-10 flex items-center justify-between p-6 border-b"
          style={{
            backgroundColor: '#ffffff',
            borderBottomColor: '#e5e7eb'
          }}
        >
          <div 
            id="mobile-menu-title" 
            className="text-lg font-medium tracking-tight"
            style={{ color: '#111827' }}
          >
            Navigation
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-muted/50 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav 
          className="relative z-10 p-6" 
          role="navigation"
          style={{ backgroundColor: '#ffffff' }}
        >
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left text-lg font-light transition-all duration-200 py-3 px-4 rounded-md border border-transparent hover:border-gray-200"
                style={{ 
                  color: '#111827',
                  backgroundColor: 'transparent',
                  animationDelay: `${index * 50}ms`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#111827';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#111827';
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div 
          className="absolute bottom-0 left-0 right-0 p-6 border-t z-10"
          style={{
            backgroundColor: '#ffffff',
            borderTopColor: '#e5e7eb'
          }}
        >
          <div className="text-center space-y-4">
            <div 
              className="text-sm"
              style={{ color: '#4b5563' }}
            >
              Ready to start your journey?
            </div>
            <Button
              size="lg"
              className="w-full transition-all duration-200 hover:shadow-md"
              onClick={() => handleNavClick("#contact")}
            >
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
