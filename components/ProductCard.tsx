'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaHeart, FaShoppingCart, FaRegHeart } from 'react-icons/fa'
import { twMerge, twJoin } from 'tailwind-merge'
import { useRouter } from 'next/navigation'

import { Product } from '@/types/types'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useCartStore } from '@/stores/cartStore'

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()
  const { addToCart, setCartOpen } = useCartStore()
  const router = useRouter()
  const favorite = isFavorite(product.id)

  const handleFavorite = () => {
    if (!localStorage.getItem('fake_token')) {
      router.push('/login')
      return
    }
    if (favorite) {
      removeFavorite(product.id)
    } else {
      addFavorite(product)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
    setCartOpen(true)
  }

  const slug = `${product.title.replace(/\s+/g, '-').toLowerCase()}-${product.price}-${product.id}`

  return (
    <Link href={`/products/${slug}`} className="block h-full" prefetch={false}>
      <div
        className="relative flex h-full transform cursor-pointer flex-col rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 dark:bg-charcoal"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2 lg:hidden">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 rounded bg-orange px-3 py-2 text-white shadow transition hover:bg-orangeLight"
            title="Add to Cart"
          >
            <FaShoppingCart />
          </button>
          <button
            onClick={handleFavorite}
            className={twMerge(
              twJoin(
                'flex items-center gap-2 rounded px-3 py-2 shadow transition',
                favorite
                  ? 'bg-orange text-white hover:bg-orangeLight'
                  : 'bg-white text-orange hover:bg-orangeLight hover:text-white'
              )
            )}
            title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            {favorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <div className="relative mb-4 flex items-center justify-center">
          {!imgLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white dark:bg-charcoal">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-orange border-t-transparent" />
            </div>
          )}
          <Image
            width={160}
            height={160}
            src={product.thumbnail}
            alt={product.title}
            className={twMerge(
              twJoin(
                'size-40 self-center rounded object-cover transition-opacity duration-300',
                imgLoaded ? 'opacity-100' : 'opacity-0'
              )
            )}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-black transition-colors duration-500 dark:text-white">
              {product.title}
            </h3>
            <p className="text-lg font-bold text-orange">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-yellow-400">★</span>
            <span className="text-base text-black transition-colors duration-500 dark:text-white">
              {product.rating}
            </span>
          </div>
        </div>
        {hovered && (
          <div className="absolute left-0 top-0 hidden h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-black/40 transition-opacity lg:flex">
            <button
              className="flex items-center gap-2 rounded bg-orange px-4 py-2 text-white shadow transition hover:bg-orangeLight"
              title="Add to Cart"
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
              Add to Cart
            </button>
            <button
              onClick={handleFavorite}
              className={twMerge(
                twJoin(
                  'flex items-center gap-2 rounded px-4 py-2 shadow transition',
                  favorite
                    ? 'bg-orange text-white hover:bg-orangeLight'
                    : 'bg-white text-orange hover:bg-orangeLight hover:text-white'
                )
              )}
              title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              {favorite ? <FaHeart /> : <FaRegHeart />}
              {favorite ? 'Remove Favorite' : 'Favorite'}
            </button>
          </div>
        )}
      </div>
    </Link>
  )
}
