import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Sparkles, RotateCcw, Save, History, LayoutGrid } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import OptionItem from "@/components/OptionItem";
import DecisionVisualizer from "@/components/DecisionVisualizer";
import BulkInput from "@/components/BulkInput";
import LockedCategory from "@/components/LockedCategory";
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
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-md mx-auto">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black mb-1 tracking-tight">
            10-Second <span className="text-purple-600">Decider</span>
          </h1>
          <p className="text-muted-foreground font-medium text-sm">Stop overthinking, start doing.</p>
        </div>

        <DecisionVisualizer 
          options={options} 
          currentIndex={currentIndex} 
          isSpinning={isSpinning} 
          result={result} 
        />

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-card border border-border rounded-xl p-1 h-12">
            <TabsTrigger value="edit" className="rounded-lg data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">
              <Plus className="w-4 h-4 mr-2" /> Edit
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-lg data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">
              <History className="w-4 h-4 mr-2" /> Saved
            </TabsTrigger>
            <TabsTrigger value="premium" className="rounded-lg data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">
              <LayoutGrid className="w-4 h-4 mr-2" /> Premium
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <Card className="border-none shadow-2xl shadow-purple-500/5 rounded-3xl overflow-hidden bg-card">
              <CardHeader className="border-b border-border py-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Options</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleSave} className="h-8 text-xs text-purple-600 dark:text-purple-400 hover:bg-purple-500/10">
                      <Save className="w-3 h-3 mr-1" /> Save
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setOptions(['', ''])} className="h-8 text-xs">
                      <RotateCcw className="w-3 h-3 mr-1" /> Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="max-h-[30vh] overflow-y-auto pr-2 mb-4 custom-scrollbar">
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

                <div className="mt-6 flex flex-col gap-3">
                  <Button 
                    variant="secondary" 
                    onClick={addOption}
                    className="w-full rounded-xl border-2 border-dashed border-border bg-transparent hover:bg-accent hover:border-purple-300 transition-all"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add One More
                  </Button>
                  
                  <Button 
                    size="lg"
                    disabled={isSpinning}
                    onClick={handleDecide}
                    className="w-full h-14 text-lg font-bold rounded-2xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 transition-all active:scale-95"
                  >
                    {isSpinning ? "Deciding..." : <><Sparkles className="w-5 h-5 mr-2" /> Pick For Me!</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <div className="space-y-3">
              {lists.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-3xl border border-dashed border-border">
                  <History className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">No saved lists yet</p>
                </div>
              ) : (
                lists.map((list) => (
                  <div key={list.id} className="bg-card p-4 rounded-2xl border border-border shadow-sm flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{list.name}</h4>
                      <p className="text-xs text-muted-foreground">{list.items.length} items</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => loadList(list.items)}>Load</Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteList(list.id)}>Delete</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="premium">
            <div className="space-y-3">
              <LockedCategory 
                name="Movie Night" 
                onUnlock={() => loadList(['Inception', 'The Matrix', 'Interstellar', 'Pulp Fiction', 'The Dark Knight'])} 
              />
              <LockedCategory 
                name="Dinner Ideas" 
                onUnlock={() => loadList(['Italian', 'Mexican', 'Thai', 'Indian', 'Greek', 'Burgers'])} 
              />
              <LockedCategory 
                name="Workout Routine" 
                onUnlock={() => loadList(['Pushups', 'Squats', 'Plank', 'Burpees', 'Lunges'])} 
              />
            </div>
          </TabsContent>
        </Tabs>

        <AdPlaceholder />

        <div className="mt-8 opacity-50">
          <MadeWithDyad />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--muted-foreground) / 0.2); border-radius: 10px; }
      `}} />
    </div>
  );
};

export default Index;