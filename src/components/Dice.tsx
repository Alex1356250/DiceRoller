import React from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

interface DiceProps {
  value: number;
  isRolling: boolean;
  color: string;
}

export default function Dice({ value, isRolling, color }: DiceProps) {
  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  const DiceIcon = value <= 6 ? diceIcons[value - 1] : null;

  return (
    <div className={`transition-transform ${isRolling ? 'animate-shake' : ''}`}>
      {DiceIcon ? (
        <DiceIcon size={64} style={{ color }} />
      ) : (
        <div 
          className="w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold"
          style={{ borderColor: color, color }}
        >
          {value}
        </div>
      )}
    </div>
  );
}