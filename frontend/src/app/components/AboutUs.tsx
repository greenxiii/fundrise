'use client'

import React, { useEffect, useState } from 'react'
import { Button } from './ui/Button'
import { getAboutUsContent } from '@/lib/api'
import { AboutUsContent } from '@/lib/contentful'

export default function AboutUs() {
    const [content, setContent] = useState<AboutUsContent | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchContent() {
            try {
                const data = await getAboutUsContent()
                setContent(data)
            } catch (error) {
                console.error('Error fetching About Us content:', error)
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
                <div className="h-16 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="grid grid-cols-3 gap-10">
                    {[1, 2, 3].map((i) => (
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
            <p className='text-sm md:text-base text-orange-400'>{content.section}</p>
            <div className='relative mt-6 md:mt-10'>
                <span className='font-bold text-white'>
                    <p className='text-2xl sm:text-4xl md:text-5xl lg:text-7xl leading-tight md:leading-snug'>
                        {content.header.title}
                    </p>
                    <p className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight md:leading-snug'>
                        {content.header.subtitle}
                    </p>
                    {content.button && (
                        <Button 
                            variant='outline' 
                            className='mt-6 md:mt-0 md:absolute md:right-0 md:bottom-0 cursor-pointer'
                        >
                            {content.button}
                        </Button>
                    )}
                </span>
               
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10'>
                {content.descriptionBlocks.map((block, index) => (
                    <div key={index} className='p-6 md:p-8 lg:p-10 bg-[#1c1c1c] mt-6 md:mt-10 break-words text-sm'>
                        <p className='text-white text-base'>
                            {block.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
