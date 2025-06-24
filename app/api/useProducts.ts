import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
} from './products'

export const fetchProducts = async (category: string, search: string) => {
  if (search && search.trim() !== '') {
    const data = await searchProducts(search)
    return data.products
  } else if (category && category !== 'All') {
    const data = await getProductsByCategory(category)
    return data.products
  } else {
    const data = await getAllProducts()
    return data.products
  }
}
