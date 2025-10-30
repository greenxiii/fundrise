'use client'

import React, { useEffect, useState } from 'react'
import { getReportsContent } from '@/lib/api'
import { ReportsContent } from '@/lib/contentful'
import ReportsGridCards from './ui/ReportsGridCards'

export default function Reports() {
    const [content, setContent] = useState<ReportsContent | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchContent() {
            try {
                const data = await getReportsContent()
                setContent(data)
            } catch (error) {
                console.error('Error fetching Reports content:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchContent()
    }, [])

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className='grid gap-10 grid-cols-3 mb-10'>
                    <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
                    <div className="col-span-2">
                        <div className="h-16 bg-gray-300 rounded w-3/4 mb-4"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

    return (
        <div className='grid gap-8 md:gap-10 text-white'>
            <div className='grid gap-4 md:gap-10 grid-cols-1 md:grid-cols-3'>
                <p className='text-sm md:text-base text-orange-400 md:col-span-1'>{content.section}</p>
                <div className='md:col-span-2'>
                    <p className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold break-normal leading-tight md:leading-[72px] lg:leading-[82px]'>
                        {content.title} <br />
                        {content.subtitle && <span className='text-orange-400'>{content.subtitle}</span>}
                    </p>
                </div>
            </div>
            
            {content.reports && content.reports.length > 0 && (
                <ReportsGridCards reports={content.reports} />
            )}
        </div>
    )
}

