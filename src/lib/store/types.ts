import { User } from '@supabase/supabase-js';

export interface Game {
  id: string;
  name: string;
  players: string[];
  rounds: Round[];
  rules: GameRules;
  status: 'setup' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  isOffline?: boolean;
}

export interface Round {
  roundNumber: number;
  bids: { [playerId: string]: number };
  tricks: { [playerId: string]: number };
  scores: { [playerId: string]: number };
}

export interface GameRules {
  maxRounds: number;
  scoringSystem: 'standard' | 'custom';
  allowNullBids: boolean;
  customRules?: any;
}

export interface OfflineAction {
  id: string;
  type: 'CREATE_GAME' | 'UPDATE_GAME' | 'DELETE_GAME';
  payload: any;
  timestamp: string;
  retryCount: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface GameState {
  games: Game[];
  currentGame: Game | null;
  isLoading: boolean;
}

export interface OfflineState {
  isOnline: boolean;
  pendingActions: OfflineAction[];
  lastSyncTime: string | null;
}

export interface SyncState {
  isSyncing: boolean;
  lastSyncError: string | null;
  syncProgress: number;
}
