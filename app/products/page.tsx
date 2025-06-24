import ProductsClient from './client'
import { getAllProducts, getCategories } from '../api/products'

export default async function ProductsPage() {
  const categories = await getCategories()
  const productsRes = await getAllProducts()
  const products = productsRes.products

  return <ProductsClient categories={categories} products={products} />
}
