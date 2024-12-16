import React from 'react';
import { Clock, Play, Trash2 } from 'lucide-react';
import type { SavedGame } from '../types';

interface SavedGamesProps {
  games: SavedGame[];
  onLoadGame: (game: SavedGame) => void;
  onDeleteGame: (id: string) => void;
  onNewGame: () => void;
}

export default function SavedGames({ games, onLoadGame, onDeleteGame, onNewGame }: SavedGamesProps) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Jeu de Dés</h1>
        <p className="text-gray-600">Créez une nouvelle partie ou reprenez une partie sauvegardée</p>
      </div>

      <button
        onClick={onNewGame}
        className="w-full mb-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium text-lg"
      >
        <Play size={24} />
        Nouvelle Partie
      </button>

      {games.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Parties sauvegardées</h2>
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{game.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    {new Date(game.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDeleteGame(game.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    onClick={() => onLoadGame(game)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reprendre
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}