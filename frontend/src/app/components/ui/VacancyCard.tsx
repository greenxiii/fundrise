import Image from 'next/image'
import React from 'react'
import { Button } from './Button'
import { Vacancy } from '@/lib/contentful'

type VacancyCardProps = Vacancy & {
  onOpenModal?: () => void
}

const VacancyCard = ({ title, description, image, contract, salary, age, onOpenModal }: VacancyCardProps) => {
  if (!image || !image.url) {
    return null
  }
  
  // Hardcoded button text
  const buttonText = 'Долучитись'
  
  return (
    <div className="text-white relative bg-[#1c1c1c] overflow-hidden h-full flex flex-col">
      <div className="relative w-full h-64">
        <Image 
          src={image.url} 
          alt={image.title || "vacancy image"} 
          className="object-cover h-full w-full" 
          width={400}
          height={256}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
          {contract && (
            <span className="bg-yellow-500 text-black px-3 py-1 text-xs font-medium w-fit">
              {contract}
            </span>
          )}
          {salary && (
            <span className="bg-yellow-500 text-black px-3 py-1 text-xs font-medium w-fit">
              {salary}
            </span>
          )}
          {age && (
            <span className="border border-yellow-500 text-yellow-500 px-3 py-1 text-xs font-medium w-fit">
              {age}
            </span>
          )}
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4 flex-grow">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm text-gray-300 flex-grow">{description}</p>
        <Button 
          variant="default" 
          className="self-start w-fit"
          onClick={onOpenModal}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

export default VacancyCard

