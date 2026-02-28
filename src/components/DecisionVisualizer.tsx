import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DecisionVisualizerProps {
  options: string[];
  currentIndex: number;
  isSpinning: boolean;
  result: string | null;
}

const DecisionVisualizer = ({ options, currentIndex, isSpinning, result }: DecisionVisualizerProps) => {
  return (
    <div className="relative h-20 md:h-28 flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg mb-6 md:mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={isSpinning ? currentIndex : (result || 'idle')}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="text-xl md:text-3xl font-black text-white text-center px-6 w-full"
        >
          {isSpinning ? (
            <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
              {options[currentIndex]}
            </span>
          ) : result ? (
            <span className="flex flex-col items-center w-full">
              <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-black opacity-70 mb-1">The Winner is:</span>
              <span className="leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full block">
                {result}
              </span>
            </span>
          ) : (
            "Ready to Decide?"
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/5" />
    </div>
  );
};

export default DecisionVisualizer;