import React, { useState } from 'react';

interface AccordionItem {
  label: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className = '' }) => {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (idx: number) => {
    if (open === idx) {
      return setOpen(null);
    }
    setOpen(idx);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, idx) => (
        <div key={idx} className="bg-[#1C1C1C] rounded-lg overflow-hidden transition-all duration-300">
          <button
            className="w-full flex justify-between items-center px-6 py-4 font-semibold text-left focus:outline-none text-white"
            onClick={() => toggle(idx)}
            type="button"
          >
            <span>{item.label}</span>
            <span className="text-2xl font-thin">{open === idx ? '-' : '+'}</span>
          </button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              open === idx ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-6 pb-4 text-gray-300">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}; 