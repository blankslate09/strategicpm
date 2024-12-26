import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { BarChart, Gem, TrendingUp, Crown, Award } from 'lucide-react'

type Tag = 'Local Property Managers' | 'Largest' | 'Boutique' | 'Highest Occupied' | 'Luxury' | 'Preferred Platforms'

interface TagCarouselProps {
  onTagSelect: (tag: Tag) => void
  selectedTag: Tag
}

export function TagCarousel({ onTagSelect, selectedTag }: TagCarouselProps) {
  const tags: Tag[] = [
    'Local Property Managers',
    'Largest',
    'Boutique',
    'Highest Occupied',
    'Luxury',
    'Preferred Platforms'
  ]

  const getTagIcon = (tag: Tag) => {
    switch (tag) {
      case 'Largest': return <BarChart className="h-4 w-4 mr-2" />
      case 'Boutique': return <Gem className="h-4 w-4 mr-2" />
      case 'Highest Occupied': return <TrendingUp className="h-4 w-4 mr-2" />
      case 'Luxury': return <Crown className="h-4 w-4 mr-2" />
      case 'Preferred Platforms': return <Award className="h-4 w-4 mr-2" />
      default: return null
    }
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border border-white/20">
      <div className="flex w-max space-x-4 p-4">
        {tags.map((tag) => (
          <Button
            key={tag}
            onClick={() => onTagSelect(tag)}
            variant={selectedTag === tag ? "default" : "outline"}
            className={`flex items-center ${
              selectedTag === tag 
                ? 'bg-orange-500 text-white' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {getTagIcon(tag)}
            {tag}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

