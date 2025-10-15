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
            <p className='text-1xl text-orange-400'>{content.section}</p>
            <div className='relative mt-10'>
                <span className='text-7xl text-4xl font-bold text-white'>
                    <p>{content.header.title}</p>
                    <p>{content.header.subtitle}</p>
                    <Button variant='outline' className='absolute right-0 bottom-0'>{content.button}</Button>
                </span>
               
            </div>
            <div className='grid grid-cols-3 gap-10'>
                {content.descriptionBlocks.map((block, index) => (
                    <div key={index} className='p-10 bg-[#1c1c1c] mt-10 break-words text-sm'>
                        <p className='text-white text-1xl '>
                            {block.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
