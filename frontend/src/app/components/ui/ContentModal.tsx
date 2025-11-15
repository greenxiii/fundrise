'use client'

import Image from 'next/image'
import React from 'react'
import Modal from './Modal'
import { Button } from './Button'
import { Report, Foundry } from '@/lib/contentful'

type ModalContent = (Report & { type: 'report' }) | (Foundry & { type: 'foundry' })

interface ContentModalProps {
  content: ModalContent | null
  isOpen: boolean
  onClose: () => void
}

export default function ContentModal({ content, isOpen, onClose }: ContentModalProps) {
  if (!content) return null

  const isReport = content.type === 'report'
  const title = isReport ? 'Збір на очі' : content.title
  const buttonText = isReport ? 'Задонатити' : (content.button || 'Задонатити')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image side - with padding, on top on mobile */}
        <div className="bg-[#1c1c1c] p-4 md:p-6 lg:p-8 order-1">
          <div className="relative w-full aspect-square md:aspect-auto md:h-full min-h-[300px] md:min-h-[500px]">
            <Image
              src={content.image.url}
              alt={content.image.title || content.title}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right side - Title, Description, CTA */}
        <div className="p-6 md:p-8 flex flex-col bg-[#1c1c1c] order-2">
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
            {title}
          </h3>
          
          <div className="text-white text-sm md:text-base leading-relaxed mb-8 flex-grow">
            {content.description}
          </div>

          {/* Donate button */}
          <Button 
            variant="default"
            size="default"
            className="w-full md:w-auto self-start"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

