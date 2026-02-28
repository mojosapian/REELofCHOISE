import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Sparkles, RotateCcw } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import OptionItem from "@/components/OptionItem";
import DecisionVisualizer from "@/components/DecisionVisualizer";
import { useDecider } from "@/hooks/use-decider";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showError } from "@/utils/toast";

const Index = () => {
  const [options, setOptions] = useState<string[]>(['Pizza', 'Sushi', 'Burgers']);
  const { isSpinning, result, currentIndex, decide } = useDecider(options);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) {
      showError("You need at least 2 options to decide!");
      return;
    }
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleDecide = () => {
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) {
      showError("Please enter at least 2 valid options.");
      return;
    }
    decide();
  };

  const reset = () => {
    setOptions(['', '']);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
            10-Second <span className="text-purple-600">Decider</span>
          </h1>
          <p className="text-slate-500 font-medium">Stop overthinking, start doing.</p>
        </div>

        <DecisionVisualizer 
          options={options} 
          currentIndex={currentIndex} 
          isSpinning={isSpinning} 
          result={result} 
        />

        <Card className="border-none shadow-2xl shadow-purple-100/50 rounded-3xl overflow-hidden">
          <CardHeader className="bg-white border-b border-slate-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Your Options</CardTitle>
                <CardDescription>Add the choices you're stuck between</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={reset} className="text-xs h-8 rounded-full">
                <RotateCcw className="w-3 h-3 mr-1" /> Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="max-h-[40vh] overflow-y-auto pr-2 mb-6 custom-scrollbar">
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

            <div className="flex flex-col gap-3">
              <Button 
                variant="secondary" 
                onClick={addOption}
                className="w-full rounded-xl border-2 border-dashed border-slate-200 bg-transparent hover:bg-slate-50 hover:border-purple-300 transition-all"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Another Option
              </Button>
              
              <Button 
                size="lg"
                disabled={isSpinning}
                onClick={handleDecide}
                className="w-full h-14 text-lg font-bold rounded-2xl bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all active:scale-95"
              >
                {isSpinning ? (
                  "Deciding..."
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" /> Pick For Me!
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 opacity-50">
          <MadeWithDyad />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default Index;