import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Sparkles, RotateCcw, Save, History } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import OptionItem from "@/components/OptionItem";
import DecisionVisualizer from "@/components/DecisionVisualizer";
import BulkInput from "@/components/BulkInput";
import AdPlaceholder from "@/components/AdPlaceholder";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useDecider } from "@/hooks/use-decider";
import { useSavedLists } from "@/hooks/use-saved-lists";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showError } from "@/utils/toast";

const Index = () => {
  const [options, setOptions] = useState<string[]>(['Pizza', 'Sushi', 'Burgers']);
  const { isSpinning, result, currentIndex, decide } = useDecider(options);
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
    <div className="min-h-screen bg-background text-foreground py-4 md:py-8 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-3 tracking-tight">
            10-Second <span className="text-purple-600">Decider</span>
          </h1>
          <p className="text-muted-foreground font-bold text-lg md:text-xl">Stop overthinking, start doing.</p>
        </div>

        <DecisionVisualizer 
          options={options} 
          currentIndex={currentIndex} 
          isSpinning={isSpinning} 
          result={result} 
        />

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8 bg-card border border-border rounded-2xl p-1.5 h-14 md:h-20">
            <TabsTrigger value="edit" className="rounded-xl text-base md:text-xl font-bold data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">
              <Plus className="w-5 h-5 md:w-6 md:h-6 mr-2" /> Edit
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-xl text-base md:text-xl font-bold data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">
              <History className="w-5 h-5 md:w-6 md:h-6 mr-2" /> Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <Card className="border-none shadow-2xl shadow-purple-500/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-card">
              <CardHeader className="border-b border-border py-6 md:py-10 px-6 md:px-12">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl md:text-3xl font-black">Options</CardTitle>
                  <div className="flex gap-3 md:gap-4">
                    <Button variant="ghost" size="sm" onClick={handleSave} className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 rounded-xl">
                      <Save className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Save
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setOptions(['', ''])} className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base font-bold rounded-xl">
                      <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 md:pt-12 px-6 md:px-12 pb-8 md:pb-12">
                <div className="max-h-[40vh] md:max-h-[50vh] overflow-y-auto pr-2 mb-6 md:mb-10 custom-scrollbar">
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

                <div className="mt-8 md:mt-12 flex flex-col gap-4 md:gap-6">
                  <Button 
                    variant="secondary" 
                    onClick={addOption}
                    className="w-full h-14 md:h-20 text-lg md:text-2xl font-bold rounded-2xl md:rounded-[2rem] border-2 border-dashed border-border bg-transparent hover:bg-accent hover:border-purple-300 transition-all"
                  >
                    <Plus className="w-5 h-5 md:w-6 md:h-6 mr-2" /> Add One More
                  </Button>
                  
                  <Button 
                    size="lg"
                    disabled={isSpinning}
                    onClick={handleDecide}
                    className="w-full h-16 md:h-24 text-xl md:text-3xl font-black rounded-2xl md:rounded-[2rem] bg-purple-600 hover:bg-purple-700 text-white shadow-xl shadow-purple-500/30 transition-all active:scale-95"
                  >
                    {isSpinning ? "Deciding..." : <><Sparkles className="w-6 h-6 md:w-8 md:h-8 mr-3" /> Pick For Me!</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <div className="space-y-4 md:space-y-6">
              {lists.length === 0 ? (
                <div className="text-center py-16 md:py-24 bg-card rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-border">
                  <History className="w-16 h-16 md:w-24 md:h-24 text-muted-foreground/20 mx-auto mb-6" />
                  <p className="text-muted-foreground font-bold text-xl md:text-2xl">No saved lists yet</p>
                </div>
              ) : (
                lists.map((list) => (
                  <div key={list.id} className="bg-card p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-border shadow-lg flex justify-between items-center">
                    <div>
                      <h4 className="text-xl md:text-3xl font-black">{list.name}</h4>
                      <p className="text-sm md:text-lg font-bold text-muted-foreground">{list.items.length} items</p>
                    </div>
                    <div className="flex gap-3 md:gap-4">
                      <Button size="lg" variant="outline" className="h-12 md:h-16 px-6 md:px-10 rounded-xl md:rounded-2xl font-bold text-base md:text-xl" onClick={() => loadList(list.items)}>Load</Button>
                      <Button size="lg" variant="ghost" className="h-12 md:h-16 px-4 md:px-6 rounded-xl md:rounded-2xl font-bold text-destructive hover:bg-destructive/10" onClick={() => deleteList(list.id)}>Delete</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        <AdPlaceholder />

        <div className="mt-10 md:mt-16 flex flex-col items-center gap-6 md:gap-8">
          <ThemeToggle />
          <div className="opacity-50">
            <MadeWithDyad />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        @media (min-width: 768px) { .custom-scrollbar::-webkit-scrollbar { width: 8px; } }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--muted-foreground) / 0.3); border-radius: 10px; }
      `}} />
    </div>
  );
};

export default Index;