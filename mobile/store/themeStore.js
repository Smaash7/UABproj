import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "light", // valor inicial
  setTheme: (themeName) => set({ theme: themeName }), // função para mudar tema
}));
