import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  incidents: [],
  setUser: (user) => set({ user }),
  addIncident: (incident) =>
    set((state) => ({ incidents: [...state.incidents, incident] })),
  updateIncident: (id, updates) =>
    set((state) => ({
      incidents: state.incidents.map((incident) =>
        incident.id === id
          ? { ...incident, ...updates, updatedAt: new Date().toISOString() }
          : incident
      ),
    })),
  deleteIncident: (id) =>
    set((state) => ({
      incidents: state.incidents.filter((incident) => incident.id !== id),
    })),
}));
