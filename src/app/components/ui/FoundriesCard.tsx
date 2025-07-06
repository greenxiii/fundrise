import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'
import { Button } from './Button'

const FoundriesCard = ({ title, description, image, variant, button }: { title: string, description: string, image: string | StaticImport, variant: string, size?: string, button: string }) => {
  const isVertical = variant === 'vertical';
  const containerClasses = isVertical ? 'grid-cols-1 row-start-2 col-span-2' : 'grid-cols-2 row-start-1 col-span-3'

  return (
    <div className={`text-white grid ${containerClasses}`}>
        <Image src={image} alt="important foundries" className="object-cover h-full w-full" />
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