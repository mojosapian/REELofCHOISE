import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Lock, Play, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess } from "@/utils/toast";

interface LockedCategoryProps {
  name: string;
  onUnlock: () => void;
}

const LockedCategory = ({ name, onUnlock }: LockedCategoryProps) => {
  const [isWatching, setIsWatching] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleWatchAd = () => {
    setIsWatching(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsWatching(false);
        onUnlock();
        showSuccess(`Unlocked ${name} category!`);
      }
    }, 150); // Simulates a ~3 second ad
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Lock className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <h4 className="font-bold text-slate-700">{name}</h4>
            <p className="text-xs text-slate-500">Premium List</p>
          </div>
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleWatchAd}
          disabled={isWatching}
          className="bg-purple-50 border-purple-100 text-purple-600 hover:bg-purple-100"
        >
          {isWatching ? (
            <Loader2 className="w-3 h-3 animate-spin mr-2" />
          ) : (
            <Play className="w-3 h-3 mr-2 fill-current" />
          )}
          {isWatching ? `${progress}%` : "Unlock"}
        </Button>
      </div>

      <AnimatePresence>
        {isWatching && (
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute bottom-0 left-0 h-1 bg-purple-500"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LockedCategory;