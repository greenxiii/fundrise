import Image from 'next/image'
import React from 'react'
import { HeaderNav } from './HeaderNav'

export const HEADER_CONTENT = {
  title: 'ПІДТРИМАЙ',
  subtitle: '2 МЕХАНІЗОВАНИЙ',
  battalion: 'БАТАЛЬЙОН ЗОШБР',
  supportButton: 'Підтримати',
}

export default function Header() {
  return (
    <div 
      className="h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/hero_bg.png)',
      }}
    >
      <HeaderNav />
      
      {/* Main hero content */}
      <div className="flex items-center justify-between h-full pt-20 px-8 max-w-7xl mx-auto">
        <div className="flex-2 max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-white text 2xl sm:text-5xl font-bold leading-tight">
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
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 cursor-pointer font-bold text-lg transition-colors">
              {HEADER_CONTENT.supportButton}
            </button>
            
            {/* Social media icons */}
            <div className="flex gap-4">
              <div className="w-14 h-14 border border-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Image
                  src="/instagram-line.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </div>
              <div className="w-14 h-14 border border-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Image
                  src="/facebook-box-line.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Hero shields images */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-center">
            {/* First shield - layered images */}
            <div className="relative w-52 h-60">
              {/* Background shield */}
              <Image
                src="/hero_shield11.svg"
                alt="First shield background"
                fill
                className="object-contain"
                priority
              />
              {/* Foreground shield */}
              <Image
                src="/hero_shield1.svg"
                alt="First shield foreground"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Second shield - layered images */}
            <div className="relative w-32 h-40">
              {/* Background shield */}
              <Image
                src="/hero_shield22.svg"
                alt="Second shield background"
                fill
                className="object-contain"
                priority
              />
              {/* Foreground shield */}
              <Image
                src="/hero_shield2.svg"
                alt="Second shield foreground"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
