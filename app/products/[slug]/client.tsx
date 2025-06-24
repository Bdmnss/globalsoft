'use client'

import { useProduct } from '@/app/api/useProducts'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import { FaHeart, FaShoppingCart, FaRegHeart } from 'react-icons/fa'
import Spinner from '@/components/Spinner'
import NotFound from '@/app/not-found'
import { twMerge, twJoin } from 'tailwind-merge'

export default function ProductClient() {
  const params = useParams()
  const slug = params?.slug as string
  const id = slug?.split('-').pop() || ''
  const { data: product, isLoading, isError } = useProduct(id)
  const [isFavorite, setIsFavorite] = useState(false)

  if (isLoading) {
    return <Spinner text="Loading product details..." fullScreen />
  }

  if (isError || !product) {
    return <NotFound />
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-light px-4 py-8 dark:bg-dark lg:flex-row">
      <div className="container flex flex-1 items-center justify-center">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={400}
          className="size-full max-w-xs rounded object-cover sm:max-w-md"
        />
      </div>
      <div className="container flex flex-1 flex-col justify-between gap-6">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-orange sm:text-4xl">
            {product.title}
          </h1>
          <p className="mb-6 text-lg text-gray-700 dark:text-gray-200">
            {product.description}
          </p>
          <div className="mb-4 flex flex-wrap gap-6 text-lg">
            <span className="font-semibold text-gray-600 dark:text-gray-300">
              Category: <span className="text-orange">{product.category}</span>
            </span>
            <span className="font-semibold text-gray-600 dark:text-gray-300">
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
            className={twMerge(
              twJoin(
                'flex items-center justify-center gap-2 rounded bg-orange px-8 py-4 text-lg font-semibold text-white transition hover:bg-orangeLight'
              )
            )}
            title="Add to Cart"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
          <button
            onClick={() => setIsFavorite((f) => !f)}
            className={twMerge(
              twJoin(
                'flex items-center justify-center gap-2 rounded border border-orange px-8 py-4 text-lg font-semibold transition',
                isFavorite
                  ? 'bg-orange text-white hover:bg-orangeLight'
                  : 'bg-white text-orange hover:bg-orangeLight hover:text-white'
              )
            )}
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
            {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  )
}
