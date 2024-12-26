"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { PortfolioProvider } from './context/PortfolioContext'
import { Menu, ChevronDown, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react'
import { Footer } from './components/Footer'
import { MobileBottomNav } from './components/MobileBottomNav'

const inter = Inter({ subsets: ['latin'] })

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

interface NavDropdownProps {
  title: string
  items: {
    name: string
    href: string
    badge?: string
  }[]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const NavLink = ({ href, children, className }: NavLinkProps) => (
    <Link href={href} className={`text-sm font-medium text-gray-300 hover:text-white ${className || ''}`}>
      {children}
    </Link>
  )

  const NavDropdown = ({ title, items }: NavDropdownProps) => (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm font-medium text-gray-300 hover:text-white flex items-center">
        {title} <ChevronDown className="ml-1 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white/10 backdrop-blur-md border-white/20 rounded-lg overflow-hidden text-white">
        {items.map((item, index) => (
          <DropdownMenuItem key={index} className="hover:bg-white/20 focus:bg-white/20">
            <Link href={item.href} className="flex items-center justify-between w-full">
              {item.name}
              {item.badge && (
                <span className={`ml-2 px-2 py-1 text-xs ${
                  item.badge === 'PRO' ? 'bg-blue-500' : 'bg-gray-500'
                } rounded-full`}>
                  {item.badge}
                </span>
              )}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          {/* Background grid and animations */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
          <div className="absolute inset-0 overflow-hidden">
            {/* Green streaks moving downward */}
            {[...Array(10)].map((_, i) => (
              <div
                key={`green-streak-${i}`}
                className="absolute w-px h-40 bg-gradient-to-b from-transparent via-green-500 to-transparent"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  opacity: 0,
                  animation: `greenStreak ${8 + Math.random() * 4}s ${i * 0.5}s infinite linear`
                }}
              />
            ))}
            {/* Orange streaks moving upward */}
            {[...Array(10)].map((_, i) => (
              <div
                key={`orange-line-${i}`}
                className="absolute w-px h-40 bg-gradient-to-t from-transparent via-orange-500 to-transparent"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '-10%',
                  opacity: 0,
                  animation: `orangeLine ${6 + Math.random() * 4}s ${i * 0.4}s infinite linear`
                }}
              />
            ))}
          </div>

          <PortfolioProvider>
            <div className="relative min-h-full flex flex-col">
              {/* Navigation */}
              <nav className="bg-white/20 backdrop-blur-md border-b border-white/20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                      <Link href="/" className="flex items-center">
                        <svg className="h-8 w-auto mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-2xl font-bold text-white tracking-wider md:inline hidden">STRategy</span>
                      </Link>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                      <NavDropdown 
                        title="Optimize" 
                        items={[
                          { name: 'RevHouse.ai', href: '/optimize/revhouse-ai', badge: 'PRO' },
                        ]} 
                      />
                      <NavDropdown title="Growth" items={[]} />
                      <NavDropdown title="Retention" items={[]} />
                      <NavLink href="/pricing">Pricing</NavLink>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center space-x-4">
                      <NavLink href="/signin" className="md:hidden">Sign In</NavLink>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white"
                      >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </nav>

              {/* Mobile menu */}
              {mobileMenuOpen && (
                <div className="md:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1 bg-white/20 backdrop-blur-md">
                    <NavLink href="/optimize/revhouse-ai">RevHouse.ai</NavLink>
                    <NavLink href="/pricing">Pricing</NavLink>
                  </div>
                </div>
              )}

              {/* Main content */}
              <main className="flex-grow">
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                  {children}
                </div>
              </main>

              <Footer />
              <MobileBottomNav />
            </div>
          </PortfolioProvider>
        </div>
      </body>
    </html>
  )
}

