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
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const winnerMidAngle = (winnerIndex * sliceAngle) + (sliceAngle / 2);
    
    // The wheel rotates clockwise, so to bring a slice to the top (0deg), 
    // we need to rotate by (360 - midAngle)
    const targetRotation = lastRotation.current + (extraSpins * 360) + (360 - winnerMidAngle);
    
    console.log(`[Decider] Triggered! Winner: ${validOptions[winnerIndex]} (Index: ${winnerIndex})`);
    console.log(`[Decider] Current Rotation: ${lastRotation.current}deg -> Target: ${targetRotation}deg`);
    
    // We use a small timeout to ensure the Overlay has mounted with the 'last' rotation 
    // before we trigger the 'new' rotation, which forces the CSS transition to fire.
    setTimeout(() => {
      setRotation(targetRotation);
      lastRotation.current = targetRotation;
    }, 50);

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
    }, 4050); // 4000ms transition + 50ms delay
  }, [options]);

  return {
    isSpinning,
    result,
    rotation,
    decide
  };
};