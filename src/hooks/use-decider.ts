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

    // 1. Calculate Winner First
    const winnerIndex = Math.floor(Math.random() * validOptions.length);
    const angleStep = 360 / validOptions.length;
    
    // 2. Calculate Degrees using the requested formula
    // TotalRotation = (FullSpins * 360) + (winnerIndex * DegreesPerSlice)
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    
    // We calculate the target based on the current rotation to ensure it always spins forward
    const currentRotation = lastRotation.current;
    const baseRotation = Math.ceil(currentRotation / 360) * 360;
    const targetRotation = baseRotation + (extraSpins * 360) + (winnerIndex * angleStep);
    
    console.log(`[Decider] Winner: ${validOptions[winnerIndex]} (Index: ${winnerIndex})`);
    console.log(`[Decider] Target Rotation: ${targetRotation}deg`);
    
    // 3. Sync Animation
    // Small timeout to ensure the overlay is ready to animate from the last position
    setTimeout(() => {
      setRotation(targetRotation);
      lastRotation.current = targetRotation;
    }, 50);

    // 4. Handle Result
    setTimeout(() => {
      setResult(validOptions[winnerIndex]);
      setIsSpinning(false);
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF0080', '#7928CA', '#0070F3']
      });
    }, 4050);
  }, [options]);

  return {
    isSpinning,
    result,
    rotation,
    decide
  };
};