import ProductsClient from './client'
import { getCategories } from '../api/products'

export default async function ProductsPage() {
  const categories = await getCategories()

  return <ProductsClient categories={categories} />
}
