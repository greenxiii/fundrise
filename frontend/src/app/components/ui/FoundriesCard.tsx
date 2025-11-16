'use client'

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Button } from './Button'
import { Foundry } from '@/lib/contentful'

type FoundriesCardProps = Foundry & {
  variant: 'horizontal' | 'vertical'
  isLessThanFive?: boolean
  onOpenModal: (foundry: Foundry) => void
}

const FoundriesCard = ({ title, description, image, variant, url, isLessThanFive, onOpenModal }: FoundriesCardProps) => {
  const isVertical = variant === 'vertical';
  // Ensure single column on mobile to avoid implicit grid columns on the parent
  // When less than 5 cards, vertical cards span 1 column (for 3-column grid)
  // When 5+ cards, vertical cards span 2 columns (for 6-column grid)
  const containerClasses = isVertical
    ? isLessThanFive 
      ? 'grid-cols-1 md:col-span-1'
      : 'grid-cols-1 md:row-start-2 md:col-span-2'
    : 'grid-cols-1 sm:grid-cols-2 md:row-start-1 md:col-span-3'

  // Truncate description for preview (first 100 characters)
  const previewText = description.length > 100 
    ? description.substring(0, 100) + '...' 
    : description

  // Hardcoded button text
  const buttonText = 'Задонатити'

  const handleClick = () => {
    onOpenModal({ title, description, image, url })
  }

  // Determine if URL is external (starts with http:// or https://)
  const isExternalUrl = url?.startsWith('http://') || url?.startsWith('https://')
  
  // Render button with link if URL exists
  const DonateButton = url ? (
    isExternalUrl ? (
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
        <Button 
          variant="default" 
          className="self-start cursor-pointer"
        >
          {buttonText}
        </Button>
      </a>
    ) : (
      <Link href={url}>
        <Button 
          variant="default" 
          className="self-start cursor-pointer"
        >
          {buttonText}
        </Button>
      </Link>
    )
  ) : (
    <Button 
      variant="default" 
      className="self-start cursor-pointer"
    >
      {buttonText}
    </Button>
  )

  return (
    <div className={`text-white ${containerClasses} h-full`}>
        <div className="relative w-full h-auto md:h-[500px]">
          <Image 
            src={image.url} 
            alt={image.title || "important foundries"} 
            className="object-contain w-full h-auto md:object-cover md:h-full" 
            width={800}
            height={600}
          />
        </div>
        <div className="gap-6 md:gap-10 bg-[#1c1c1c] p-6 md:p-10 flex flex-col w-full">
          <div className='flex flex-col gap-5'>
            <p className='text-xl md:text-2xl font-bold'>{title}</p>
            <p className='text-sm md:text-base line-clamp-3 whitespace-pre-line'>{previewText}</p>
          </div>
          <div className='flex gap-4 flex-wrap'>
            {DonateButton}
            <Button 
              variant="secondary" 
              className="self-start"
              onClick={handleClick}
            >
              Деталі
            </Button>
          </div>
        </div>
    </div>
  )
}

export default FoundriesCard