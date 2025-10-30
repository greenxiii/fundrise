'use client'

import React, { useEffect, useState } from 'react'
import { getContactContent } from '@/lib/api'
import { ContactContent } from '@/lib/contentful'

export default function Contact() {
    const [content, setContent] = useState<ContactContent | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchContent() {
            try {
                const data = await getContactContent()
                setContent(data)
            } catch (error) {
                console.error('Error fetching Contact content:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchContent()
    }, [])

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="h-16 bg-gray-300 rounded w-3/4 mb-6"></div>
                <div className="h-24 bg-gray-300 rounded w-full mb-10"></div>
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-20 bg-gray-300 rounded"></div>
                    ))}
                </div>
            </div>
        )
    }

    if (!content) {
        return <div>Error loading content</div>
    }

    return (
        <div className="text-white">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 uppercase leading-tight text-center">
                {content.title}
            </h2>
            <p className="text-sm sm:text-base mb-6 md:mb-10 text-center max-w-3xl mx-auto px-4">
                {content.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3 md:gap-4">
                {/* Phone */}
                <div className="bg-[#1c1c1c] p-4 md:p-6 flex items-center justify-center md:col-span-2">
                    <span className="font-bold text-base md:text-lg">{content.phone}</span>
                </div>
                
                {/* Email - spans 2 columns */}
                <div className="bg-[#1c1c1c] p-4 md:p-6 flex items-center justify-center md:col-span-3">
                    <a 
                        href={`mailto:${content.email}`}
                        className="text-white underline hover:text-orange-400 transition-colors break-all"
                    >
                        {content.email}
                    </a>
                </div>
                
                {/* Instagram */}
                <div className="bg-[#1c1c1c] p-4 md:p-6 flex items-center justify-center">
                    {content.instagramUrl ? (
                        <a 
                            href={content.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center text-orange-400 hover:text-orange-500 transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                    ) : (
                        <div className="text-orange-400">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </div>
                    )}
                </div>
                
                {/* Facebook */}
                <div className="bg-[#1c1c1c] p-4 md:p-6 flex items-center justify-center">
                    {content.facebookUrl ? (
                        <a 
                            href={content.facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center text-orange-400 hover:text-orange-500 transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                    ) : (
                        <div className="text-orange-400">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

