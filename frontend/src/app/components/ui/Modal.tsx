'use client'

import React, { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  maxWidth?: string
}

export default function Modal({ isOpen, onClose, children, maxWidth = 'max-w-6xl' }: ModalProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className={`bg-[#1c1c1c] ${maxWidth} w-full max-h-[90vh] overflow-y-auto relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors z-20 text-3xl font-light w-8 h-8 flex items-center justify-center cursor-pointer"
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

