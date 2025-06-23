'use client'

import Dropdown from './Dropdown'

interface Props {
  categories: string[]
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
  const options = categories.map((cat) => ({
    value: cat,
    label: cat,
  }))

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
