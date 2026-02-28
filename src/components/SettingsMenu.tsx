"use client";

import React from 'react';
import { Settings, Moon, Sun, CircleDot, Cylinder, X } from "lucide-react";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "next-themes";

interface SettingsMenuProps {
  wheelStyle: 'flat' | 'cylinder';
  onWheelStyleChange: (style: 'flat' | 'cylinder') => void;
}

const SettingsMenu = ({ wheelStyle, onWheelStyleChange }: SettingsMenuProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full w-10 h-10 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
        >
          <Settings className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          <span className="sr-only">Open settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r border-border bg-background/95 backdrop-blur-md">
        <SheetHeader className="flex flex-row items-center justify-between border-b pb-4 mb-6">
          <SheetTitle className="text-xl font-black tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600" />
            Settings
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-8">
          {/* Appearance Section */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground">Appearance</Label>
              <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
            </div>
            <ToggleGroup 
              type="single" 
              value={theme} 
              onValueChange={(val) => val && setTheme(val)}
              className="justify-start bg-muted/30 p-1 rounded-xl border border-border/50"
            >
              <ToggleGroupItem value="light" className="flex-1 gap-2 font-bold rounded-lg data-[state=on]:bg-background data-[state=on]:shadow-sm">
                <Sun className="w-4 h-4 text-amber-500" /> Light
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" className="flex-1 gap-2 font-bold rounded-lg data-[state=on]:bg-background data-[state=on]:shadow-sm">
                <Moon className="w-4 h-4 text-blue-400" /> Dark
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Wheel Style Section */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground">Wheel Style</Label>
              <p className="text-xs text-muted-foreground">Select the visualizer type</p>
            </div>
            <ToggleGroup 
              type="single" 
              value={wheelStyle} 
              onValueChange={(val) => val && onWheelStyleChange(val as 'flat' | 'cylinder')}
              className="justify-start bg-muted/30 p-1 rounded-xl border border-border/50"
            >
              <ToggleGroupItem value="flat" className="flex-1 gap-2 font-bold rounded-lg data-[state=on]:bg-background data-[state=on]:shadow-sm">
                <CircleDot className="w-4 h-4 text-purple-500" /> Flat
              </ToggleGroupItem>
              <ToggleGroupItem value="cylinder" className="flex-1 gap-2 font-bold rounded-lg data-[state=on]:bg-background data-[state=on]:shadow-sm">
                <Cylinder className="w-4 h-4 text-purple-500" /> 3D
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 right-6">
          <SheetClose asChild>
            <Button className="w-full font-black rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
              Done
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsMenu;