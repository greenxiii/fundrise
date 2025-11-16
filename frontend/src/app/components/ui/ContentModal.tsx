'use client'

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
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
  // Use report's title if available, otherwise use foundry's title
  const title = content.title || ''
  // Hardcoded button text for foundries
  const buttonText = isReport ? 'Задонатити' : 'Задонатити'
  
  // Get URL for foundries (reports don't have URL)
  const url = !isReport && 'url' in content ? content.url : undefined
  const isExternalUrl = url?.startsWith('http://') || url?.startsWith('https://')

  // Render button with link if URL exists
  const DonateButton = url ? (
    isExternalUrl ? (
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
        <Button 
          variant="default"
          size="default"
          className="w-full md:w-auto self-start"
        >
          {buttonText}
        </Button>
      </a>
    ) : (
      <Link href={url}>
        <Button 
          variant="default"
          size="default"
          className="w-full md:w-auto self-start"
        >
          {buttonText}
        </Button>
      </Link>
    )
  ) : (
    <Button 
      variant="default"
      size="default"
      className="w-full md:w-auto self-start"
    >
      {buttonText}
    </Button>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image side - with padding, on top on mobile */}
        <div className="bg-[#1c1c1c] p-4 md:p-6 lg:p-8 order-1">
          <div className="relative w-full aspect-square md:aspect-auto md:h-full min-h-[300px] md:min-h-[500px]">
            <Image
              src={content.image.url}
              alt={content.image.title || content.title || 'Content image'}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right side - Title, Description, CTA */}
        <div className="p-6 md:p-8 flex flex-col bg-[#1c1c1c] order-2">
          {title && (
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
              {title}
            </h3>
          )}
          
          <div className="text-white text-sm md:text-base leading-relaxed mb-8 flex-grow whitespace-pre-line px-4">
            {content.description}
          </div>

          {/* Donate button - only show for foundries, not reports */}
          {!isReport && DonateButton}
        </div>
      </div>
    </Modal>
  )
}

