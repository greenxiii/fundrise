import React from 'react';
import { LogoBlock } from './ui/LogoBlock';
import { Button } from './ui/Button';
import { NAV_LINKS } from './common/constants';

export const HeaderNav = () => (
  <header className="fixed top-0 left-0 right-0 z-50">
    <div className="mx-auto flex items-center justify-between h-20 px-22">
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
  </header>
); 