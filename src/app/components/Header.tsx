import Image from 'next/image'
import React from 'react'
import { HeaderNav } from './HeaderNav'
import headerImage from '@/assets/header.webp';

export default function Header() {
  return (
    <div>
    <HeaderNav />
    <div className="relative h-screen overflow-hidden">
      <Image
        src={headerImage}
        alt="header"
        fill
        className="w-full h-[100vh] object-cover scale-115 translate-y-10"
      />
    </div>
    <p className='text-white text-center font-bold absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl w-full leading-[102px]'>2 МЕХАНІЗОВАНИЙ  <br/> БАТАЛЬЙОН</p>
  </div>
  )
}
