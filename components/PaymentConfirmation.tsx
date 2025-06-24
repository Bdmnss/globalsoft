import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'next/navigation'

const PaymentConfirmation: React.FC = () => {
  const { cartItems, totalPrice, clearCart, setIsPaid } = useCartStore()
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsPaid(false)
        clearCart()
        router.push('/')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsPaid, clearCart, router])

  return (
    <div className="fixed top-0 z-10 h-full w-full bg-white/50 dark:bg-black/50">
      <div
        ref={modalRef}
        className="fixed left-1/2 top-48 z-10 h-[73vh] w-11/12 -translate-x-1/2 transform overflow-y-auto rounded-xl bg-white p-6 dark:bg-[#101010] md:h-[61vh] md:w-3/4 lg:w-2/5"
      >
        <svg
          width="64"
          height="64"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-10"
        >
          <g fill="none">
            <circle fill="#D87D4A" cx="32" cy="32" r="32" />
            <path stroke="#FFF" d="m20.754 33.333 6.751 6.751 15.804-15.803" />
          </g>
        </svg>
        <h2 className="mb-6 text-3xl font-bold leading-10 text-black dark:text-white md:text-5xl md:leading-[3.6rem]">
          THANK YOU FOR YOUR ORDER
        </h2>
        <div className="flex flex-col overflow-hidden rounded-xl bg-light md:flex-row md:justify-between">
          <div className="p-4 md:w-3/5">
            {cartItems.map(
              (product, index) =>
                index === 0 && (
                  <div key={product.id} className="mb-5 flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <Image
                          src={product.thumbnail}
                          alt="product image"
                          width={50}
                          height={50}
                          className="size-16"
                        />
                        <div className="flex flex-col items-center">
                          <p className="text-xl font-bold text-black">
                            {product.title}
                          </p>
                          <p className="self-start text-[1.4rem] font-bold text-[gray]">
                            $ {product.price}
                          </p>
                        </div>
                      </div>
                      <p className="text-[1.5rem] font-bold text-[gray]">
                        x{product.quantity}
                      </p>
                    </div>
                  </div>
                )
            )}
            {cartItems.length > 1 && (
              <div className="flex items-center justify-center border-t-[1px] border-t-[gray] pt-5 text-[1.2rem] font-bold text-[gray]">
                and {cartItems.length - 1} other item(s)
              </div>
            )}
          </div>

          <div className="bg-black p-8 md:flex md:w-2/5 md:flex-col md:justify-center">
            <p className="text-[1.5rem] font-medium text-[gray]">GRAND TOTAL</p>
            <p className="text-[1.8rem] font-bold text-white">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
        <Link href="/">
          <button
            onClick={() => {
              setIsPaid(false)
              clearCart()
            }}
            className="mt-10 w-full bg-orange p-6 text-xl font-bold text-white"
          >
            BACK TO HOME
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PaymentConfirmation
