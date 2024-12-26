"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Send, Upload } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePortfolio } from '@/app/context/PortfolioContext'
import ReactMarkdown from 'react-markdown'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function RevHouseAIPage() {
  const { portfolioData } = usePortfolio()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isUploading, setIsUploading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initial welcome message with portfolio data
  useEffect(() => {
    const welcomeMessage: Message = {
      role: 'assistant',
      content: `# Welcome to RevHouse.ai! 👋

**Current Portfolio Stats:**
- Average Nightly Rate: $${portfolioData.avgNightlyRate}
- Occupancy Rate: ${portfolioData.occupancy}%
- Total Revenue: $${portfolioData.totalRevenue}

*How can I help you optimize your revenue today?*`
    }
    setMessages([welcomeMessage])
  }, [portfolioData])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (content.trim() === '') return
    
    const newMessage: Message = { role: 'user', content }
    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/openai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
          portfolioContext: {
            totalRevenue: portfolioData.totalRevenue,
            avgNightlyRate: portfolioData.avgNightlyRate,
            occupancy: portfolioData.occupancy,
            avgListingRevenue: portfolioData.avgListingRevenue,
            bookingNumbers: portfolioData.bookingNumbers,
          }
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.content 
      }
      setMessages([...newMessages, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = { 
        role: 'assistant', 
        content: error instanceof Error 
          ? `Error: ${error.message}` 
          : 'Sorry, I encountered an error. Please try again later.'
      }
      setMessages([...newMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const predefinedQuestions = [
    "Analyze my property's performance",
    "Suggest pricing strategies",
    "Optimize my listing description"
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white">RevHouse.ai</h1>
        <Button
          onClick={() => setIsUploading(true)}
          variant="outline"
          className="bg-white/10 hover:bg-white/20 text-white"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Property Data
        </Button>
      </div>
      
      <p className="text-xl text-gray-300 mb-8">
        AI-Revenue Assistant, powered by the knowledge and conversations of leading revenue managers in the short-term rental industry.
      </p>

      <div className="flex flex-wrap gap-4 mb-8">
        {predefinedQuestions.map((question, index) => (
          <Button
            key={index}
            onClick={() => handleSendMessage(question)}
            className="bg-white/10 hover:bg-white/20 text-white text-sm"
          >
            {question}
          </Button>
        ))}
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
        <CardContent className="p-6 h-[400px] overflow-y-auto">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 ${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
            >
              <div className={`max-w-[70%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-orange-500/30 border-2 border-orange-500 text-white' 
                  : 'bg-green-500/30 border border-green-500 text-white'
              }`}>
                {message.role === 'user' ? (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <ReactMarkdown 
                    className="text-sm prose prose-invert max-w-none prose-headings:text-white prose-strong:text-white prose-em:text-white/90"
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="flex space-x-4">
        <Textarea
          placeholder="Ask RevHouse.ai a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[100px] resize-y"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              if (input.trim()) {
                handleSendMessage(input)
              }
            }
          }}
        />
        <Button 
          type="submit" 
          className="bg-orange-500 hover:bg-orange-600 text-white self-end"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send
            </>
          )}
        </Button>
      </form>

      <Dialog open={isUploading} onOpenChange={setIsUploading}>
        <DialogContent className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Upload Property Data</DialogTitle>
            <DialogDescription>
              Upload your property data CSV to get personalized insights from RevHouse.ai.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input type="file" accept=".csv" className="bg-white/10 border-white/20 text-white" />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsUploading(false)} variant="outline" className="bg-white/10 hover:bg-white/20 text-white">
              Skip
            </Button>
            <Button onClick={() => setIsUploading(false)} className="bg-orange-500 hover:bg-orange-600 text-white">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading && (
        <div className="flex justify-center items-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  )
} 