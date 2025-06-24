'use client'

import { FaShoppingCart, FaHeart } from 'react-icons/fa'
import Link from 'next/link'
import { useRef } from 'react'
import ThemeToggleButton from '@/components/ThemeToggleButton'
import UserDropdown from './UserDropdown'
import Cart from './Cart'
import { useCartStore } from '@/stores/cartStore'

export default function Header() {
  const setCartOpen = useCartStore((state) => state.setCartOpen)
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const cartItemsQuantity = useCartStore((state) => state.cartItemsQuantity)
  const cartWrapperRef = useRef<HTMLDivElement>(null)

  return (
    <header className="relative flex justify-center pb-28">
      <div className="fixed z-20 flex w-full items-center justify-between border-b-[1px] border-b-light bg-dark px-5 py-10 sm:px-10">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-orange sm:text-3xl"
        >
          GLOBALSOFT
        </Link>

        <div className="flex items-center gap-4" ref={cartWrapperRef}>
          <Link href="/favorites" className="relative cursor-pointer">
            <FaHeart size={20} className="text-white hover:text-orange" />
          </Link>
          <div
            className="relative cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setCartOpen(!isCartOpen)
            }}
            tabIndex={0}
            role="button"
            aria-label="Open cart"
          >
            <div className="relative" ref={cartWrapperRef}>
              <FaShoppingCart
                size={20}
                className="text-white hover:text-orange"
              />
              {cartItemsQuantity > 0 && (
                <div className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-orange text-xs font-bold text-white">
                  {cartItemsQuantity}
                </div>
              )}
            </div>
          </div>
          <ThemeToggleButton />
          <UserDropdown />
        </div>
      </div>

      <Cart cartWrapperRef={cartWrapperRef} />
    </header>
  )
}
