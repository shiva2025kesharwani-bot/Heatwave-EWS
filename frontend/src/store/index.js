import { create } from "zustand";

export const useStore = create((set) => ({
  region: "india",
  setRegion: (region) => set({ region }),
  alerts: [],
  setAlerts: (alerts) => set({ alerts }),
}));
