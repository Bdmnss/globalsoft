import { useCartStore } from '@/stores/cartStore'
import Image from 'next/image'
import React from 'react'
import { FaTrash } from 'react-icons/fa'

const Summary = () => {
  const {
    cartItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCartStore()

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-[1.3rem] font-bold text-orange">SUMMARY</h2>
      <ul className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center gap-6">
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={64}
              height={64}
              className="size-24 rounded-lg"
            />
            <div className="flex flex-col gap-3">
              <h3 className="text-[1.4rem] font-bold text-black dark:text-white">
                {item.title}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="rounded bg-gray-200 px-3 text-xl font-bold text-gray-700 hover:bg-orange hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-orange"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-xl font-medium text-black dark:text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="rounded bg-gray-200 px-3 text-xl font-bold text-gray-700 hover:bg-orange hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-orange"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 text-xl text-red-500 hover:text-orange"
                  aria-label="Remove from cart"
                >
                  <FaTrash />
                </button>
              </div>
              <p className="text-xl font-medium text-black dark:text-white">
                Price Per: ${item.price.toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mb-4 mt-10 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-black dark:text-white">
          Total Price:
        </h3>
        <p className="text-2xl font-bold text-black dark:text-white">
          ${totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default Summary
