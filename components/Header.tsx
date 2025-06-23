'use client'

import { FaShoppingCart, FaUser } from 'react-icons/fa'
import Link from 'next/link'
import ThemeToggleButton from '@/components/ThemeToggleButton'

export default function Header() {
  return (
    <header className="relative flex justify-center">
      <div className="fixed z-20 flex w-[100%] items-center justify-between border-b-[1px] border-b-[gray] bg-[#101010] p-10 md:gap-[4.2rem]">
        <Link
          href="/"
          className="hover:text-orange text-3xl font-bold text-white"
        >
          GLOBALSOFT
        </Link>

        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer lg:relative">
            <FaShoppingCart
              size={20}
              className="hover:text-orange text-white"
            />
          </div>
          <ThemeToggleButton />
          <FaUser
            size={20}
            className="hover:text-orange cursor-pointer text-white"
          />
        </div>
      </div>
    </header>
  )
}
