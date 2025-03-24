import { create } from "zustand";
import { Product } from "../models";

interface StoreState {
  avialabeItems: Product[];
  setAvailableItems: (items: Product[]) => void;
  addAvailableItem: (item: Product) => void;
  removeAvailableItem: (itemId: string) => void;
  updateAvailableItem: (updatedItem: Product) => void;
}

export const useStore = create<StoreState>((set) => ({
  avialabeItems: [],
  setAvailableItems: (items: Product[]) =>
    set(() => ({
      avialabeItems: items,
    })),
  addAvailableItem: (item: Product) =>
    set((state) => ({
      avialabeItems: [...state.avialabeItems, item],
    })),
  removeAvailableItem: (itemId: string) =>
    set((state) => ({
      avialabeItems: state.avialabeItems.filter((item) => item.id !== itemId),
    })),
  updateAvailableItem: (updatedItem: Product) =>
    set((state) => ({
      avialabeItems: state.avialabeItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    })),
}));
