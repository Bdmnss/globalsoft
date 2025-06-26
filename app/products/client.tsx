'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/app/api/useProducts'
import CategoryDropdown from '@/components/CategoryDropdown'
import SearchInput from '@/components/SearchInput'
import ProductsGrid from '@/components/ProductsGrid'
import Pagination from '@/components/Pagination'
import SortDropdown from '@/components/SortDropdown'
import Spinner from '@/components/Spinner'
import { useDebounce } from '@/hooks/useDebounce'
import { Category } from '@/types/types'

export default function ProductsClient({
  categories,
  initialCategory = 'All',
}: {
  categories: Category[]
  initialCategory?: string
}) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400)
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>(
    'default'
  )
  const [sortOpen, setSortOpen] = useState(false)
  const [page, setPage] = useState(1)
  const limit = 9

  const { data, isPending, isError } = useQuery({
    queryKey: ['products', selectedCategory, debouncedSearch, page, sortOrder],
    queryFn: () =>
      fetchProducts(selectedCategory, debouncedSearch, page, limit, sortOrder),
  })

  const products = data?.products || []
  const total = data?.total || 0
  const pageCount = Math.ceil(total / limit)

  useEffect(() => {
    let url = '/products'
    const params = new URLSearchParams()
    if (selectedCategory && selectedCategory !== 'All') {
      url = `/products/categories/${selectedCategory}`
    }
    if (debouncedSearch) params.set('search', debouncedSearch)
    if (sortOrder !== 'default') params.set('sort', sortOrder)
    if (params.toString()) url += `?${params.toString()}`
    router.replace(url, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, debouncedSearch, sortOrder])

  useEffect(() => {
    setPage(1)
  }, [selectedCategory, debouncedSearch, sortOrder])

  useEffect(() => {
    if (debouncedSearch) {
      if (selectedCategory !== 'All') setSelectedCategory('All')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  if (isError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-light transition-colors duration-500 dark:bg-dark">
        <span className="mb-4 text-7xl font-bold text-red-500">404</span>
        <span className="mb-2 text-2xl font-semibold text-red-500">
          Failed to load products.
        </span>
        <span className="text-base text-gray-500 transition-colors duration-500 dark:text-gray-400">
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
      {isPending ? (
        <Spinner fullScreen text="Loading products..." />
      ) : (
        <div className="w-full max-w-7xl">
          <ProductsGrid products={products} />
          <Pagination page={page} pageCount={pageCount} setPage={setPage} />
        </div>
      )}
    </div>
  )
}
