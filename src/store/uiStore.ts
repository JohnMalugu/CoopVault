import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  darkMode: boolean
  setSidebarOpen: (v: boolean) => void
  toggleSidebar: () => void
  toggleDarkMode: () => void
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: true,
  darkMode: false,

  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  toggleDarkMode: () =>
    set((s) => {
      const next = !s.darkMode
      if (next) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { darkMode: next }
    }),
}))
