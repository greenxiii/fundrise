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
        <div>
            <div className='grid grid-cols-3'>
                <p className='text-1xl text-orange-400 col-span-1'>{content.section}</p>
                <div className='col-span-2'>
                    <p className='text-white text-6xl font-bold'>{content.title}</p>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-6 mt-22'>
                {content.questions.map((question, index) => (
                    <CollapseBlock key={index} title={question.title} content={question.content} />
                ))}
            </div>
        </div>
    )
}

