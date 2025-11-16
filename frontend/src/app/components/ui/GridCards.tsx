'use client'

import React from 'react'
import FoundriesCard from './FoundriesCard'
import { Foundry } from '@/lib/contentful'

interface GridCardsProps {
  foundries: Foundry[]
  onOpenModal: (foundry: Foundry) => void
}

export default function GridCards({ foundries, onOpenModal }: GridCardsProps) {
  // Calculate variant based on count:
  // - If less than 5 cards: all vertical
  // - If 4+ cards: first two horizontal, rest vertical
  const getVariant = (index: number, total: number): 'horizontal' | 'vertical' => {
    if (total < 5) {
      return 'vertical'
    }
    // 4+ cards: first two are horizontal
    return index < 2 ? 'horizontal' : 'vertical'
  }

  // Adjust grid columns based on card count
  const gridClasses = foundries.length < 5
    ? 'grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'
    : 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6'

  const isLessThanFive = foundries.length < 5

  return (
    <div className={gridClasses}>
        {foundries?.map((data, index) => (
          <FoundriesCard 
            key={index} 
            {...data} 
            variant={getVariant(index, foundries.length)}
            isLessThanFive={isLessThanFive}
            onOpenModal={onOpenModal} 
          />
        ))}
      </div>
  )
}
