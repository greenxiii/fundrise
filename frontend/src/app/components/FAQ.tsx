'use client'

import React, { useEffect, useState } from 'react'
import CollapseBlock from './ui/CollapseBlock'
import { getFAQContent } from '@/lib/api'
import { FAQContent } from '@/lib/contentful'

export default function FAQ() {
    const [content, setContent] = useState<FAQContent | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchContent() {
            try {
                const data = await getFAQContent()
                setContent(data)
            } catch (error) {
                console.error('Error fetching FAQ content:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchContent()
    }, [])

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="grid grid-cols-3">
                    <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
                    <div className="col-span-2">
                        <div className="h-16 bg-gray-300 rounded w-3/4 mb-4"></div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-22">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-32 bg-gray-300 rounded"></div>
                    ))}
                </div>
            </div>
        )
    }

    if (!content) {
        return <div>Error loading content</div>
    }

    return (
        <div id='questions'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
                <p className='text-sm md:text-base text-orange-500 col-span-1'>{content.section}</p>
                <div className='md:col-span-2'>
                    <p className='text-white text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight'>
                        {content.title}
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-10 md:mt-22'>
                {content.questions.map((question, index) => (
                    <CollapseBlock key={index} title={question.title} content={question.content} />
                ))}
            </div>
        </div>
    )
}

