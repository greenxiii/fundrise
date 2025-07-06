import React from 'react'
import { NAV_LINKS } from './common/constants'
import { Button } from './ui/Button'
import { LogoBlock } from './ui/LogoBlock'

export default function Footer() {
    return (
        <div className='bg-[rgba(23,23,23,1)] text-white px-22 '>
            <div className="mx-auto flex items-center justify-between h-20">
                <LogoBlock />
                <nav className="hidden md:flex gap-6 text-white text-sm">
                    {NAV_LINKS.map((link) => (
                        <a key={link.href} href={link.href} className="hover:text-orange-400 transition-colors">
                            {link.label}
                        </a>
                    ))}
                </nav>
                <Button>Задонатити</Button>
            </div>
        </div>
    )
}
