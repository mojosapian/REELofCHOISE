import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

export const useDecider = (options: string[]) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const decide = useCallback(() => {
    if (options.length < 2) return;

    setIsSpinning(true);
    setResult(null);

    // Shuffling animation logic
    let iterations = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
      setCurrentIndex(Math.floor(Math.random() * options.length));
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        const winnerIndex = Math.floor(Math.random() * options.length);
        const winner = options[winnerIndex];
        
        setCurrentIndex(winnerIndex);
        setResult(winner);
        setIsSpinning(false);
        
        // Trigger confetti
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF0080', '#7928CA', '#0070F3']
        });
      }
    }, 100);
  }, [options]);

  return {
    isSpinning,
    result,
    currentIndex,
    decide
  };
};