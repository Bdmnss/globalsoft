'use client'

import { FaShoppingCart, FaHeart } from 'react-icons/fa'
import Link from 'next/link'
import ThemeToggleButton from '@/components/ThemeToggleButton'
import UserDropdown from './UserDropdown'

export default function Header() {
  return (
    <header className="relative flex justify-center pb-28">
      <div className="fixed z-20 flex w-full items-center justify-between border-b-[1px] border-b-light bg-dark px-5 py-10 sm:px-10">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-orange sm:text-3xl"
        >
          GLOBALSOFT
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/favorites" className="relative cursor-pointer">
            <FaHeart size={20} className="text-white hover:text-orange" />
          </Link>
          <div className="relative cursor-pointer">
            <FaShoppingCart
              size={20}
              className="text-white hover:text-orange"
            />
          </div>
          <ThemeToggleButton />
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}
