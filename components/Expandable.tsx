"use client"

import { useEffect, useState } from 'react';
import { Icon, type IconName } from './Icon';

const Expandable = ({ title, id, icon, children }: {
  title: string
  id?: string
  /** Optional line icon shown before the title */
  icon?: IconName
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (id && typeof window !== 'undefined' && window.location.hash === `#${id}`) {
      setIsOpen(true);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView();
      }, 100);
    }
  }, [id]);

  return (
    <div className="border-b border-line last:border-0 scroll-mt-24" id={id}>
      {/* 1. The Heading Area (Clickable) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-4 text-left text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-sm group"
      >
        <span className="flex items-center gap-4">
          {icon && (
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-pill transition-colors duration-300 ${isOpen ? 'bg-leaf' : 'bg-leaf/50 group-hover:bg-leaf'}`}>
              <Icon name={icon} size={22} />
            </span>
          )}
          <span className={icon ? 'font-display text-xl' : 'text-body font-semibold'}>
            {title}
          </span>
        </span>

        {/* 2. The Chevron (Animated Rotation) */}
        <span className={`shrink-0 text-sage transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <Icon name="chevronDown" size={20} />
        </span>
      </button>

      {/* 3. The Smooth Animation Wrapper (Grid Trick) */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          {/* 
          [&_p]: This translates to "Select any <p> tag inside this div." 
          :!my-0: The ! forces !important to override the Tailwind Typography defaults. The mt-0 sets top margins to zero.
          :!p-0: Ensures no padding is interfering either. 
          */}
          <div className={`text-ink-soft mt-0 pb-2 [&_p]:!mt-0 [&_p]:!p-0 ${icon ? 'md:pl-[60px]' : ''}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expandable;
