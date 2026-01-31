"use client"

import { useState } from 'react';

const Expandable = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      {/* 1. The Heading Area (Clickable) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
      >
        <span className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-teal-600' : 'text-gray-800'}`}>
          {title}
        </span>
        
        {/* 2. The Custom Icon (Animated Rotation) */}
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {/* Simple Chevron SVG */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {/* 3. The Smooth Animation Wrapper (Grid Trick) */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-gray-600 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expandable;