import React from 'react';

interface HeaderProps {
  onCtaClick?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 md:py-1 bg-[#001A33]/95 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-3">
        {/* Official Cruzeiro do Sul Virtual Logo Image */}
        <img 
          src="/cruzeiro_do_sul_virtual%20amarelo.png" 
          alt="Cruzeiro do Sul Virtual" 
          className="h-11 md:h-[50px] w-auto object-contain" 
        />
      </div>
    </header>
  );
};

