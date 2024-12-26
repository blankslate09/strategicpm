import React, { useState } from 'react'
import Link from 'next/link'
import { Zap, TrendingUp, Repeat } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const navItems = [
  {
    name: 'Optimize',
    icon: Zap,
    items: [
      { name: 'RevHouse.ai', href: '/optimize/revhouse-ai' },
      { name: 'Revenue Management', href: '/optimize/revenue-management' },
      { name: 'Lessons', href: '/optimize/lessons' },
    ],
  },
  {
    name: 'Growth',
    icon: TrendingUp,
    items: [
      { name: 'Local PMs', href: '/growth/local-pms' },
      { name: 'Management', href: '/management' },
      { name: 'Projections', href: '/projections' },
      { name: 'Underwriting', href: '/growth/underwriting' },
    ],
  },
  {
    name: 'Retention',
    icon: Repeat,
    items: [
      { name: 'Reports', href: '/report' },
      { name: 'CRM', href: '/retention/crm' },
    ],
  },
]

export function MobileBottomNav() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Popover key={item.name} open={activeItem === item.name} onOpenChange={(open) => setActiveItem(open ? item.name : null)}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <item.icon className="h-6 w-6" />
                <span className="sr-only">{item.name}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-screen mb-16 bg-white/10 backdrop-blur-md border-white/20">
              <div className="grid gap-4 p-4">
                <h3 className="font-medium text-white">{item.name}</h3>
                <div className="grid gap-2">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="text-gray-300 hover:text-white"
                      onClick={() => setActiveItem(null)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  )
} 