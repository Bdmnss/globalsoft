'use client'

import { FaSortAmountDownAlt, FaSortAmountUpAlt, FaMinus } from 'react-icons/fa'
import Dropdown from './Dropdown'

interface Props {
  sortOrder: 'default' | 'asc' | 'desc'
  setSortOrder: (order: 'default' | 'asc' | 'desc') => void
  sortOpen: boolean
  setSortOpen: (open: boolean) => void
}

type DropdownOption<T> = {
  value: T
  label: React.ReactNode
  icon?: React.ReactNode
}

const sortOptions: DropdownOption<'default' | 'asc' | 'desc'>[] = [
  {
    value: 'default',
    label: 'Default',
    icon: <FaMinus />,
  },
  {
    value: 'asc',
    label: 'Ascending',
    icon: <FaSortAmountUpAlt />,
  },
  {
    value: 'desc',
    label: 'Descending',
    icon: <FaSortAmountDownAlt />,
  },
]

export default function SortDropdown({
  sortOrder,
  setSortOrder,
  sortOpen,
  setSortOpen,
}: Props) {
  return (
    <Dropdown
      options={sortOptions}
      selected={sortOrder}
      setSelected={(value) => {
        if (Array.isArray(value)) return
        setSortOrder(value)
      }}
      open={sortOpen}
      setOpen={setSortOpen}
    />
  )
}
