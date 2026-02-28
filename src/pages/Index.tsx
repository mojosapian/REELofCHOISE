import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Plus, Sparkles, RotateCcw, Save, History, CircleDot, Cylinder } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import OptionItem from "@/components/OptionItem";
import DecisionOverlay from "@/components/DecisionOverlay";
import BulkInput from "@/components/BulkInput";
import AdPlaceholder from "@/components/AdPlaceholder";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useDecider } from "@/hooks/use-decider";
import { useSavedLists } from "@/hooks/use-saved-lists";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showError } from "@/utils/toast";

const Index = () => {
  const [options, setOptions] = useState<string[]>(['Pizza', 'Sushi', 'Burgers']);
  const [isWheelVisible, setIsWheelVisible] = useState(false);
  const [wheelStyle, setWheelStyle] = useState<'flat' | 'cylinder'>('cylinder');
  
  const { isSpinning, result, rotation, decide } = useDecider(options);
  const { lists, saveList, deleteList } = useSavedLists();

  const addOption = () => setOptions([...options, '']);
  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const removeOption = (index: number) => {
    if (options.length <= 2) {
      showError("You need at least 2 options!");
      return;
    }
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleDecide = () => {
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) {
      showError("Please enter at least 2 valid options.");
      return;
    }
    setIsWheelVisible(true);
    decide();
  };

  const handleSave = () => {
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) {
      showError("Add at least 2 options to save a list.");
      return;
    }
    const name = prompt("Name your list:", "My List");
    if (name) {
      saveList(name, validOptions);
      showSuccess("List saved successfully!");
    }
  };

  const loadList = (items: string[]) => {
    setOptions(items);
    showSuccess("List loaded!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-4 md:py-6 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300 flex flex-col" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
      <div className="max-w-3xl mx-auto w-full flex-1">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight">
            Rate<span className="text-purple-600">Radar</span>
          </h1>
          <p className="text-muted-foreground font-bold text-sm md:text-base">Stop overthinking, start doing.</p>
        </div>

        <DecisionOverlay 
          isVisible={isWheelVisible}
          onClose={() => setIsWheelVisible(false)}
          options={options}
          rotation={rotation}
          isSpinning={isSpinning}
          result={result}
          wheelStyle={wheelStyle}
        />

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 md:mb-6 bg-card border border-border rounded-xl p-1 h-11 md:h-14">
            <TabsTrigger value="edit" className="rounded-lg text-sm md:text-base font-bold data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">
              <Plus className="w-4 h-4 mr-2" /> Edit
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-lg text-sm md:text-base font-bold data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">
              <History className="w-4 h-4 mr-2" /> Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <Card className="border-none shadow-xl shadow-purple-500/5 rounded-2xl md:rounded-3xl overflow-hidden bg-card">
              <CardHeader className="border-b border-border py-3 md:py-4 px-4 md:px-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <CardTitle className="text-lg md:text-xl font-black">Options</CardTitle>
                    <ToggleGroup 
                      type="single" 
                      value={wheelStyle} 
                      onValueChange={(value) => value && setWheelStyle(value as 'flat' | 'cylinder')}
                      className="bg-muted/50 p-1 rounded-lg"
                    >
                      <ToggleGroupItem value="flat" className="h-7 px-2 text-[10px] font-bold data-[state=on]:bg-background">
                        <CircleDot className="w-3 h-3 mr-1" /> Flat
                      </ToggleGroupItem>
                      <ToggleGroupItem value="cylinder" className="h-7 px-2 text-[10px] font-bold data-[state=on]:bg-background">
                        <Cylinder className="w-3 h-3 mr-1" /> 3D
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleSave} className="h-8 md:h-9 px-3 text-[10px] md:text-xs font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 rounded-lg">
                      <Save className="w-3 h-3 mr-1" /> Save
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setOptions(['', ''])} className="h-8 md:h-9 px-3 text-[10px] md:text-xs font-bold rounded-lg">
                      <RotateCcw className="w-3 h-3 mr-1" /> Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 md:pt-6 px-4 md:px-6 pb-6 md:pb-8">
                <div className="max-h-[40vh] md:max-h-[50vh] overflow-y-auto pr-1 mb-4 md:mb-6 custom-scrollbar">
                  <AnimatePresence initial={false}>
                    {options.map((option, index) => (
                      <OptionItem
                        key={index}
                        index={index}
                        value={option}
                        onChange={(val) => updateOption(index, val)}
                        onRemove={() => removeOption(index)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
                
                <BulkInput onImport={(items) => setOptions(items)} />

                <div className="mt-6 md:mt-8 flex flex-col gap-3">
                  <Button 
                    variant="secondary" 
                    onClick={addOption}
                    className="w-full h-12 md:h-14 text-sm md:text-base font-bold rounded-xl border-2 border-dashed border-border bg-transparent hover:bg-accent hover:border-purple-300 transition-all"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add One More
                  </Button>
                  
                  <Button 
                    size="lg"
                    disabled={isSpinning}
                    onClick={handleDecide}
                    className="w-full h-14 md:h-16 text-base md:text-lg font-black rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 transition-all active:scale-95"
                  >
                    {isSpinning ? "Spinning..." : <><Sparkles className="w-5 h-5 mr-2" /> Pick For Me!</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <div className="space-y-3">
              {lists.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-2xl border-2 border-dashed border-border">
                  <History className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
                  <p className="text-muted-foreground font-bold text-sm md:text-base">No saved lists yet</p>
                </div>
              ) : (
                lists.map((list) => (
                  <div key={list.id} className="bg-card p-4 md:p-5 rounded-xl border border-border shadow-sm flex justify-between items-center">
                    <div className="min-w-0 flex-1 mr-4">
                      <h4 className="text-base md:text-lg font-black whitespace-nowrap overflow-hidden text-ellipsis">{list.name}</h4>
                      <p className="text-[10px] md:text-xs font-bold text-muted-foreground">{list.items.length} items</p>
                    </div>
                    <div className="flex gap-2 flex-none">
                      <Button size="sm" variant="outline" className="h-8 md:h-10 rounded-lg font-bold text-xs" onClick={() => loadList(list.items)}>Load</Button>
                      <Button size="sm" variant="ghost" className="h-8 md:h-10 rounded-lg font-bold text-xs text-destructive hover:bg-destructive/10" onClick={() => deleteList(list.id)}>Delete</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        <AdPlaceholder />

        <div className="mt-8 flex flex-col items-center gap-4">
          <ThemeToggle />
          <div className="opacity-50">
            <MadeWithDyad />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        @media (min-width: 768px) { .custom-scrollbar::-webkit-scrollbar { width: 6px; } }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--muted-foreground) / 0.3); border-radius: 10px; }
      `}} />
    </div>
  );
};

export default Index;