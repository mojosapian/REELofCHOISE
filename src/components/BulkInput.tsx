import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ListPlus, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BulkInputProps {
  onImport: (items: string[]) => void;
}

const BulkInput = ({ onImport }: BulkInputProps) => {
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleImport = () => {
    const items = text
      .split(/,|\n/)
      .map(item => item.trim())
      .filter(item => item !== '');
    
    if (items.length > 0) {
      onImport(items);
      setText('');
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between h-12 px-4 text-sm font-bold text-muted-foreground hover:text-accent-primary hover:bg-accent-primary/5 rounded-xl transition-all"
      >
        <div className="flex items-center gap-2">
          <ListPlus className="w-4 h-4" />
          <span>Add More Options (Bulk)</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-4">
              <div className="p-4 bg-surface/20 rounded-2xl border-2 border-dashed border-border/60">
                <Textarea 
                  placeholder="Paste options separated by commas or new lines..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[150px] text-base font-bold bg-bg-primary border-border focus-visible:ring-accent-primary resize-none text-text-main rounded-xl p-3"
                />
                <Button 
                  onClick={handleImport} 
                  className="w-full mt-4 h-12 text-base font-black bg-accent-primary hover:opacity-90 text-white rounded-xl shadow-md"
                  disabled={!text.trim()}
                >
                  Import Options
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BulkInput;