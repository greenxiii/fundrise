'use client'

import Image from 'next/image'
import React from 'react'
import { Button } from './Button'
import { Foundry } from '@/lib/contentful'

type FoundriesCardProps = Foundry & {
  onOpenModal: (foundry: Foundry) => void
}

const FoundriesCard = ({ title, description, image, variant, button, size, onOpenModal }: FoundriesCardProps) => {
  const isVertical = variant === 'vertical';
  // Ensure single column on mobile to avoid implicit grid columns on the parent
  const containerClasses = isVertical
    ? 'grid-cols-1 md:row-start-2 md:col-span-2'
    : 'grid-cols-1 sm:grid-cols-2 md:row-start-1 md:col-span-3'

  // Truncate description for preview (first 100 characters)
  const previewText = description.length > 100 
    ? description.substring(0, 100) + '...' 
    : description

  const handleClick = () => {
    onOpenModal({ title, description, image, variant, button, size: size || 'medium' })
  }

  return (
    <div className={`text-white grid ${containerClasses}`}>
        <Image 
          src={image.url} 
          alt={image.title || "important foundries"} 
          className="object-cover h-full w-full" 
          width={400}
          height={300}
        />
        <div className="gap-6 md:gap-10 bg-[#1c1c1c] p-6 md:p-10 flex flex-col w-full">
          <div className='flex flex-col gap-5'>
            <p className='text-xl md:text-2xl font-bold'>{title}</p>
            <p className='text-sm md:text-base line-clamp-3'>{previewText}</p>
          </div>
          <div className='flex gap-4 flex-wrap'>
            {button && (
              <Button 
                variant="default" 
                className="self-start cursor-pointer"
              >
                {button}
              </Button>
            )}
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