'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FaHeart, FaShoppingCart, FaRegHeart } from 'react-icons/fa'
import { twMerge, twJoin } from 'tailwind-merge'

import { Product } from '@/types/types'

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev)
  }

  return (
    <div
      className="relative flex transform cursor-pointer flex-col rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 dark:bg-charcoal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2 lg:hidden">
        <button
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
              isFavorite
                ? 'bg-orange text-white hover:bg-orangeLight'
                : 'bg-white text-orange hover:bg-orangeLight hover:text-white'
            )
          )}
          title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      <Image
        width={160}
        height={160}
        src={product.thumbnail}
        alt={product.title}
        className="mb-4 size-40 self-center rounded object-cover"
      />
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            {product.title}
          </h3>
          <p className="text-lg font-bold text-orange">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center">
          <span className="mr-1 text-yellow-400">★</span>
          <span className="text-base text-black dark:text-white">
            {product.rating}
          </span>
        </div>
      </div>
      {hovered && (
        <div className="absolute left-0 top-0 hidden h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-black/40 transition-opacity lg:flex">
          <button
            className="flex items-center gap-2 rounded bg-orange px-4 py-2 text-white shadow transition hover:bg-orangeLight"
            title="Add to Cart"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
          <button
            onClick={handleFavorite}
            className={twMerge(
              twJoin(
                'flex items-center gap-2 rounded px-4 py-2 shadow transition',
                isFavorite
                  ? 'bg-orange text-white hover:bg-orangeLight'
                  : 'bg-white text-orange hover:bg-orangeLight hover:text-white'
              )
            )}
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
            {isFavorite ? 'Remove Favorite' : 'Favorite'}
          </button>
        </div>
      )}
    </div>
  )
}
