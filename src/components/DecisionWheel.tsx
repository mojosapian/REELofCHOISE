import React from 'react';
import { cn } from "@/lib/utils";

interface DecisionWheelProps {
  options: string[];
  rotation: number;
  isSpinning: boolean;
}

const COLORS = [
  '#FF0080', '#7928CA', '#0070F3', '#00DFD8', 
  '#FF4D4D', '#F9CB28', '#7C3AED', '#10B981',
  '#F472B6', '#3B82F6', '#10B981', '#F59E0B'
];

const DecisionWheel = ({ options, rotation, isSpinning }: DecisionWheelProps) => {
  const validOptions = options.filter(opt => opt.trim() !== '');
  const sliceAngle = 360 / validOptions.length;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="relative w-full max-w-[280px] aspect-square mx-auto mb-8 group">
      {/* Pointer */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 w-6 h-8 bg-white dark:bg-slate-900 shadow-lg clip-path-triangle flex items-center justify-center rounded-t-sm">
        <div className="w-2 h-4 bg-purple-600 rounded-full" />
      </div>

      {/* The Wheel */}
      <div 
        className="w-full h-full rounded-full border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden transition-transform duration-[4000ms] cubic-bezier(0.15, 0, 0.15, 1)"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <svg viewBox="-1 -1 2 2" className="w-full h-full -rotate-90">
          {validOptions.map((option, i) => {
            const startPercent = i / validOptions.length;
            const endPercent = (i + 1) / validOptions.length;
            
            const [startX, startY] = getCoordinatesForPercent(startPercent);
            const [endX, endY] = getCoordinatesForPercent(endPercent);
            
            const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;
            const pathData = [
              `M 0 0`,
              `L ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `L 0 0`,
            ].join(' ');

            return (
              <g key={i}>
                <path 
                  d={pathData} 
                  fill={COLORS[i % COLORS.length]} 
                  className="stroke-white/20 stroke-[0.01]"
                />
                {/* Text on slices */}
                <text
                  x="0.5"
                  y="0"
                  transform={`rotate(${i * sliceAngle + sliceAngle / 2})`}
                  fill="white"
                  fontSize="0.12"
                  fontWeight="900"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none uppercase tracking-tighter"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
                >
                  {option.length > 8 ? option.substring(0, 6) + '..' : option}
                </text>
              </g>
            );
          })}
          {/* Center Hub */}
          <circle cx="0" cy="0" r="0.15" fill="white" className="dark:fill-slate-800 shadow-inner" />
          <circle cx="0" cy="0" r="0.08" fill="#7928CA" />
        </svg>
      </div>

      {/* Decorative Ring */}
      <div className="absolute inset-0 rounded-full border-[12px] border-black/5 pointer-events-none" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .clip-path-triangle {
          clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
        .cubic-bezier {
          transition-timing-function: cubic-bezier(0.15, 0, 0.15, 1);
        }
      `}} />
    </div>
  );
};

export default DecisionWheel;