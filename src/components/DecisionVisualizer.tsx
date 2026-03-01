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
    <div className="relative h-14 md:h-20 flex items-center justify-center overflow-hidden rounded-xl md:rounded-2xl bg-accent-primary shadow-lg mb-4 md:mb-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={isSpinning ? currentIndex : (result || 'idle')}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="text-lg md:text-2xl font-black text-white text-center px-4 w-full"
        >
          {isSpinning ? (
            <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
              {options[currentIndex]}
            </span>
          ) : result ? (
            <span className="flex flex-col items-center w-full">
              <span className="text-[7px] md:text-[9px] uppercase tracking-[0.3em] font-black opacity-70">Winner:</span>
              <span className="leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full block">
                {result}
              </span>
            </span>
          ) : (
            "Ready to Decide?"
          )}
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute top-0 left-0 w-full h-0.5 bg-white/10" />
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black/5" />
    </div>
  );
};

export default DecisionVisualizer;