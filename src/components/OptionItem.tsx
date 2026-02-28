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
      className="flex gap-3 mb-4 w-full"
    >
      <div className="flex-none flex items-center justify-center w-10 h-20 text-2xl font-black text-muted-foreground/40">
        {index + 1}
      </div>
      <Input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Option ${index + 1}`}
        className="flex-1 h-20 text-2xl font-black bg-background/50 border-2 border-purple-100 dark:border-purple-900/50 focus-visible:ring-purple-400 text-foreground rounded-2xl px-6 shadow-sm min-w-0"
      />
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onRemove}
        className="w-16 h-20 text-destructive hover:bg-destructive/10 rounded-2xl flex-none"
      >
        <Trash2 className="w-7 h-7" />
      </Button>
    </motion.div>
  );
};

export default OptionItem;