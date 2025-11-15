'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import GridCards from './ui/GridCards'
import { Button } from './ui/Button'
import { getImportantFoundriesContent } from '@/lib/api'
import { ImportantFoundriesContent, Foundry } from '@/lib/contentful'
import ContentModal from './ui/ContentModal'

interface ImportantFoundriesProps {
  limit?: number
}

export default function ImportantFoundries({ limit }: ImportantFoundriesProps) {
  const [content, setContent] = useState<ImportantFoundriesContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedFoundry, setSelectedFoundry] = useState<Foundry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await getImportantFoundriesContent()
        setContent(data)
      } catch (error) {
        console.error('Error fetching Important Foundries content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  const handleOpenModal = (foundry: Foundry) => {
    setSelectedFoundry(foundry)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedFoundry(null)
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
        <div className="grid grid-rows-1 grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!content) {
    return <div>Error loading content</div>
  }

  // Limit foundries if limit prop is provided
  const displayedFoundries = limit ? content.foundries.slice(0, limit) : content.foundries

  return (
    <>
      <div id='fundraising' className='grid gap-10'>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <p className='text-sm md:text-base text-orange-500'>{content.section}</p>
          {content.button && (
            <div>
              <Link href="/foundries">
                <Button variant="outline">{content.button}</Button>
              </Link>
            </div>
          )}
        </div>
        <GridCards foundries={displayedFoundries} onOpenModal={handleOpenModal} />
      </div>

      <ContentModal 
        content={selectedFoundry ? { ...selectedFoundry, type: 'foundry' } : null} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  )
}
