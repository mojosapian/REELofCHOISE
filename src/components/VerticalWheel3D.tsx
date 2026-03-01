import React, { useMemo } from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VerticalWheel3DProps {
  options: string[];
  rotation: number;
  isSpinning: boolean;
  spinDuration: number;
}

const VerticalWheel3D = ({ options, rotation, isSpinning, spinDuration }: VerticalWheel3DProps) => {
  const validOptions = useMemo(() => options.filter(opt => opt.trim() !== ''), [options]);
  const itemCount = validOptions.length;
  
  // Increased item height for a "bigger" feel
  const itemHeight = 80; 
  const angleStep = 360 / itemCount;
  
  // Radius is calculated based on item height and count to form a perfect cylinder
  const radius = useMemo(() => {
    return Math.round(itemHeight / (2 * Math.tan(Math.PI / itemCount)));
  }, [itemCount, itemHeight]);

  return (
    <div className="relative w-full max-w-[340px] h-[350px] mx-auto flex items-center justify-center perspective-[1200px] overflow-hidden">
      {/* Side Brackets / Rails */}
      <div className="absolute inset-y-0 left-2 w-1.5 bg-gradient-to-b from-transparent via-accent-primary to-transparent opacity-30 rounded-full" />
      <div className="absolute inset-y-0 right-2 w-1.5 bg-gradient-to-b from-transparent via-accent-primary to-transparent opacity-30 rounded-full" />
      
      {/* Selection Indicator (The "Window") */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[105%] h-[90px] border-y-4 border-accent-primary/40 bg-accent-primary/5 pointer-events-none z-20 flex items-center justify-between px-1 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
        <div className="w-3 h-3 bg-accent-primary rotate-45 shadow-sm" />
        <div className="w-3 h-3 bg-accent-primary rotate-45 shadow-sm" />
      </div>

      {/* The 3D Cylinder */}
      <div 
        className="relative w-full h-[80px]"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation}deg)`,
          transition: `transform ${spinDuration * 1000}ms cubic-bezier(0.15, 0, 0.15, 1)`,
          willChange: 'transform'
        }}
      >
        {validOptions.map((option, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center backface-hidden border-y border-white/10"
            style={{
              height: `${itemHeight}px`,
              // Each segment is placed at its specific angle around the center
              transform: `rotateX(${-i * angleStep}deg) translateZ(${radius}px)`,
              backgroundColor: i % 2 === 0 ? 'var(--accent-primary)' : 'rgba(121, 40, 202, 0.9)',
            }}
          >
            <span className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] px-6 text-center line-clamp-1">
              {option}
            </span>
          </div>
        ))}
      </div>

      {/* Depth Shadows (Top and Bottom) */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary opacity-90" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-[1200px] {
          perspective: 1200px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}} />
    </div>
  );
};

export default VerticalWheel3D;