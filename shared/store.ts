import create from "zustand";
import { Alert } from "./types";

interface storeType {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  deleteAlert: (index: number) => void;
  clearAlerts: () => void;
}

export const useAlerts = create<storeType>((set) => ({
  alerts: [],
  addAlert: (alert) => {
    set((state) => ({ alerts: [...state.alerts, alert] }));
  },
  deleteAlert: (index) => {
    set((state) => ({ alerts: state.alerts.filter((_, i) => i !== index) }));
  },
  clearAlerts: () => {
    set({ alerts: [] });
  },
}));
