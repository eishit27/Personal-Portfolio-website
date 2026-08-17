// src/store/useStore.ts
import { create } from 'zustand';

interface StoreState {
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  // New state to track the open panel
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  
  activeSection: null,
  setActiveSection: (section) => set({ activeSection: section }),
}));