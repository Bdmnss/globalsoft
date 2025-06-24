'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import CategoryDropdown from '@/components/CategoryDropdown'
import SearchInput from '@/components/SearchInput'
import ProductsGrid from '@/components/ProductsGrid'
import Pagination from '@/components/Pagination'
import SortDropdown from '@/components/SortDropdown'
import { Category, Product } from '@/types/types'

export default function ProductsClient({
  categories,
  products,
}: {
  categories: Category[]
  products: Product[]
}) {
  console.log(products)

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

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory && selectedCategory !== 'All')
      params.set('category', selectedCategory)
    if (search) params.set('search', search)
    router.replace(`/products?${params.toString()}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, search])

  let filteredProducts = products.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  )

  if (sortOrder === 'asc') {
    filteredProducts = filteredProducts
      .slice()
      .sort((a, b) => a.price - b.price)
  } else if (sortOrder === 'desc') {
    filteredProducts = filteredProducts
      .slice()
      .sort((a, b) => b.price - a.price)
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
