import { Tier } from "@/api/models/tier";
import { TierId } from "@/api/branded-types";
import { create } from "zustand";

type TiersState = {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  editMode: {
    isActive: boolean;
    tier?: Tier;
  };
  setEditMode: (value: TiersState["editMode"]) => void;
  defaultTiers: Tier[];
  customTiers: Tier[];
  setCustomTiers: (tier: Tier[]) => void;
  editTier: (id: TierId, newTier: Tier) => void;
  selectedValues: string[];
  selectedTiers: Tier[];
  setSelectedValues: (value: string[]) => void;
  setSelectedTiers: (value: Tier[]) => void;
};

export const useTiersStore = create<TiersState>((set) => ({
  isActive: false,
  setIsActive: (value) => set({ isActive: value }),
  //retrieve from tanstack;
  defaultTiers: [
    { id: TierId.parse(1), name: "Silver", qualificationThreshold: 0 },
    { id: TierId.parse(2), name: "Gold", qualificationThreshold: 200 },
    { id: TierId.parse(3), name: "Platinum", qualificationThreshold: 500 },
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
