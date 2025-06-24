import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
} from './products'

export const fetchProducts = async (
  category: string,
  search: string,
  page = 1,
  limit = 9
) => {
  if (search && search.trim() !== '') {
    const data = await searchProducts(search, page, limit)
    return data
  } else if (category && category !== 'All') {
    const data = await getProductsByCategory(category, page, limit)
    return data
  } else {
    const data = await getAllProducts(page, limit)
    return data
  }
}
