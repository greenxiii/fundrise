'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { HeaderNav } from '../components/common/HeaderNav'
import Footer from '../components/common/Footer'
import { Button } from '../components/ui/Button'
import VacancyCard from '../components/ui/VacancyCard'
import QuestionnaireModal from '../components/ui/QuestionnaireModal'
import { getVacanciesContent } from '@/lib/api'
import { VacanciesContent } from '@/lib/contentful'

export default function AllVacanciesPage() {
  const [content, setContent] = useState<VacanciesContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await getVacanciesContent()
        setContent(data)
      } catch (error) {
        console.error('Error fetching Vacancies content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

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
          
          {/* Vacancies grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {content.vacancies && content.vacancies.map((vacancy, index) => (
              <VacancyCard 
                key={index} 
                {...vacancy} 
                onOpenModal={() => setIsModalOpen(true)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />

      <QuestionnaireModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

