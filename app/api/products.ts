'use server'

import axiosInstance from '@/utils/axiosInstance'

export const getCategories = async () => {
  const res = await axiosInstance.get('/categories')
  return res.data
}

export const getAllProducts = async () => {
  const res = await axiosInstance.get('/')
  return res.data
}

export const getProductsByCategory = async (categorySlug: string) => {
  const res = await axiosInstance.get(`/category/${categorySlug}`)
  return res.data
}

export const searchProducts = async (query: string) => {
  const res = await axiosInstance.get(`/search?q=${encodeURIComponent(query)}`)
  return res.data
}
