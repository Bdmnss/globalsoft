'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PaymentConfirmation from '@/components/PaymentConfirmation'
import Summary from '@/components/Summary'
import { useCartStore } from '@/stores/cartStore'

export default function Checkout() {
  const { isPaid, setIsPaid, cartItems } = useCartStore()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('fake_token')) {
      router.replace('/login')
    }
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center bg-light pt-10 transition-colors duration-500 dark:bg-dark">
      <div className="container p-10 transition-colors duration-500 md:bg-white md:dark:bg-black">
        <h1 className="mb-12 text-4xl font-bold text-black transition-colors duration-500 dark:text-white md:text-5xl">
          Checkout
        </h1>

        {cartItems.length === 0 ? (
          <p className="mb-10 flex items-center justify-center text-2xl font-bold text-gray-500">
            Your cart is empty. Please add items to your cart before checking
            out.
          </p>
        ) : (
          <Summary />
        )}

        <button
          type="submit"
          className="w-full bg-orange p-6 text-2xl font-bold text-white disabled:opacity-50"
          onClick={() => setIsPaid(true)}
          disabled={cartItems.length === 0}
        >
          PRESS TO CONFIRM
        </button>
      </div>

      {isPaid && <PaymentConfirmation />}
    </div>
  )
}
