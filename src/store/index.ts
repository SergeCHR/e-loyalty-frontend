import { Tier } from "@/api/models/tier";
import { create } from "zustand";

type AppTier = {
  id: string;
  name: string;
  qualificationThreshold: number;
};

type TiersState = {
  editMode: {
    isActive: boolean;
    tier?: AppTier;
  };
  setEditMode: (value: TiersState["editMode"]) => void;
  defaultTiers: AppTier[];
  customTiers: AppTier[];
  setCustomTiers: (tier: AppTier[]) => void;
  editTier: (id: string, newTier: AppTier) => void;
  selectedValues: string[];
  selectedTiers: Tier[];
  setSelectedValues: (value: string[]) => void;
  setSelectedTiers: (value: Tier[]) => void;
};

export const useTiersStore = create<TiersState>((set) => ({
  //retrieve from tanstack;
  defaultTiers: [
    { id: "1", name: "Silver", qualificationThreshold: 0 },
    { id: "2", name: "Gold", qualificationThreshold: 200 },
    { id: "3", name: "Platinum", qualificationThreshold: 500 },
  ],
  customTiers: [],
  editMode: {
    isActive: false,
    tier: undefined,
  },
  setEditMode: (mode) => set({ editMode: mode }),
  editTier: (id, newTier) =>
    set((state) => ({
      customTiers: state.customTiers.map((tier) =>
        tier.id === id ? { ...tier, ...newTier } : tier
      ),
    })),
  setCustomTiers: (value) => set({ customTiers: value }),
  selectedValues: [],
  setSelectedValues: (value) => set({ selectedValues: value }),
  selectedTiers: [],
  setSelectedTiers: (value) => set({ selectedTiers: value }),
}));
