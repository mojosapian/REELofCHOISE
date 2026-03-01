"use client";

import React from 'react';
import { Settings, Moon, Sun, CircleDot, Cylinder, Trash2, Copy, History, Zap } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "next-themes";
import { showSuccess } from "@/utils/toast";

interface SettingsMenuProps {
  wheelStyle: 'flat' | 'cylinder';
  onWheelStyleChange: (style: 'flat' | 'cylinder') => void;
  spinDuration: number;
  onSpinDurationChange: (val: number) => void;
  onClearList: () => void;
  onExportList: () => void;
  history: string[];
  onClearHistory: () => void;
}

const SettingsMenu = ({ 
  wheelStyle, 
  onWheelStyleChange,
  spinDuration,
  onSpinDurationChange,
  onClearList,
  onExportList,
  history,
  onClearHistory
}: SettingsMenuProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full w-10 h-10 bg-surface/50 border border-border shadow-sm hover:bg-accent-primary/10 transition-all"
        >
          <Settings className="h-5 w-5 text-text-main/70" />
          <span className="sr-only">Open settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] sm:w-[400px] border-r border-border bg-bg-primary/95 backdrop-blur-md overflow-y-auto custom-scrollbar text-text-main">
        <SheetHeader className="flex flex-row items-center justify-between border-b pb-4 mb-6">
          <SheetTitle className="text-xl font-black tracking-tight flex items-center gap-2 text-text-main">
            <Settings className="w-5 h-5 text-accent-primary" />
            Settings
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-10 pb-20">
          <div className="space-y-4">
            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Appearance</Label>
            <ToggleGroup 
              type="single" 
              value={theme} 
              onValueChange={(val) => val && setTheme(val)}
              className="justify-start bg-surface/30 p-1 rounded-xl border border-border/50"
            >
              <ToggleGroupItem value="light" className="flex-1 gap-2 font-bold rounded-lg data-[state=on]:bg-bg-primary data-[state=on]:text-text-main">
                <Sun className="w-4 h-4 text-amber-500" /> Light
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" className="flex-1 gap-2 font-bold rounded-lg data-[state=on]:bg-bg-primary data-[state=on]:text-text-main">
                <Moon className="w-4 h-4 text-blue-400" /> Dark
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Wheel Style</Label>
            <ToggleGroup 
              type="single" 
              value={wheelStyle} 
              onValueChange={(val) => val && onWheelStyleChange(val as 'flat' | 'cylinder')}
              className="justify-start bg-surface/30 p-1 rounded-xl border border-border/50"
            >
              <ToggleGroupItem value="flat" className="flex-1 gap-2 font-bold rounded-lg data-[state=on]:bg-bg-primary data-[state=on]:text-text-main">
                <CircleDot className="w-4 h-4 text-accent-primary" /> Flat
              </ToggleGroupItem>
              <ToggleGroupItem value="cylinder" className="flex-1 gap-2 font-bold rounded-lg data-[state=on]:bg-bg-primary data-[state=on]:text-text-main">
                <Cylinder className="w-4 h-4 text-accent-primary" /> 3D
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Spin Duration</Label>
              <span className="text-xs font-black text-accent-primary bg-accent-primary/10 px-2 py-1 rounded-md">{spinDuration}s</span>
            </div>
            <div className="px-2">
              <Slider 
                value={[spinDuration]} 
                min={1} 
                max={5} 
                step={0.5} 
                onValueChange={(val) => onSpinDurationChange(val[0])}
                className="py-4"
              />
              <div className="flex justify-between text-[10px] font-bold text-muted-foreground mt-1">
                <span>Fast (1s)</span>
                <span>Slow (5s)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Data Management</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={onExportList}
                className="h-12 font-bold rounded-xl border-border hover:bg-accent-primary/5 hover:text-accent-primary"
              >
                <Copy className="w-4 h-4 mr-2" /> Export
              </Button>
              <Button 
                variant="outline" 
                onClick={onClearList}
                className="h-12 font-bold rounded-xl border-border hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Clear List
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Recent Winners</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClearHistory}
                className="h-7 text-[10px] font-black text-destructive hover:bg-destructive/5"
              >
                Clear History
              </Button>
            </div>
            <div className="space-y-2">
              {history.length === 0 ? (
                <div className="text-center py-6 bg-surface/20 rounded-xl border border-dashed border-border">
                  <p className="text-[10px] font-bold text-muted-foreground">No history yet</p>
                </div>
              ) : (
                history.map((winner, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-surface/30 rounded-xl border border-border/50">
                    <div className="w-6 h-6 rounded-full bg-accent-primary/10 flex items-center justify-center text-[10px] font-black text-accent-primary">
                      {i + 1}
                    </div>
                    <span className="text-sm font-bold truncate">{winner}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 right-6">
          <SheetClose asChild>
            <Button className="w-full h-12 font-black rounded-xl bg-accent-primary hover:opacity-90 text-white shadow-lg">
              Done
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsMenu;