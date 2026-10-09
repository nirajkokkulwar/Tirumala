import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'dark' | 'light';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', onClick }) => {
  const isDark = variant === 'dark';

  return (
    <div 
      id="tirumala-brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none cursor-pointer group ${className}`}
    >
      {/* Textile / Heritage Weave Ornamental Motif */}
      <div className={`relative flex items-center justify-center w-9 h-9 rounded-md transition-transform duration-300 group-hover:scale-105 ${
        isDark 
          ? 'bg-[#58121D] border border-[#C59B4B]/40' 
          : 'bg-[#781D2A] border border-[#C59B4B]/30 shadow-sm'
      }`}>
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-[#DFC07A]"
        >
          {/* Subtle Indian Paisley / Loom Thread Geometry */}
          <path 
            d="M20 4C20 4 28 10 28 18C28 22.4183 24.4183 26 20 26C15.5817 26 12 22.4183 12 18C12 10 20 4 20 4Z" 
            stroke="currentColor" 
            strokeWidth="1.75" 
            strokeLinecap="round"
          />
          {/* Inner Lotus / Loom Seed */}
          <circle cx="20" cy="18" r="3.5" fill="currentColor" opacity="0.9" />
          {/* Traditional Base Pedestal Weave */}
          <path 
            d="M10 32C13 30 17 29 20 29C23 29 27 30 30 32M8 35C12 33 16 32 20 32C24 32 28 33 32 35" 
            stroke="#DFC07A" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {variant !== 'compact' && (
        <div className="flex flex-col text-left leading-none">
          <span className={`font-serif tracking-[0.22em] text-lg font-bold transition-colors ${
            isDark ? 'text-[#FAF7F2]' : 'text-[#781D2A]'
          }`}>
            TIRUMALA
          </span>
          <span className={`text-[9px] font-sans tracking-[0.32em] uppercase font-semibold mt-0.5 ${
            isDark ? 'text-[#DFC07A]' : 'text-[#C59B4B]'
          }`}>
            CLOTH STORE
          </span>
        </div>
      )}
    </div>
  );
};
