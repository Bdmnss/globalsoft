import ProductsClient from './client'
import {
  getAllProducts,
  getCategories,
  getProductsByCategory,
} from '../api/products'

interface ProductsPageProps {
  searchParams: {
    category?: string
    search?: string
    [key: string]: string | undefined
  }
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { category } = searchParams

  const categories = await getCategories()
  let productsRes

  if (category && category !== 'All') {
    productsRes = await getProductsByCategory(category)
  } else {
    productsRes = await getAllProducts()
  }
  const products = productsRes.products

  return <ProductsClient categories={categories} products={products} />
}
