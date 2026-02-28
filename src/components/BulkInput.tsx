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
    <div className="space-y-3 p-4 bg-muted/30 rounded-2xl border border-border">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-1">
        <ListPlus className="w-4 h-4" />
        Bulk Add Options
      </div>
      <Textarea 
        placeholder="Paste options separated by commas or new lines..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[100px] bg-background border-border focus-visible:ring-purple-400 resize-none text-foreground"
      />
      <Button 
        onClick={handleImport} 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
        disabled={!text.trim()}
      >
        Import Options
      </Button>
    </div>
  );
};

export default BulkInput;