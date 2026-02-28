import React, { useMemo } from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VerticalWheel3DProps {
  options: string[];
  rotation: number;
  isSpinning: boolean;
}

const VerticalWheel3D = ({ options, rotation, isSpinning }: VerticalWheel3DProps) => {
  const validOptions = useMemo(() => options.filter(opt => opt.trim() !== ''), [options]);
  const itemCount = validOptions.length;
  
  // Constants for 3D math
  const itemHeight = 60; // Height of each segment in pixels
  const angleStep = 360 / itemCount;
  
  // Calculate radius to form a perfect cylinder based on item height and count
  const radius = useMemo(() => {
    return Math.round(itemHeight / (2 * Math.tan(Math.PI / itemCount)));
  }, [itemCount]);

  return (
    <div className="relative w-full max-w-[300px] h-[250px] mx-auto flex items-center justify-center perspective-[1000px] overflow-hidden">
      {/* Side Brackets / Frame */}
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50" />
      <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50" />
      
      {/* Selection Indicator (Pointer) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[110%] h-[70px] border-y-2 border-purple-500/50 bg-purple-500/5 pointer-events-none z-20 flex items-center justify-between px-2">
        <div className="w-2 h-2 bg-purple-500 rotate-45" />
        <div className="w-2 h-2 bg-purple-500 rotate-45" />
      </div>

      {/* The 3D Cylinder */}
      <div 
        className="relative w-full h-[60px]"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation}deg)`,
          transition: 'transform 4000ms cubic-bezier(0.15, 0, 0.15, 1)',
          willChange: 'transform'
        }}
      >
        {validOptions.map((option, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center backface-hidden border-y border-white/5"
            style={{
              height: `${itemHeight}px`,
              transform: `rotateX(${-i * angleStep}deg) translateZ(${radius}px)`,
              backgroundColor: i % 2 === 0 ? 'rgba(121, 40, 202, 0.8)' : 'rgba(0, 112, 243, 0.8)',
            }}
          >
            <span className="text-white font-black text-lg uppercase tracking-wider drop-shadow-md px-4 text-center line-clamp-1">
              {option}
            </span>
          </div>
        ))}
      </div>

      {/* Lighting Effects */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-background via-transparent to-background opacity-80" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-[1000px] {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}} />
    </div>
  );
};

export default VerticalWheel3D;