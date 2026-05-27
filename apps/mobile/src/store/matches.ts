/**
 * Zustand store for matches state
 */

import { create } from 'zustand';
import { Match } from '@halal-tinder/shared';

interface MatchesState {
  matches: Match[];
  isLoading: boolean;
  setMatches: (matches: Match[]) => void;
  addMatch: (match: Match) => void;
  removeMatch: (matchId: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useMatchesStore = create<MatchesState>((set) => ({
  matches: [],
  isLoading: false,
  
  setMatches: (matches) => set({ matches }),
  addMatch: (match) => set((state) => ({ 
    matches: [...state.matches, match] 
  })),
  removeMatch: (matchId) => set((state) => ({ 
    matches: state.matches.filter((m) => m.id !== matchId) 
  })),
  setLoading: (isLoading) => set({ isLoading }),
}));
