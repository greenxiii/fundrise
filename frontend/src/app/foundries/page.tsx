'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { HeaderNav } from '../components/common/HeaderNav'
import Footer from '../components/common/Footer'
import { Button } from '../components/ui/Button'
import GridCards from '../components/ui/GridCards'
import ContentModal from '../components/ui/ContentModal'
import { getImportantFoundriesContent } from '@/lib/api'
import { ImportantFoundriesContent, Foundry } from '@/lib/contentful'

export default function AllFoundriesPage() {
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
      <div>
        <HeaderNav showLogo={true} />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="animate-pulse text-white">Завантаження...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!content) {
    return (
      <div>
        <HeaderNav showLogo={true} />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-white">Помилка завантаження</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <HeaderNav showLogo={true} />
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-20">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="secondary" size="sm">
                ← Назад
              </Button>
            </Link>
          </div>
          
          {/* Title */}
          <div className="mb-10">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
              {content.section}
            </h1>
          </div>
          
          {/* Foundries grid */}
          <GridCards foundries={content.foundries} onOpenModal={handleOpenModal} />
        </div>
      </div>
      <Footer />

      <ContentModal 
        content={selectedFoundry ? { ...selectedFoundry, type: 'foundry' } : null} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  )
}

