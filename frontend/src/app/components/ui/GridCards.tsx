import React from 'react'
import FoundriesCard from './FoundriesCard'
import { Foundry } from '@/lib/contentful'

interface GridCardsProps {
  foundries: Foundry[]
}

export default function GridCards({ foundries }: GridCardsProps) {
  return (
    <div className="grid grid-rows-1 grid-cols-6 gap-6">
        {foundries?.map((data, index) => (
          <FoundriesCard key={index} {...data} />
        ))}
      </div>
  )
}
