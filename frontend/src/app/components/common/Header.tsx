import Image from 'next/image'
import React from 'react'
import { HeaderNav } from './HeaderNav'
import { Button } from '../ui/Button'

export const HEADER_CONTENT = {
  title: 'ПІДТРИМАЙ',
  subtitle: '2 МЕХАНІЗОВАНИЙ',
  battalion: 'БАТАЛЬЙОН ЗОШБР',
  supportButton: 'Підтримати',
}

export default function Header() {
  return (
    <div 
      className="h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat w-full"
      style={{
        backgroundImage: 'url(/hero_bg.png)',
      }}
    >
      <HeaderNav />
      
      {/* Main hero content */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-40 md:pt-60 px-10 sm:px-8 max-w-7xl w-full mx-auto">
        {/* Mobile - Main logo at top */}
        <div className="flex md:hidden justify-center mb-8">
          <div className="relative w-48 h-48 mb-10">
            {/* Shadow layer behind main logo */}
            <Image
              src="/main_logo_shadow.png"
              alt="Main logo shadow"
              fill
              className="object-contain"
              priority
            />
            {/* Main logo on top */}
            <Image
              src="/main_logo.png"
              alt="Main logo emblem"
              fill
              className="object-contain relative z-10"
              priority
            />
          </div>
        </div>
        
        <div className="max-w-2xl w-full">
          <div className="space-y-4">
            <h1 className="text-white text-2xl sm:text-5xl font-bold leading-tight">
              {HEADER_CONTENT.title}
            </h1>
            <h2 className="text-white text-2xl sm:text-5xl font-bold leading-tight">
              {HEADER_CONTENT.subtitle}
            </h2>
            <h3 className="text-white text-2xl sm:text-5xl font-bold leading-tight">
              {HEADER_CONTENT.battalion}
            </h3>
          </div>
          
          {/* Support button and social icons */}
          <div className="flex items-center gap-6 mt-8">
            <Button 
              variant="default"
              size="default"
              className="relative flex items-center justify-center gap-3"
            >
              {HEADER_CONTENT.supportButton}
            </Button>
            
            {/* Social media icons */}
            <div className="flex gap-4">
              <Button 
                variant="secondary"
                size="default"
                style={{ width: '44px', padding: '0' }}
                className="group"
                aria-label="Instagram"
              >
                <div 
                  className="social-icon-wrapper group-hover:social-icon-orange"
                  style={{ '--icon-url': 'url(/instagram-line.svg)' } as React.CSSProperties}
                >
                  <Image
                    src="/instagram-line.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="social-icon social-icon-hover"
                  />
                </div>
              </Button>
              <Button 
                variant="secondary"
                size="default"
                style={{ width: '44px', padding: '0' }}
                className="group"
                aria-label="Facebook"
              >
                <div 
                  className="social-icon-wrapper group-hover:social-icon-orange"
                  style={{ '--icon-url': 'url(/facebook-box-line.svg)' } as React.CSSProperties}
                >
                  <Image
                    src="/facebook-box-line.svg"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="social-icon social-icon-hover"
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Desktop - Right side - Main logo emblem */}
        <div className="flex-1 hidden md:flex justify-center items-center">
          <div className="relative w-60 h-60 md:w-72 md:h-72">
            {/* Shadow layer behind main logo */}
            <Image
              src="/main_logo_shadow.png"
              alt="Main logo shadow"
              fill
              className="object-contain"
              priority
            />
            {/* Main logo on top */}
            <Image
              src="/main_logo.png"
              alt="Main logo emblem"
              fill
              className="object-contain relative z-10"
              priority
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center">
        <Image
          src="/lg_1.png"
          alt="Logo graphic"
          width={76}
          height={120}
          className="object-contain"
        />
      </div>
    </div>
  )
}
