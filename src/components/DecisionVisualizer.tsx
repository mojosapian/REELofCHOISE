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
    <div className="relative h-36 flex items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-600 to-blue-600 shadow-xl mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={isSpinning ? currentIndex : (result || 'idle')}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="text-2xl md:text-4xl font-black text-white text-center px-6"
        >
          {isSpinning ? (
            options[currentIndex]
          ) : result ? (
            <span className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.3em] font-black opacity-70 mb-2">The Winner is:</span>
              <span className="leading-tight">{result}</span>
            </span>
          ) : (
            "Ready to Decide?"
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-white/10" />
      <div className="absolute bottom-0 left-0 w-full h-2 bg-black/5" />
    </div>
  );
};

export default DecisionVisualizer;