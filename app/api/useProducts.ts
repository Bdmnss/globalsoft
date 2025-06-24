import { getAllProducts, getProductsByCategory } from './products'

export const fetchProducts = async (category: string) => {
  if (category && category !== 'All') {
    const data = await getProductsByCategory(category)
    return data.products
  } else {
    const data = await getAllProducts()
    return data.products
  }
}
