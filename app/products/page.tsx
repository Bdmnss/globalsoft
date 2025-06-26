import ProductsClient from './client'
import { getCategories } from '@/app/api/products'

export default async function ProductsPage() {
  const categories = await getCategories()
  return <ProductsClient categories={categories} initialCategory="All" />
}
