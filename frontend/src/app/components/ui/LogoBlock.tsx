import React from 'react';
import Image from 'next/image';

export const LogoBlock = () => (
  <div className="w-16 h-16 relative">
    <Image
      src="/main_logo.svg"
      alt="Main logo"
      fill
      className="object-contain"
      priority
    />
  </div>
); 