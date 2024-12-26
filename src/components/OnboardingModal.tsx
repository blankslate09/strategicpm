"use client"

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, ArrowRight, ArrowLeft, Check, X, Camera, Shield, PenToolIcon as Tool, Briefcase, Zap, Users, Gift, Wifi, Key } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, TrendingUp, MessageSquare, ClipboardCheck, Sparkles, Headphones } from 'lucide-react'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (data: OnboardingData) => void
  initialSection?: 'about' | 'projections' | null
}

export interface OnboardingData {
  companyName: string
  companyDescription: string
  websiteUrl: string
  listingSample: string
  selectedServices: string[]
}

const steps = [
  "Company Name",
  "Company Description",
  "Website & Listing",
  "Services"
]

const services = [
  { icon: Home, title: 'Smart Home Technology', description: 'See who is coming and going and swiftly check in guests' },
  { icon: TrendingUp, title: 'Revenue Management', description: 'Maximize your income with industry leading pricing strategies' },
  { icon: MessageSquare, title: 'Expert Marketing', description: 'More bookings using our sophisticated marketing tactics' },
  { icon: ClipboardCheck, title: 'Property Inspections', description: 'Our 50-touch point inspection ensures your property is in perfection' },
  { icon: Sparkles, title: 'Housekeeping Pros', description: 'A reliable experience: professional cleaning, flawless homes' },
  { icon: Headphones, title: 'Local Support', description: 'Our expert local team is here to help you and your home, anytime' },
  { icon: Camera, title: 'Professional Photography', description: 'Showcase your property with stunning, professional photos' },
  { icon: Shield, title: 'Insurance Coverage', description: 'Comprehensive protection for your property and guests' },
  { icon: Tool, title: 'Maintenance Services', description: 'Keep your property in top condition with our maintenance team' },
  { icon: Briefcase, title: 'Business Licensing', description: 'We handle all necessary permits and licenses for your rental' },
  { icon: Zap, title: 'Dynamic Pricing', description: 'Optimize your rates based on market demand and events' },
  { icon: Users, title: 'Guest Screening', description: 'Thorough vetting process for all potential guests' },
  { icon: Gift, title: 'Welcome Packages', description: 'Delight your guests with curated welcome gifts' },
  { icon: Wifi, title: 'High-Speed Internet', description: 'Ensure your guests stay connected with fast, reliable WiFi' },
  { icon: Key, title: 'Keyless Entry', description: 'Secure and convenient access for your guests' }
]

export function OnboardingModal({ isOpen, onClose, onComplete, initialSection }: OnboardingModalProps) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<OnboardingData>({
    companyName: "",
    companyDescription: "",
    websiteUrl: "",
    listingSample: "",
    selectedServices: []
  })
  const [showAccountStep, setShowAccountStep] = useState(false)

  useEffect(() => {
    if (initialSection === 'about') {
      setStep(0)
    } else if (initialSection === 'projections') {
      setStep(2)
    }
  }, [initialSection])

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else if (!showAccountStep) {
      setShowAccountStep(true)
    } else {
      onComplete(data)
      onClose()
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleChange = (field: keyof OnboardingData, value: string | string[]) => {
    setData({ ...data, [field]: value })
  }

  const toggleService = (service: string) => {
    setData(prev => {
      const newSelectedServices = prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service];
      
      // Ensure we don't exceed 9 services
      return {
        ...prev,
        selectedServices: newSelectedServices.slice(0, 9)
      };
    });
  }

  const handleComplete = () => {
    onComplete(data)
    onClose()
  }

  const renderStep = () => {
    if (showAccountStep) {
      return (
        <div className="space-y-6">
          <p className="text-white text-lg">Create an account or sign in to complete your onboarding.</p>
          <div className="flex space-x-4">
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-lg py-6">
              Create Account
            </Button>
            <Button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-lg py-6">
              Sign In
            </Button>
          </div>
        </div>
      )
    }

    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <Label htmlFor="companyName" className="text-white text-lg">Company Name</Label>
            <Input
              id="companyName"
              value={data.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              placeholder="Enter your company name"
              className="bg-white/5 border-white/10 text-white text-lg p-6"
            />
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="companyDescription" className="text-white text-lg">Company Description</Label>
            <Textarea
              id="companyDescription"
              value={data.companyDescription}
              onChange={(e) => handleChange('companyDescription', e.target.value)}
              placeholder="Describe your company"
              className="bg-white/5 border-white/10 text-white text-lg p-4"
              rows={6}
            />
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="websiteUrl" className="text-white text-lg">Website URL</Label>
              <Input
                id="websiteUrl"
                value={data.websiteUrl}
                onChange={(e) => handleChange('websiteUrl', e.target.value)}
                placeholder="https://www.example.com"
                className="bg-white/5 border-white/10 text-white text-lg p-6 mt-2"
              />
            </div>
            <div>
              <Label htmlFor="listingSample" className="text-white text-lg">Listing Sample URL</Label>
              <Input
                id="listingSample"
                value={data.listingSample}
                onChange={(e) => handleChange('listingSample', e.target.value)}
                placeholder="https://www.airbnb.com/rooms/12345"
                className="bg-white/5 border-white/10 text-white text-lg p-6 mt-2"
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <Label className="text-white text-lg">Select Services (Max 9)</Label>
            <ScrollArea className="h-[400px] w-full pr-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-2">Currently Displayed ({data.selectedServices.length}/9)</h3>
                  <div className="grid grid-cols-2 gap-4 pb-4">
                    {data.selectedServices.map((serviceTitle, index) => {
                      const service = services.find(s => s.title === serviceTitle);
                      if (!service) return null;
                      return (
                        <Card
                          key={index}
                          className="w-full p-4 rounded-lg transition-colors cursor-pointer bg-orange-500/20 border-orange-500"
                        >
                          <div className="flex flex-col h-full">
                            <div className="flex justify-between items-start">
                              <service.icon className="w-10 h-10 text-orange-400 mb-4" />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-auto"
                                onClick={() => toggleService(service.title)}
                              >
                                <X className="h-4 w-4 text-gray-400" />
                              </Button>
                            </div>
                            <h3 className="text-sm font-semibold text-white mb-2">{service.title}</h3>
                            <p className="text-xs text-gray-300">{service.description}</p>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-2">Add Services</h3>
                  <div className="grid grid-cols-2 gap-4 pb-4">
                    {services.filter(service => !data.selectedServices.includes(service.title)).map((service, index) => (
                      <Card
                        key={index}
                        className={`w-full p-4 rounded-lg transition-colors cursor-pointer ${
                          data.selectedServices.length >= 9
                            ? 'bg-gray-500/20 border-gray-500 cursor-not-allowed'
                            : 'bg-white/5 hover:bg-white/10 border-white/20'
                        }`}
                        onClick={() => {
                          if (data.selectedServices.length < 9) {
                            toggleService(service.title);
                          }
                        }}
                      >
                        <div className="flex flex-col h-full">
                          <service.icon className="w-10 h-10 text-orange-400 mb-4" />
                          <h3 className="text-sm font-semibold text-white mb-2">{service.title}</h3>
                          <p className="text-xs text-gray-300">{service.description}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <p className="text-white text-lg">Create an account or sign in to complete your onboarding.</p>
            <div className="flex space-x-4">
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-lg py-6">
                Create Account
              </Button>
              <Button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-lg py-6">
                Sign In
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white/10 backdrop-blur-md border-white/20 p-0 overflow-hidden">
        <Card className="border-0 bg-transparent">
          <CardContent className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white mb-2">{initialSection ? `Edit ${initialSection === 'about' ? 'About' : 'Projections'}` : 'Welcome to STRategy'}</DialogTitle>
              <DialogDescription className="text-gray-300">
                Let's set up your account in a few easy steps
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 mb-8">
              <Progress value={(step + 1) / steps.length * 100} className="h-2 bg-white/20">
                <div className="h-full bg-orange-500" style={{ width: `${(step + 1) / steps.length * 100}%` }} />
              </Progress>
              <div className="flex justify-between mt-2">
                {steps.map((stepName, index) => (
                  <div
                    key={stepName}
                    className={`text-xs ${index === step ? 'text-orange-500 font-semibold' : 'text-gray-400'}`}
                  >
                    {stepName}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6 mb-6">
              {renderStep()}
            </div>
            <DialogFooter>
              <div className="flex justify-between w-full">
                {step > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className={`bg-white/10 text-white hover:bg-white/20 ${showAccountStep ? 'invisible' : ''}`}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
                <Button onClick={step === steps.length - 1 ? handleComplete : handleNext} className="bg-orange-500 hover:bg-orange-600 text-white">
                  {step === steps.length - 1 ? 'Complete' : 'Next'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </DialogFooter>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

