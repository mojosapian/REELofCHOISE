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
      className="flex gap-2 md:gap-4 mb-4 md:mb-6 w-full items-center box-border"
    >
      <div className="flex-none flex items-center justify-center w-8 md:w-12 h-14 md:h-24 text-xl md:text-3xl font-black text-muted-foreground/30">
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <Input 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Option ${index + 1}`}
          className="w-full h-14 md:h-24 text-xl md:text-3xl font-black bg-background border-2 border-purple-100 dark:border-purple-900/30 focus-visible:ring-purple-400 text-foreground rounded-xl md:rounded-[2rem] px-6 md:px-12 shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis"
        />
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onRemove}
        className="w-14 md:w-20 h-14 md:h-24 text-destructive hover:bg-destructive/10 rounded-xl md:rounded-[2rem] flex-none transition-colors"
      >
        <Trash2 className="w-5 h-5 md:w-8 md:h-8" />
      </Button>
    </motion.div>
  );
};

export default OptionItem;