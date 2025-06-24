'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import CategoryDropdown from '@/components/CategoryDropdown'
import SearchInput from '@/components/SearchInput'
import ProductsGrid from '@/components/ProductsGrid'
import Pagination from '@/components/Pagination'
import SortDropdown from '@/components/SortDropdown'

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 49.99,
    rating: 4.5,
    image: '/testImage.webp',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 39.99,
    rating: 4.0,
    image: '/testImage.webp',
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 59.99,
    rating: 5.0,
    image: '/testImage.webp',
    category: 'Books',
  },
  {
    id: 4,
    name: 'Product 4',
    price: 29.99,
    rating: 3.5,
    image: '/testImage.webp',
    category: 'Books',
  },
  {
    id: 5,
    name: 'Product 5',
    price: 19.99,
    rating: 4.2,
    image: '/testImage.webp',
    category: 'Clothing',
  },
  {
    id: 6,
    name: 'Product 6',
    price: 99.99,
    rating: 4.8,
    image: '/testImage.webp',
    category: 'Clothing',
  },
  {
    id: 7,
    name: 'Product 7',
    price: 24.99,
    rating: 3.8,
    image: '/testImage.webp',
    category: 'Electronics',
  },
  {
    id: 8,
    name: 'Product 8',
    price: 79.99,
    rating: 4.6,
    image: '/testImage.webp',
    category: 'Books',
  },
  {
    id: 9,
    name: 'Product 9',
    price: 54.99,
    rating: 4.3,
    image: '/testImage.webp',
    category: 'Clothing',
  },
]

const categories = [
  'All',
  ...Array.from(new Set(products.map((p) => p.category))),
]

export default function ProductsClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialCategory = searchParams.get('category') || 'All'
  const initialSearch = searchParams.get('search') || ''

  // შეცვლილია: მხოლოდ ერთი კატეგორია შეიძლება იყოს არჩეული
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
