import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from '../storage';
import { Game, GameState } from './types';

interface GameStore extends GameState {
  setGames: (games: Game[]) => void;
  addGame: (game: Game) => void;
  updateGame: (game: Game) => void;
  setCurrentGame: (game: Game | null) => void;
  setLoading: (loading: boolean) => void;
  removeGame: (gameId: string) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      games: [],
      currentGame: null,
      isLoading: false,
      
      setGames: (games) => set({ games }),
      
      addGame: (game) =>
        set((state) => ({
          games: [...state.games, game],
        })),
      
      updateGame: (updatedGame) =>
        set((state) => ({
          games: state.games.map((game) =>
            game.id === updatedGame.id ? updatedGame : game
          ),
          currentGame:
            state.currentGame?.id === updatedGame.id
              ? updatedGame
              : state.currentGame,
        })),
      
      setCurrentGame: (currentGame) => set({ currentGame }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      removeGame: (gameId) =>
        set((state) => ({
          games: state.games.filter((game) => game.id !== gameId),
          currentGame:
            state.currentGame?.id === gameId ? null : state.currentGame,
        })),
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
