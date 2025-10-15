import Image from 'next/image'
import React from 'react'
import { Button } from './Button'
import { Foundry } from '@/lib/contentful'

type FoundriesCardProps = Foundry

const FoundriesCard = ({ title, description, image, variant, button }: FoundriesCardProps) => {
  const isVertical = variant === 'vertical';
  const containerClasses = isVertical ? 'grid-cols-1 row-start-2 col-span-2' : 'grid-cols-2 row-start-1 col-span-3'

  return (
    <div className={`text-white grid ${containerClasses}`}>
        <Image 
          src={image.url} 
          alt={image.title || "important foundries"} 
          className="object-cover h-full w-full" 
          width={400}
          height={300}
        />
        <div className="gap-10 bg-[#1c1c1c] p-10 flex flex-col w-full">
          <div className='flex flex-col gap-5'>
            <p className='text-2xl font-bold'>{title}</p>
            <p className='text-sm'>{description}</p>
          </div>
          <Button variant="outline" className={`self-start`}>{button}</Button>
        </div>
    </div>
  )
}

export default FoundriesCard