import ProductsClient from '../../client'
import { getCategories } from '@/app/api/products'
import type { PageProps } from '@/.next/types/app/products/categories/[category]/page'

export default async function CategoryPage(props: PageProps) {
  const params = await props.params
  const categories = await getCategories()
  return (
    <ProductsClient
      categories={categories}
      initialCategory={params?.category || 'All'}
    />
  )
}
