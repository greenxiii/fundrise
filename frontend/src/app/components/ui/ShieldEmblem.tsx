import React from 'react';
import Image from 'next/image';

interface ShieldEmblemProps {
  src?: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShieldEmblem: React.FC<ShieldEmblemProps> = ({
  src,
  alt = 'Shield emblem',
  className = '',
  children
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="w-32 h-40 border-2 border-orange-500 rounded-lg bg-black bg-opacity-30 flex flex-col items-center justify-center shadow-lg shadow-orange-500/50 overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={128}
            height={160}
            className="w-full h-full object-cover"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export const LeftShieldEmblem: React.FC<ShieldEmblemProps> = ({ src, alt, className }) => {
  return (
    <ShieldEmblem src={src} alt={alt} className={className}>
      {/* X symbol */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-0.5 bg-orange-500 transform rotate-45"></div>
          <div className="w-4 h-0.5 bg-orange-500 transform -rotate-45 absolute"></div>
        </div>
      </div>
      {/* H symbol */}
      <div className="text-orange-500 text-3xl font-bold">H</div>
    </ShieldEmblem>
  );
};

export const RightShieldEmblem: React.FC<ShieldEmblemProps> = ({ src, alt, className }) => {
  return (
    <ShieldEmblem src={src} alt={alt} className={className}>
      {/* Three diagonal stripes */}
      <div className="space-y-2">
        <div className="w-16 h-1 bg-orange-500 transform rotate-12"></div>
        <div className="w-16 h-1 bg-orange-500 transform rotate-12"></div>
        <div className="w-16 h-1 bg-orange-500 transform rotate-12"></div>
      </div>
    </ShieldEmblem>
  );
};
