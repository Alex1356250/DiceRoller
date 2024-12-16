import React, { useState } from 'react';
import { Settings, Save, Home } from 'lucide-react';
import type { GameState, DiceRoll } from '../types';
import Dice from './Dice';
import { getAvatarIcon } from '../utils/avatarUtils';

interface GamePlayProps {
  gameState: GameState;
  onRoll: (roll: DiceRoll) => void;
  onSave: () => void;
  onHome: () => void;
  onSettings: () => void;
}

export default function GamePlay({ gameState, onRoll, onSave, onHome, onSettings }: GamePlayProps) {
  const [diceValues, setDiceValues] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const currentPlayer = gameState.settings.players[gameState.currentPlayerIndex];
  const PlayerAvatar = getAvatarIcon(currentPlayer.avatar);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const rolls = gameState.settings.dice.map(die => 
        Math.floor(Math.random() * die.faces) + 1
      );
      setDiceValues(rolls);
      setIsRolling(false);
      onRoll({
        playerId: currentPlayer.id,
        playerName: currentPlayer.name,
        rolls,
        total: rolls.reduce((a, b) => a + b, 0),
        timestamp: Date.now(),
      });
    }, 1000);
  };

  const handleSave = () => {
    onSave();
    alert('Partie sauvegardée !');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{gameState.settings.gameName}</h1>
        <div className="flex gap-4">
          <button
            onClick={onSettings}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Paramètres"
          >
            <Settings size={24} />
          </button>
          <button
            onClick={handleSave}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Sauvegarder"
          >
            <Save size={24} />
          </button>
          <button
            onClick={onHome}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Menu principal"
          >
            <Home size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <PlayerAvatar size={32} style={{ color: currentPlayer.color }} />
              <h2 className="text-xl font-semibold">Au tour de</h2>
            </div>
            <p className="text-3xl font-bold" style={{ color: currentPlayer.color }}>
              {currentPlayer.name}
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {(isRolling ? Array(gameState.settings.dice.length).fill(1) : diceValues).map((value, index) => (
              <Dice 
                key={index} 
                value={value} 
                isRolling={isRolling}
                color={currentPlayer.color}
              />
            ))}
          </div>

          {diceValues.length > 0 && !isRolling && (
            <div className="text-center mb-8">
              <p className="text-lg">Total</p>
              <p className="text-4xl font-bold" style={{ color: currentPlayer.color }}>
                {diceValues.reduce((a, b) => a + b, 0)}
              </p>
            </div>
          )}

          <button
            onClick={rollDice}
            disabled={isRolling}
            className="w-full py-3 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
            style={{ backgroundColor: currentPlayer.color }}
          >
            {isRolling ? 'Lancement...' : 'Lancer les dés'}
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Historique</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {gameState.rolls.map((roll, index) => {
              const player = gameState.settings.players.find(p => p.id === roll.playerId);
              const RollAvatar = getAvatarIcon(player?.avatar || 'user');
              return (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <RollAvatar size={20} style={{ color: player?.color }} />
                      <span className="font-medium" style={{ color: player?.color }}>
                        {roll.playerName}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(roll.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      {roll.rolls.join(' + ')} = {roll.total}
                    </div>
                    <div className="text-lg font-bold" style={{ color: player?.color }}>
                      {roll.total}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}