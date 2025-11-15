'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NAV_LINKS } from './constants';

interface HeaderNavProps {
  showLogo?: boolean;
}

export const HeaderNav = ({ showLogo = false }: HeaderNavProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-[#1c1c1c]/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-8">
        <nav className="hidden md:flex gap-6 text-white text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-orange-500 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        {showLogo && (
          <Link href="/" className="flex items-center">
            <div className="relative w-16 h-16">
              <Image
                src="/main_logo.png"
                alt="Main logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}; 