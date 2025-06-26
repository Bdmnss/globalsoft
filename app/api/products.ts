'use server'

import axiosInstance from '@/utils/axiosInstance'

export const getCategories = async () => {
  const res = await axiosInstance.get('/categories')
  return res.data
}

export const getAllProducts = async (page = 1, limit = 9) => {
  const skip = (page - 1) * limit
  const res = await axiosInstance.get(`/?limit=${limit}&skip=${skip}`)
  return res.data
}

export const getProductsByCategory = async (
  categorySlug: string,
  page = 1,
  limit = 9,
  sortOrder: 'default' | 'asc' | 'desc' = 'default'
) => {
  const skip = (page - 1) * limit
  let url = `/category/${categorySlug}?limit=${limit}&skip=${skip}`

  if (sortOrder === 'asc' || sortOrder === 'desc') {
    url += `&sortBy=price&order=${sortOrder}`
  }

  const res = await axiosInstance.get(url)
  return res.data
}

export const searchProducts = async (
  query: string,
  page = 1,
  limit = 9,
  sortOrder: 'default' | 'asc' | 'desc' = 'default'
) => {
  const skip = (page - 1) * limit
  let url = `/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
  if (sortOrder === 'asc' || sortOrder === 'desc') {
    url += `&sortBy=price&order=${sortOrder}`
  }
  const res = await axiosInstance.get(url)
  return res.data
}

export const getProductById = async (id: string) => {
  const res = await axiosInstance.get(`/${id}`)
  return res.data
}

export const getSortedProducts = async (
  order: 'asc' | 'desc' = 'asc',
  page = 1,
  limit = 9
) => {
  const skip = (page - 1) * limit
  const res = await axiosInstance.get(
    `/?limit=${limit}&skip=${skip}&sortBy=price&order=${order}`
  )
  return res.data
}
