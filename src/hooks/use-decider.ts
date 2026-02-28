import { useState, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';

export const useDecider = (options: string[]) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const lastRotation = useRef(0);

  const decide = useCallback(() => {
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) return;

    setIsSpinning(true);
    setResult(null);

    const winnerIndex = Math.floor(Math.random() * validOptions.length);
    const sliceAngle = 360 / validOptions.length;
    
    // Calculate rotation to land on the winner at the top (0 degrees)
    // We add multiple full spins (5-8) for visual effect
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const winnerMidAngle = (winnerIndex * sliceAngle) + (sliceAngle / 2);
    
    // The wheel rotates clockwise, so to bring a slice to the top (0deg), 
    // we need to rotate by (360 - midAngle)
    const targetRotation = lastRotation.current + (extraSpins * 360) + (360 - winnerMidAngle);
    
    setRotation(targetRotation);
    lastRotation.current = targetRotation;

    // Match this timeout with the CSS transition duration (4s)
    setTimeout(() => {
      setResult(validOptions[winnerIndex]);
      setIsSpinning(false);
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF0080', '#7928CA', '#0070F3']
      });
    }, 4000);
  }, [options]);

  return {
    isSpinning,
    result,
    rotation,
    decide
  };
};