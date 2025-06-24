'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import CategoryDropdown from '@/components/CategoryDropdown'
import SearchInput from '@/components/SearchInput'
import ProductsGrid from '@/components/ProductsGrid'
import Pagination from '@/components/Pagination'
import SortDropdown from '@/components/SortDropdown'
import { Category } from '@/types/types'
import { fetchProducts } from '../api/useProducts'
import Spinner from '@/components/Spinner'

export default function ProductsClient({
  categories,
}: {
  categories: Category[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All'
  const initialSearch = searchParams.get('search') || ''

  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [search, setSearch] = useState(initialSearch)
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>(
    'default'
  )
  const [sortOpen, setSortOpen] = useState(false)

  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProducts(selectedCategory),
  })

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory && selectedCategory !== 'All')
      params.set('category', selectedCategory)
    if (search) params.set('search', search)
    router.replace(`/products?${params.toString()}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, search])

  const filteredProducts =
    sortOrder === 'asc'
      ? [...products].sort((a, b) => a.price - b.price)
      : sortOrder === 'desc'
        ? [...products].sort((a, b) => b.price - a.price)
        : products

  if (isPending) {
    return <Spinner fullScreen text="Loading products..." />
  }

  if (isError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-light dark:bg-dark">
        <span className="mb-4 text-7xl font-bold text-red-500">404</span>
        <span className="mb-2 text-2xl font-semibold text-red-500">
          Failed to load products.
        </span>
        <span className="text-base text-gray-500 dark:text-gray-400">
          Please try again later or check your connection.
        </span>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-light py-20 transition-colors duration-500 dark:bg-dark">
      <div className="container mb-8 flex w-full max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchInput search={search} setSearch={setSearch} />
        <CategoryDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryOpen={categoryOpen}
          setCategoryOpen={setCategoryOpen}
        />
        <SortDropdown
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortOpen={sortOpen}
          setSortOpen={setSortOpen}
        />
      </div>
      <ProductsGrid products={filteredProducts} />
      <Pagination />
    </div>
  )
}
