import React from 'react'
import FoundriesCard from './FoundriesCard'
import { Foundry } from '@/lib/contentful'

interface GridCardsProps {
  foundries: Foundry[]
}

export default function GridCards({ foundries }: GridCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {foundries?.map((data, index) => (
          <FoundriesCard key={index} {...data} />
        ))}
      </div>
  )
}
