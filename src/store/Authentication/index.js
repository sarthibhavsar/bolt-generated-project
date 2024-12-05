import { create } from "zustand";

export const useAuthenticationStore = create((set) => ({
    modules: [],
    setModules: (data) => set(() => ({modules: data}))
}))
