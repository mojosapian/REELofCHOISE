import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";

interface BulkInputProps {
  onImport: (items: string[]) => void;
}

const BulkInput = ({ onImport }: BulkInputProps) => {
  const [text, setText] = useState('');

  const handleImport = () => {
    const items = text
      .split(/,|\n/)
      .map(item => item.trim())
      .filter(item => item !== '');
    
    if (items.length > 0) {
      onImport(items);
      setText('');
    }
  };

  return (
    <div className="space-y-4 p-6 bg-muted/20 rounded-3xl border-2 border-dashed border-border/60">
      <div className="flex items-center gap-2 text-base font-black text-muted-foreground mb-1">
        <ListPlus className="w-5 h-5" />
        Bulk Add Options
      </div>
      <Textarea 
        placeholder="Paste options separated by commas or new lines..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[200px] text-lg font-bold bg-background border-border focus-visible:ring-purple-400 resize-none text-foreground rounded-2xl p-4"
      />
      <Button 
        onClick={handleImport} 
        className="w-full h-14 text-lg font-black bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-lg"
        disabled={!text.trim()}
      >
        Import Options
      </Button>
    </div>
  );
};

export default BulkInput;