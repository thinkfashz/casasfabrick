"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';

export function Logo({ className, scrolled }: { className?: string, scrolled?: boolean }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsAnimating(true);
    }, 10);
  };

  return (
    <div
      className={cn("relative flex items-center justify-center font-body cursor-pointer", className)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
    >
      <div className='flex items-center justify-center'>
        <Home className="h-6 w-6 text-primary" />
        <div className='ml-2 flex items-baseline'>
          <span className={cn(
            "text-xl font-light transition-colors",
            scrolled ? "text-foreground" : "text-white"
          )}>
            Casas
          </span>
          <span className="ml-1 text-xl font-bold text-primary">
            Fabrick
          </span>
        </div>
      </div>
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="logo-sparkle"
              style={{
                '--angle': `${i * 30}deg`,
                '--spread': '60px',
                '--duration': '700ms',
                '--delay': `${Math.random() * 100}ms`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  );
}
