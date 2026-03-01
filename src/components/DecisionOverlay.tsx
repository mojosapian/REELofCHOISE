import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DecisionWheel from "./DecisionWheel";
import VerticalWheel3D from "./VerticalWheel3D";
import DecisionVisualizer from "./DecisionVisualizer";

interface DecisionOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  options: string[];
  rotation: number;
  isSpinning: boolean;
  result: string | null;
  wheelStyle: 'flat' | 'cylinder';
  spinDuration: number;
}

const DecisionOverlay = ({ 
  isVisible, 
  onClose, 
  options, 
  rotation, 
  isSpinning, 
  result,
  wheelStyle,
  spinDuration
}: DecisionOverlayProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary/95 backdrop-blur-md p-4 md:p-6 text-text-main"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 rounded-full w-12 h-12 hover:bg-surface transition-colors"
          >
            <X className="w-6 h-6" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="w-full max-w-lg flex flex-col items-center gap-6 md:gap-8">
            <div className="text-center space-y-1 md:space-y-2">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">The Radar is Spinning...</h2>
              <p className="text-muted-foreground font-medium text-sm md:text-base">Good luck!</p>
            </div>

            <div className="w-full py-4">
              {wheelStyle === 'cylinder' ? (
                <VerticalWheel3D 
                  options={options} 
                  rotation={rotation} 
                  isSpinning={isSpinning} 
                  spinDuration={spinDuration}
                />
              ) : (
                <DecisionWheel 
                  options={options} 
                  rotation={rotation} 
                  isSpinning={isSpinning} 
                  spinDuration={spinDuration}
                />
              )}
            </div>

            <div className="w-full max-w-md">
              <DecisionVisualizer 
                options={options} 
                currentIndex={0} 
                isSpinning={isSpinning} 
                result={result} 
              />
            </div>

            {!isSpinning && result && (
              <Button 
                onClick={onClose}
                className="w-full max-w-md h-14 md:h-16 text-lg font-black rounded-xl bg-accent-primary hover:opacity-90 text-white shadow-lg active:scale-95 transition-transform"
              >
                Back to List
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DecisionOverlay;