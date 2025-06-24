import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
} from './products'
import { useQuery } from '@tanstack/react-query'
import { getProductById } from '@/app/api/products'

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

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
