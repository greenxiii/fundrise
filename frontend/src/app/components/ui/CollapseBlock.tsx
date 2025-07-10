"use client"
import ArrowIcon from '@/assets/icons/ArrowIcon'
import React, { useState } from 'react'

export default function CollapseBlock({ title, content }: { title: string, content?: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='bg-[#1c1c1c] p-10 hover:cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
            <div className='flex items-center justify-between '>
                <p className='text-white text-1xl font-bold'>{title}</p>
                <span
                    className={`text-orange-400 font-bold ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`}
                >
                    <ArrowIcon />
                </span>
            </div>
            <div
              className={`
                transition-all duration-500 overflow-hidden
                ${isOpen ? 'max-h-96 opacity-100 mt-10' : 'max-h-0 opacity-0 mt-0'}
              `}
            >
              <div className="text-white text-1xl font-bold">
                {content}
              </div>
            </div>
        </div>
    )
}
