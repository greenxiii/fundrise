import React from 'react';

interface SectionTitleProps {
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ subtitle, children, className = '' }) => (
  <div className={`mb-8 ${className}`}>
    <span className="text-sm uppercase tracking-widest text-[#FF9F1C]">{subtitle}</span>
    <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">{children}</h2>
  </div>
); 