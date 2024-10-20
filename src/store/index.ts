import { BusinessTableUser } from "@/api/models/user";
import { Tier } from "@/api/models/tier";
import { TierId } from "@/api/branded-types";
import { create } from "zustand";
import { fill } from "@/lib/array";
import { generateFakeBusinessTableUser } from "@/lib/fake-data";

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

export const defaultTiers =  [
  { id: TierId.parse(1), name: "Silver", qualificationThreshold: 0 },
  { id: TierId.parse(2), name: "Gold", qualificationThreshold: 200 },
  { id: TierId.parse(3), name: "Platinum", qualificationThreshold: 500 },
]

export const tiers = [
  ...defaultTiers,
  { id: TierId.parse(4), name: "Diamond", qualificationThreshold: 700 },
]

export const useTiersStore = create<TiersState>((set) => ({
  isActive: false,
  setIsActive: (value) => set({ isActive: value }),
  //retrieve from tanstack;
  defaultTiers,
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

type PersonalizationSettingState = {
  color?: string;
  businessName: string;
  businessDescription: string;
  mainImage?: string;
  setMainImage: (image?: string) => void;
  setColor: (color?: string) => void;
  setBusinessName: (value: string) => void;
  setBusinessDescription: (value: string) => void;
}

export const usePersonalizationSettingsStore = create<PersonalizationSettingState>(set => ({
  businessDescription: "Custom business description",
  businessName: "Custom name",
  setMainImage: (value) => set({mainImage: value}),
  setBusinessDescription: (value) => set({ businessDescription: value }),
  setBusinessName: value => set({businessName: value}),
  color: undefined,
  setColor: (value) => set({color: value})
}))

type UsersTableState = {
 users: BusinessTableUser[]
 setUsers: (users: BusinessTableUser[]) => void
}

export const useUsersTableStore = create<UsersTableState>((set) => ({
  users: fill(28, generateFakeBusinessTableUser),
  setUsers: (newUsers) => set({users: newUsers}),
}))

type AddPointsModalState = {
  open: boolean;
  user?: BusinessTableUser
  setUser: (v: BusinessTableUser) => void
  setOpen: (v: boolean) => void
}

export const useAddPointsModalStore = create<AddPointsModalState>(set => ({
  open: false,
  setOpen: (value) => set({open: value}),
  setUser: (value) => set({user: value})
}))