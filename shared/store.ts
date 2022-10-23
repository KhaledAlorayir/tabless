import create from "zustand";
import { persist } from "zustand/middleware";
import { Alert, Link } from "./types";

interface AlertStoreType {
  alert: Alert | null;
  addAlert: (alert: Alert) => void;
  clearAlert: () => void;
}

interface EditStoreType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  EditLink: Link | null;
  setEdit: (link: Link) => void;
  clearEdit: () => void;
}

interface ThemeStoreType {
  theme: "light" | "dark";
  switchTheme: () => void;
}

export const useAlerts = create<AlertStoreType>((set) => ({
  alert: null,
  addAlert: (alert) => {
    set(({ clearAlert }) => {
      clearAlert();
      return { alert };
    });
  },
  clearAlert: () => {
    set({ alert: null });
  },
}));

export const useEdit = create<EditStoreType>((set) => ({
  isOpen: false,
  EditLink: null,
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  },
  setEdit: (link: Link) => {
    set({ isOpen: true, EditLink: link });
  },
  clearEdit: () => {
    set({ isOpen: false, EditLink: null });
  },
}));

export const useTheme = create(
  persist<ThemeStoreType>((set) => ({
    theme: "dark",
    switchTheme: () => {
      set(({ theme }) => ({ theme: theme === "dark" ? "light" : "dark" }));
    },
  }))
);

/*
(set) => ({
  theme: "dark",
  switchTheme: () => {
    set(({ theme }) => ({ theme: theme === "dark" ? "light" : "dark" }));
  },
})
*/
