import React from 'react';
import { LogoBlock } from '../ui/LogoBlock';
import { NAV_LINKS } from './constants';

export const HeaderNav = () => (
    <header className="fixed top-0 left-0 right-0 z-50 max-w-7xl mx-auto flex items-center justify-between h-20 px-8">
      <nav className="hidden md:flex gap-6 text-white text-sm font-medium">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-orange-500 transition-colors">
            {link.label}
          </a>
        ))}
      </nav>
      <LogoBlock />
    </header>
); 