import { create } from 'zustand'

interface ThemeState {
  theme: string
  setTheme: (theme: string) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'system',
  setTheme: (theme) => {
    set({ theme })
    localStorage.setItem('theme', theme)
    document.documentElement.classList.remove(
      theme === 'dark' ? 'light' : 'dark'
    )
    document.documentElement.classList.add(theme)
  },
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', newTheme)
      document.documentElement.classList.remove(state.theme)
      document.documentElement.classList.add(newTheme)
      return { theme: newTheme }
    }),
}))
