'use server'

import axiosInstance from '@/utils/axiosInstance'

export const getCategories = async () => {
  const res = await axiosInstance.get('/categories')
  return res.data
}
