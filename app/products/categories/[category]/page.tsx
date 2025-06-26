import ProductsClient from '../../client'
import { getCategories } from '@/app/api/products'

interface CategoryPageProps {
  params: {
    category?: string
    [key: string]: unknown
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categories = await getCategories()
  return (
    <ProductsClient
      categories={categories}
      initialCategory={params.category || 'All'}
    />
  )
}
