import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from '../storage';
import { OfflineAction, OfflineState } from './types';

interface OfflineStore extends OfflineState {
  setOnlineStatus: (isOnline: boolean) => void;
  addPendingAction: (action: OfflineAction) => void;
  removePendingAction: (actionId: string) => void;
  incrementRetryCount: (actionId: string) => void;
  setLastSyncTime: (time: string) => void;
  clearPendingActions: () => void;
}

export const useOfflineStore = create<OfflineStore>()(
  persist(
    (set) => ({
      isOnline: true,
      pendingActions: [],
      lastSyncTime: null,
      
      setOnlineStatus: (isOnline) => set({ isOnline }),
      
      addPendingAction: (action) =>
        set((state) => ({
          pendingActions: [...state.pendingActions, action],
        })),
      
      removePendingAction: (actionId) =>
        set((state) => ({
          pendingActions: state.pendingActions.filter(
            (action) => action.id !== actionId
          ),
        })),
      
      incrementRetryCount: (actionId) =>
        set((state) => ({
          pendingActions: state.pendingActions.map((action) =>
            action.id === actionId
              ? { ...action, retryCount: action.retryCount + 1 }
              : action
          ),
        })),
      
      setLastSyncTime: (lastSyncTime) => set({ lastSyncTime }),
      
      clearPendingActions: () => set({ pendingActions: [] }),
    }),
    {
      name: 'offline-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
