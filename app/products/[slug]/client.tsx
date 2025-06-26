'use client'

import { useProduct } from '@/app/api/useProducts'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useCartStore } from '@/stores/cartStore'
import { FaHeart, FaShoppingCart, FaRegHeart } from 'react-icons/fa'
import Spinner from '@/components/Spinner'
import NotFound from '@/app/not-found'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'

export default function ProductClient() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const id = slug?.split('-').pop() || ''
  const { data: product, isLoading, isError } = useProduct(id)
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()
  const { addToCart, setCartOpen } = useCartStore()
  const favorite = product ? isFavorite(product.id) : false
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setCartOpen(true)
  }

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

  if (isLoading) {
    return <Spinner text="Loading product details..." fullScreen />
  }

  if (isError || !product) {
    return <NotFound />
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-light px-4 py-8 transition-colors duration-500 dark:bg-dark lg:flex-row">
      <div className="container relative flex flex-1 items-center justify-center">
        {!imgLoaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-light transition-colors duration-500 dark:bg-dark">
            <Spinner text="Loading image..." />
          </div>
        )}
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={400}
          className={twMerge(
            'size-full max-w-xs rounded object-cover transition-opacity duration-300 sm:max-w-md',
            imgLoaded && 'opacity-100',
            !imgLoaded && 'opacity-0'
          )}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      <div className="container flex flex-1 flex-col justify-between gap-6">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-orange sm:text-4xl">
            {product.title}
          </h1>
          <p className="mb-6 text-lg text-gray-700 transition-colors duration-500 dark:text-gray-200">
            {product.description}
          </p>
          <div className="mb-4 flex flex-wrap gap-6 text-lg">
            <span className="font-semibold text-gray-600 transition-colors duration-500 dark:text-gray-300">
              Category: <span className="text-orange">{product.category}</span>
            </span>
            <span className="font-semibold text-gray-600 transition-colors duration-500 dark:text-gray-300">
              Rating:{' '}
              <span className="text-yellow-400">{product.rating} ★</span>
            </span>
          </div>
          <div className="mb-8 text-3xl font-bold text-orange">
            ${product.price.toFixed(2)}
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={handleAddToCart}
            className={twMerge(
              'flex items-center justify-center gap-2 rounded bg-orange px-8 py-4 text-lg font-semibold text-white transition hover:bg-orangeLight'
            )}
            title="Add to Cart"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
          <button
            onClick={handleFavorite}
            className={twMerge(
              'flex items-center justify-center gap-2 rounded border border-orange px-8 py-4 text-lg font-semibold transition',
              favorite && 'bg-orange text-white hover:bg-orangeLight',
              !favorite &&
                'bg-white text-orange hover:bg-orangeLight hover:text-white'
            )}
            title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            {favorite ? <FaHeart /> : <FaRegHeart />}
            {favorite ? 'Remove Favorite' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  )
}
