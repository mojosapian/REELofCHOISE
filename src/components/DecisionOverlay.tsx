import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import VerticalWheel3D from "./VerticalWheel3D";
import DecisionVisualizer from "./DecisionVisualizer";

interface DecisionOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  options: string[];
  rotation: number;
  isSpinning: boolean;
  result: string | null;
}

const DecisionOverlay = ({ 
  isVisible, 
  onClose, 
  options, 
  rotation, 
  isSpinning, 
  result 
}: DecisionOverlayProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md p-6"
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-6 right-6 rounded-full w-12 h-12 hover:bg-accent transition-colors"
          >
            <X className="w-6 h-6" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="w-full max-w-md flex flex-col items-center gap-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black tracking-tight">The Radar is Spinning...</h2>
              <p className="text-muted-foreground font-medium">Good luck!</p>
            </div>

            <VerticalWheel3D 
              options={options} 
              rotation={rotation} 
              isSpinning={isSpinning} 
            />

            <div className="w-full">
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
                className="w-full h-14 text-lg font-black rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
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