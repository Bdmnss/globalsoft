'use client'

import { useFavoritesStore } from '@/stores/favoritesStore'
import ProductsGrid from '@/components/ProductsGrid'

export default function FavoritesClient() {
  const favorites = useFavoritesStore((state) => state.favorites)
  return (
    <div className="flex min-h-screen flex-col items-center bg-light py-20 transition-colors duration-500 dark:bg-dark">
      <h1 className="mb-6 text-5xl text-white">Favorites</h1>
      <ProductsGrid products={favorites} />
    </div>
  )
}
