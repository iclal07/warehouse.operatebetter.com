import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

type AppState = {
  theme: Theme;
  sidebarCollapsed: boolean;
  language: "tr" | "en";
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setLanguage: (language: "tr" | "en") => void;
};

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      theme: "system",
      sidebarCollapsed: false,
      language: "tr",
      setTheme: theme => set({ theme }),
      toggleSidebar: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setLanguage: language => set({ language }),
    }),
    { name: "operate-better-warehouse" },
  ),
);
