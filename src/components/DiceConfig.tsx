import React from 'react';
import { Plus, Minus } from 'lucide-react';
import type { DiceConfig } from '../types';

interface DiceConfigProps {
  dice: DiceConfig[];
  onChange: (dice: DiceConfig[]) => void;
}

export default function DiceConfig({ dice, onChange }: DiceConfigProps) {
  const addDice = () => {
    onChange([...dice, { id: crypto.randomUUID(), faces: 6 }]);
  };

  const removeDice = (id: string) => {
    if (dice.length > 1) {
      onChange(dice.filter(d => d.id !== id));
    }
  };

  const updateDiceFaces = (id: string, faces: number) => {
    onChange(dice.map(d => d.id === id ? { ...d, faces: Math.max(2, faces) } : d));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Configuration des dés</h2>
        <button
          onClick={addDice}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
        >
          <Plus size={20} />
          Ajouter un dé
        </button>
      </div>
      
      <div className="space-y-3">
        {dice.map((die) => (
          <div key={die.id} className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de faces
              </label>
              <input
                type="number"
                min="2"
                max="100"
                value={die.faces}
                onChange={(e) => updateDiceFaces(die.id, parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {dice.length > 1 && (
              <button
                onClick={() => removeDice(die.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-6"
                title="Supprimer ce dé"
              >
                <Minus size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}