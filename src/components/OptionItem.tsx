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
      className="flex gap-2 mb-2"
    >
      <div className="flex-none flex items-center justify-center w-8 h-10 font-bold text-muted-foreground">
        {index + 1}.
      </div>
      <Input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Option ${index + 1}`}
        className="bg-background/50 border-purple-100 dark:border-purple-900 focus-visible:ring-purple-400 text-foreground"
      />
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onRemove}
        className="text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

export default OptionItem;