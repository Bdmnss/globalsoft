import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types/types'

interface FavoritesState {
  favorites: Product[]
  addFavorite: (product: Product) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (product) => {
        if (!get().favorites.some((p) => p.id === product.id)) {
          set({ favorites: [...get().favorites, product] })
        }
      },
      removeFavorite: (id) => {
        set({ favorites: get().favorites.filter((p) => p.id !== id) })
      },
      isFavorite: (id) => get().favorites.some((p) => p.id === id),
    }),
    {
      name: 'favorites',
    }
  )
)
