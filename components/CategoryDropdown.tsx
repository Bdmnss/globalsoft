'use client'

import { Category } from '@/types/types'
import Dropdown from './Dropdown'

interface Props {
  categories: Category[]
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  categoryOpen: boolean
  setCategoryOpen: (open: boolean) => void
}

export default function CategoryDropdown({
  categories,
  selectedCategory,
  setSelectedCategory,
  categoryOpen,
  setCategoryOpen,
}: Props) {
  const options = [
    { value: 'All', label: 'All' },
    ...categories.map((cat) => ({
      value: cat.slug,
      label: cat.name,
    })),
  ]

  return (
    <Dropdown
      options={options}
      selected={selectedCategory}
      setSelected={setSelectedCategory}
      open={categoryOpen}
      setOpen={setCategoryOpen}
    />
  )
}
