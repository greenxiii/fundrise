import React from 'react';
import Image from 'next/image';

export const LogoBlock = () => (
  <div className="w-23 h-24 relative pt-4">
    <Image
      src="/main_logo.svg"
      alt="Main logo"
      fill
      className="object-contain"
      priority
      style={{ top: '8px' }}
    />
  </div>
); 