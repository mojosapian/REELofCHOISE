import { useState, useCallback, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

export const useDecider = (options: string[]) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [spinDuration, setSpinDuration] = useState(4); // Default 4s
  const [history, setHistory] = useState<string[]>([]);
  const lastRotation = useRef(0);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('decider_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
        setHistory([]);
      }
    }
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('decider_history');
  }, []);

  const decide = useCallback(() => {
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) return;

    setIsSpinning(true);
    setResult(null);

    const winnerIndex = Math.floor(Math.random() * validOptions.length);
    const angleStep = 360 / validOptions.length;
    
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const currentRotation = lastRotation.current;
    const baseRotation = Math.ceil(currentRotation / 360) * 360;
    const targetRotation = baseRotation + (extraSpins * 360) + (winnerIndex * angleStep);
    
    setTimeout(() => {
      setRotation(targetRotation);
      lastRotation.current = targetRotation;
    }, 50);

    // Handle result after animation finishes
    setTimeout(() => {
      const winner = validOptions[winnerIndex];
      setResult(winner);
      setIsSpinning(false);
      
      // Update History (Keep last 5)
      setHistory(prev => {
        const newHistory = [winner, ...prev].slice(0, 5);
        localStorage.setItem('decider_history', JSON.stringify(newHistory));
        return newHistory;
      });
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF0080', '#7928CA', '#0070F3']
      });
    }, (spinDuration * 1000) + 50);
  }, [options, spinDuration]);

  return {
    isSpinning,
    result,
    rotation,
    spinDuration,
    setSpinDuration,
    history,
    clearHistory,
    decide
  };
};