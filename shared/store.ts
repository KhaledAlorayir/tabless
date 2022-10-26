import create from "zustand";
import { persist } from "zustand/middleware";
import { Alert, Link, Filter, AutoAdd } from "./types";

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

interface FilterStoreType {
  filter: Filter;
  addFilter: (filter: Filter) => void;
  clearFilter: () => void;
}

interface AutoAddStoreType {
  data: AutoAdd;
  set: (title: string, url: string) => void;
  clear: () => void;
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

export const useFilter = create<FilterStoreType>((set) => ({
  filter: { query: "", type: 0 },
  addFilter: (filter) => {
    set({ filter });
  },
  clearFilter: () => {
    set({ filter: { query: "", type: 0 } });
  },
}));

export const useAutoAdd = create(
  persist<AutoAddStoreType>((set) => ({
    data: null,
    set: (title, url) => {
      set({ data: { title, url } });
    },
    clear: () => {
      set({ data: null });
    },
  }))
);
