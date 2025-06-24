'use client'

import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/types'

export default function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="container grid w-full max-w-7xl auto-rows-fr grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {products.length === 0 && (
        <div className="col-span-full text-center text-xl text-gray-500">
          No products found.
        </div>
      )}
    </div>
  )
}
