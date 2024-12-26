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
  const [openPopover, setOpenPopover] = useState<string | null>(null)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Popover key={item.name} open={openPopover === item.name} onOpenChange={(isOpen) => setOpenPopover(isOpen ? item.name : null)}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="flex flex-col items-center text-white">
                <item.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-screen max-w-[300px] p-0" align="center">
              <div className="grid gap-4 p-4">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className="flex items-center space-x-2"
                    onClick={() => setOpenPopover(null)}
                  >
                    <div>
                      <p className="font-medium">{subItem.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  )
}

