'use client'

import React, { useEffect, useState } from 'react'
import GridCards from './ui/GridCards'
import { getImportantFoundriesContent } from '@/lib/api'
import { ImportantFoundriesContent } from '@/lib/contentful'

export default function ImportantFoundries() {
  const [content, setContent] = useState<ImportantFoundriesContent | null>(null)
  const [loading, setLoading] = useState(true)

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

  return (
    <div id='fundraising' className='grid gap-10'>
      <p className='text-1xl text-orange-500'>{content.section}</p>
      <GridCards foundries={content.foundries} />
    </div>
  )
}
