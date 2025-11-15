'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/Button'
import VacancyCard from './ui/VacancyCard'
import QuestionnaireModal from './ui/QuestionnaireModal'
import { getVacanciesContent } from '@/lib/api'
import { VacanciesContent } from '@/lib/contentful'

interface VacanciesProps {
  limit?: number
}

export default function Vacancies({ limit }: VacanciesProps) {
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
            <div className="animate-pulse">
                <div className="flex justify-between items-center mb-10">
                    <div className="h-8 bg-gray-300 rounded w-32"></div>
                    <div className="h-10 bg-gray-300 rounded w-40"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-96 bg-gray-300 rounded"></div>
                    ))}
                </div>
            </div>
        )
    }

    if (!content) {
        return <div>Error loading content</div>
    }

    // Limit vacancies if limit prop is provided
    const displayedVacancies = limit ? content.vacancies?.slice(0, limit) : content.vacancies

    return (
        <div id='vacancies'>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-10">
                <p className='text-sm md:text-base text-orange-500'>{content.section}</p>
                {content.button && (
                    <div>
                        <Link href="/vacancies">
                            <Button variant="outline">{content.button}</Button>
                        </Link>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {displayedVacancies && displayedVacancies.map((vacancy, index) => (
                    <VacancyCard 
                        key={index} 
                        {...vacancy} 
                        onOpenModal={() => setIsModalOpen(true)}
                    />
                ))}
            </div>

            <QuestionnaireModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}

