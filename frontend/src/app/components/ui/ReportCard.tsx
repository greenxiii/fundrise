'use client'

import Image from 'next/image'
import React from 'react'
import { Button } from './Button'
import { Report } from '@/lib/contentful'

type ReportCardProps = Report & {
  onOpenModal: (report: Report) => void
}

const ReportCard = ({ title, description, image, date, onOpenModal }: ReportCardProps) => {
  
  // Truncate description for preview (first 100 characters)
  const previewText = description.length > 100 
    ? description.substring(0, 100) + '...' 
    : description

  const handleClick = () => {
    onOpenModal({ title, description, image, date: date || '' })
  }
  
  return (
    <div className="text-white h-full">
      <div className="relative w-full h-auto md:h-[300px]">
        <Image 
          src={image.url} 
          alt={image.title || "report image"} 
          className="object-contain w-full h-auto md:object-cover md:h-full" 
          width={800}
          height={600}
        />
      </div>
      <div className="gap-6 md:gap-10 bg-[#1c1c1c] p-6 md:p-10 flex flex-col w-full">
        <div className='flex flex-col gap-5'>
          {title && (
            <p className='text-xl md:text-2xl font-bold'>{title}</p>
          )}
          <p className='text-sm md:text-base line-clamp-3 whitespace-pre-line'>{previewText}</p>
        </div>
        <Button 
          variant="secondary" 
          className="self-start"
          onClick={handleClick}
        >
          Деталі
        </Button>
      </div>
    </div>
  )
}

export default ReportCard

