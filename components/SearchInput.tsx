'use client'

import { FaSearch } from 'react-icons/fa'

interface Props {
  search: string
  setSearch: (val: string) => void
}

export default function SearchInput({ search, setSearch }: Props) {
  return (
    <div className="relative w-full lg:w-72">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded border border-orange bg-white px-4 py-2 pr-10 text-lg text-black transition-colors duration-500 focus:outline-none dark:bg-charcoal dark:text-white"
      />
      <FaSearch className="absolute right-3 top-3 text-orange" />
    </div>
  )
}
