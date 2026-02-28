import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface OptionItemProps {
  value: string;
  onChange: (val: string) => void;
  onRemove: () => void;
  index: number;
}

const OptionItem = ({ value, onChange, onRemove, index }: OptionItemProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-2 md:gap-4 mb-3 md:mb-4 w-full items-center box-border"
    >
      <div className="flex-1 min-w-0 flex items-center bg-background border-2 border-purple-100 dark:border-purple-900/30 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-400">
        {/* Vertically centered number with increased padding */}
        <div className="pl-4 md:pl-5 pr-1 text-base md:text-lg font-black text-purple-600/30 dark:text-purple-400/30 select-none flex-none flex items-center h-full">
          {index + 1}.
        </div>
        {/* Increased internal padding (16px-20px) and text handling */}
        <Input 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Option ${index + 1}`}
          className="flex-1 h-12 md:h-14 text-base md:text-lg font-bold bg-transparent border-0 focus-visible:ring-0 text-foreground px-3 md:px-4 whitespace-nowrap overflow-hidden text-ellipsis"
        />
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onRemove}
        className="w-12 md:w-14 h-12 md:h-14 text-destructive/50 hover:text-destructive hover:bg-destructive/10 rounded-xl md:rounded-2xl flex-none transition-all"
      >
        <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
      </Button>
    </motion.div>
  );
};

export default OptionItem;