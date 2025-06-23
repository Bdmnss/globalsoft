import { create } from 'zustand'

interface AuthState {
  hasToken: boolean
  setHasToken: (value: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  hasToken: !!(
    typeof window !== 'undefined' && localStorage.getItem('fake_token')
  ),
  setHasToken: (value) => set({ hasToken: value }),
}))
