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
      className="flex gap-3 mb-3"
    >
      <div className="flex-none flex items-center justify-center w-10 h-14 text-xl font-black text-muted-foreground/50">
        {index + 1}
      </div>
      <Input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Option ${index + 1}`}
        className="h-14 text-lg font-bold bg-background/50 border-purple-100 dark:border-purple-900 focus-visible:ring-purple-400 text-foreground rounded-xl px-5"
      />
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onRemove}
        className="w-14 h-14 text-destructive hover:bg-destructive/10 rounded-xl"
      >
        <Trash2 className="w-6 h-6" />
      </Button>
    </motion.div>
  );
};

export default OptionItem;