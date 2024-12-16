export interface Player {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export interface DiceConfig {
  id: string;
  faces: number;
}

export interface GameSettings {
  gameName: string;
  dice: DiceConfig[];
  players: Player[];
}

export interface DiceRoll {
  playerId: string;
  playerName: string;
  rolls: number[];
  total: number;
  timestamp: number;
}

export interface GameState {
  settings: GameSettings;
  currentPlayerIndex: number;
  rolls: DiceRoll[];
  isRolling: boolean;
}