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
    <div className="relative h-48 flex items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl mb-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={isSpinning ? currentIndex : (result || 'idle')}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "font-black text-white text-center px-8",
            result || isSpinning ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl opacity-90"
          )}
        >
          {isSpinning ? (
            options[currentIndex]
          ) : result ? (
            <span className="flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.3em] font-black opacity-70 mb-3">The Winner is:</span>
              <span className="leading-tight">{result}</span>
            </span>
          ) : (
            "Ready to Decide?"
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-3 bg-white/20" />
      <div className="absolute bottom-0 left-0 w-full h-3 bg-black/10" />
    </div>
  );
};

export default DecisionVisualizer;