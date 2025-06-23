'use client'

import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import ThemeToggleButton from '@/components/ThemeToggleButton'
import UserDropdown from './UserDropdown'

export default function Header() {
  return (
    <header className="relative flex justify-center">
      <div className="bg-dark border-b-light fixed z-20 flex w-full items-center justify-between border-b-[1px] p-10">
        <Link
          href="/"
          className="hover:text-orange text-3xl font-bold text-white"
        >
          GLOBALSOFT
        </Link>

        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <FaShoppingCart
              size={20}
              className="hover:text-orange text-white"
            />
          </div>
          <ThemeToggleButton />
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}
