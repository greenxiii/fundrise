'use client'

import React, { useEffect, useState } from 'react'
import { Button } from './ui/Button'
import CollapseBlock from './ui/CollapseBlock'
import { getPaymentDetailsContent } from '@/lib/api'
import { PaymentDetailsContent } from '@/lib/contentful'

export default function PaymentOptions() {
    const [content, setContent] = useState<PaymentDetailsContent | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchContent() {
            try {
                const data = await getPaymentDetailsContent()
                setContent(data)
            } catch (error) {
                console.error('Error fetching Payment Details content:', error)
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
                        <div className="h-10 bg-gray-300 rounded w-48"></div>
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
        <div id="charity">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
                <p className='text-sm md:text-base text-orange-400 md:col-span-1'>{content.section}</p>
                <div className='md:col-span-2'>
                    <p className='text-white text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight'>
                        {content.title}
                    </p>
                    {content.button && (
                        <Button 
                            variant="outline" 
                            className="self-start mt-6 md:mt-12 cursor-pointer"
                        >
                            {content.button}
                        </Button>
                    )}
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-10 md:mt-22'>
                {content.paymentMethods.map((option, index) => (
                    <CollapseBlock key={index} title={option.title} content={option.content} />
                ))}
            </div>
        </div>
    )
}
