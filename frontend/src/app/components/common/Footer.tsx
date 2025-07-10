import React from 'react'
import { Button } from '../ui/Button'
import { LogoBlock } from '../ui/LogoBlock'
import { NAV_LINKS } from './constants'

export const FOOTER_CONTENT = {
    button: 'Задонатити',
}

export default function Footer() {
    return (
        <div className='bg-[rgba(23,23,23,1)] text-white'>
            <div className="mx-auto flex items-center justify-between h-20 max-w-[calc(100vw-180px)]">
                <LogoBlock />
                <nav className="hidden md:flex gap-6 text-white text-sm">
                    {NAV_LINKS.map((link) => (
                        <a key={link.href} href={link.href} className="hover:text-orange-400 transition-colors">
                            {link.label}
                        </a>
                    ))}
                </nav>
                <Button>{FOOTER_CONTENT.button}</Button>
            </div>
        </div>
    )
}
