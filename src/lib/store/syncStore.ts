import { create } from 'zustand';
import { SyncState } from './types';

interface SyncStore extends SyncState {
  setSyncing: (isSyncing: boolean) => void;
  setSyncError: (error: string | null) => void;
  setSyncProgress: (progress: number) => void;
}

export const useSyncStore = create<SyncStore>((set) => ({
  isSyncing: false,
  lastSyncError: null,
  syncProgress: 0,
  
  setSyncing: (isSyncing) =>
    set({
      isSyncing,
      lastSyncError: isSyncing ? null : undefined,
      syncProgress: isSyncing ? 0 : undefined,
    }),
  
  setSyncError: (lastSyncError) =>
    set({
      lastSyncError,
      isSyncing: false,
    }),
  
  setSyncProgress: (syncProgress) => set({ syncProgress }),
}));
