import React, { useState } from 'react';
import { Play, Edit2, Plus, Minus } from 'lucide-react';
import type { GameSettings, Player, DiceConfig } from '../types';
import { getAvatarIcon } from '../utils/avatarUtils';
import AvatarSelector from './AvatarSelector';
import ColorSelector from './ColorSelector';
import DiceConfig from './DiceConfig';

interface GameSetupProps {
  onStartGame: (settings: GameSettings) => void;
  onCancel: () => void;
}

export default function GameSetup({ onStartGame, onCancel }: GameSetupProps) {
  const [gameName, setGameName] = useState('Nouvelle Partie');
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Joueur 1', avatar: 'user', color: '#2563eb' },
    { id: '2', name: 'Joueur 2', avatar: 'userCircle', color: '#dc2626' },
  ]);
  const [dice, setDice] = useState<DiceConfig[]>([
    { id: '1', faces: 6 }
  ]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState<string | null>(null);

  const addPlayer = () => {
    const colors = ['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c', '#0891b2'];
    const usedColors = players.map(p => p.color);
    const availableColors = colors.filter(c => !usedColors.includes(c));
    const newColor = availableColors[0] || colors[0];

    setPlayers([
      ...players, 
      { 
        id: crypto.randomUUID(), 
        name: `Joueur ${players.length + 1}`,
        avatar: 'user',
        color: newColor
      }
    ]);
  };

  const removePlayer = (id: string) => {
    if (players.length > 2) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  const updatePlayerName = (id: string, name: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, name } : p));
  };

  const updatePlayerAvatar = (id: string, avatar: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, avatar } : p));
    setEditingAvatar(null);
  };

  const updatePlayerColor = (id: string, color: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, color } : p));
  };

  const handleStartGame = () => {
    onStartGame({
      gameName,
      players,
      dice,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-8 text-center">
        {isEditingName ? (
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            className="text-2xl font-bold text-center w-full border-b-2 border-blue-500 focus:outline-none"
            autoFocus
          />
        ) : (
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold">{gameName}</h1>
            <button
              onClick={() => setIsEditingName(true)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <Edit2 size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Joueurs</h2>
          {players.map((player) => (
            <div key={player.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingAvatar(editingAvatar === player.id ? null : player.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  style={{ color: player.color }}
                >
                  {React.createElement(getAvatarIcon(player.avatar), { size: 24 })}
                </button>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayerName(player.id, e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ColorSelector
                  color={player.color}
                  onChange={(color) => updatePlayerColor(player.id, color)}
                />
                {players.length > 2 && (
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <Minus size={20} />
                  </button>
                )}
              </div>
              {editingAvatar === player.id && (
                <AvatarSelector
                  selectedAvatar={player.avatar}
                  onSelect={(avatar) => updatePlayerAvatar(player.id, avatar)}
                  color={player.color}
                />
              )}
            </div>
          ))}
          <button
            onClick={addPlayer}
            className="w-full py-2 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Ajouter un joueur
          </button>
        </div>

        <DiceConfig dice={dice} onChange={setDice} />

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Annuler
          </button>
          <button
            onClick={handleStartGame}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Play size={20} />
            Démarrer
          </button>
        </div>
      </div>
    </div>
  );
}