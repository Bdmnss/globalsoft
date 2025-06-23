'use client'

import Dropdown from './Dropdown'

interface Props {
  categories: string[]
  selectedCategories: string[]
  setSelectedCategories: (cats: string[]) => void
  categoryOpen: boolean
  setCategoryOpen: (open: boolean) => void
}

export default function CategoryDropdown({
  categories,
  selectedCategories,
  setSelectedCategories,
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
      selected={selectedCategories}
      setSelected={(value) =>
        setSelectedCategories(Array.isArray(value) ? value : [value])
      }
      open={categoryOpen}
      setOpen={setCategoryOpen}
      multi
    />
  )
}
