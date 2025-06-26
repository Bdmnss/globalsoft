'use client'

import { useFavoritesStore } from '@/stores/favoritesStore'
import ProductsGrid from '@/components/ProductsGrid'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function FavoritesClient() {
  const favorites = useFavoritesStore((state) => state.favorites)
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('fake_token')) {
      router.replace('/login?redirect=/favorites')
    } else {
      setChecked(true)
    }
  }, [router])

  if (!checked) return null

  return (
    <div className="flex min-h-screen flex-col items-center bg-light py-20 transition-colors duration-500 dark:bg-dark">
      <h1 className="mb-6 text-5xl text-black transition-colors duration-500 dark:text-white">
        Favorites
      </h1>
      <ProductsGrid products={favorites} />
    </div>
  )
}
