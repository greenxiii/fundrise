// import Image from 'next/image'
import React from 'react'
import { HeaderNav } from './HeaderNav'
import headerImage from '@/assets/header.webp';

export const HEADER_CONTENT = {
  title: '2 МЕХАНІЗОВАНИЙ  БАТАЛЬЙОН',
}
export default function Header() {
  return (
    <div
    className="bg-cover bg-top h-screen"
    style={{ backgroundImage: `url(${headerImage.src})` }}
>
    <HeaderNav />
    <p className='text-white text-center font-bold absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl w-full leading-[102px]'>{HEADER_CONTENT.title}</p>
  </div>
  )
}
