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
        className="border-orange dark:bg-charcoal w-full rounded border bg-white px-4 py-2 pr-10 text-lg text-black focus:outline-none dark:text-white"
      />
      <FaSearch className="text-orange absolute right-3 top-3" />
    </div>
  )
}
