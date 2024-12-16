import React, { useState, useEffect } from 'react';
import GameSetup from './components/GameSetup';
import GamePlay from './components/GamePlay';
import SavedGames from './components/SavedGames';
import type { GameSettings, GameState, DiceRoll, SavedGame } from './types';

export default function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);

  useEffect(() => {
    loadSavedGames();
  }, []);

  const loadSavedGames = () => {
    const games: SavedGame[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('diceGame_')) {
        try {
          const savedGame = JSON.parse(localStorage.getItem(key) || '');
          games.push(savedGame);
        } catch (e) {
          console.error('Error loading saved game:', e);
        }
      }
    }
    setSavedGames(games.sort((a, b) => b.timestamp - a.timestamp));
  };

  const handleStartGame = (settings: GameSettings) => {
    const newGame: SavedGame = {
      id: crypto.randomUUID(),
      name: settings.gameName,
      timestamp: Date.now(),
      state: {
        settings,
        currentPlayerIndex: 0,
        rolls: [],
        isRolling: false,
      }
    };
    setGameState(newGame.state);
    setShowSetup(false);
    saveGame(newGame);
  };

  const handleRoll = (roll: DiceRoll) => {
    if (!gameState) return;
    
    const newState: GameState = {
      ...gameState,
      rolls: [roll, ...gameState.rolls],
      currentPlayerIndex: (gameState.currentPlayerIndex + 1) % gameState.settings.players.length,
    };
    setGameState(newState);
    
    const currentGame = savedGames.find(g => g.state.settings.gameName === gameState.settings.gameName);
    if (currentGame) {
      saveGame({ ...currentGame, state: newState, timestamp: Date.now() });
    }
  };

  const saveGame = (game: SavedGame) => {
    localStorage.setItem(`diceGame_${game.id}`, JSON.stringify(game));
    loadSavedGames();
  };

  const deleteGame = (id: string) => {
    localStorage.removeItem(`diceGame_${id}`);
    loadSavedGames();
  };

  const loadGame = (game: SavedGame) => {
    setGameState(game.state);
  };

  const handleHome = () => {
    if (confirm('Voulez-vous vraiment retourner au menu principal ? Les données non sauvegardées seront perdues.')) {
      setGameState(null);
      setShowSetup(false);
    }
  };

  if (gameState) {
    return (
      <GamePlay
        gameState={gameState}
        onRoll={handleRoll}
        onSave={() => loadSavedGames()}
        onHome={handleHome}
        onSettings={() => setShowSetup(true)}
      />
    );
  }

  if (showSetup) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <GameSetup 
          onStartGame={handleStartGame}
          onCancel={() => setShowSetup(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <SavedGames
        games={savedGames}
        onLoadGame={loadGame}
        onDeleteGame={deleteGame}
        onNewGame={() => setShowSetup(true)}
      />
    </div>
  );
}