import { create } from "zustand";

export const useConfigurationStore = create((set) => ({
    submenus: [],
    setModules: (data) => set(() => ({submenus: data}))
}))
