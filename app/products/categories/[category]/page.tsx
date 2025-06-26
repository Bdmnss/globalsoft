import ProductsClient from '../../client'
import { getCategories } from '@/app/api/products'

export default async function CategoryPage({ params }) {
  const categories = await getCategories()
  return (
    <ProductsClient
      categories={categories}
      initialCategory={params.category || 'All'}
    />
  )
}
