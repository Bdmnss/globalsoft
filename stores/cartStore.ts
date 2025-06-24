import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types/types'

interface CartProduct extends Product {
  quantity: number
}

interface CartState {
  isCartOpen: boolean
  cartItems: CartProduct[]
  cartItemsQuantity: number
  totalPrice: number
  setCartOpen: (open: boolean) => void
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      isCartOpen: false,
      cartItems: [],
      cartItemsQuantity: 0,
      totalPrice: 0,
      setCartOpen: (open) => set({ isCartOpen: open }),
      addToCart: (product) => {
        const existing = get().cartItems.find((p) => p.id === product.id)
        let updatedCart
        if (existing) {
          updatedCart = get().cartItems.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          )
        } else {
          updatedCart = [...get().cartItems, { ...product, quantity: 1 }]
        }
        set({
          cartItems: updatedCart,
          cartItemsQuantity: updatedCart.reduce(
            (sum, p) => sum + p.quantity,
            0
          ),
          totalPrice: updatedCart.reduce(
            (sum, p) => sum + p.price * p.quantity,
            0
          ),
        })
      },
      removeFromCart: (id) => {
        const updatedCart = get().cartItems.filter((p) => p.id !== id)
        set({
          cartItems: updatedCart,
          cartItemsQuantity: updatedCart.reduce(
            (sum, p) => sum + p.quantity,
            0
          ),
          totalPrice: updatedCart.reduce(
            (sum, p) => sum + p.price * p.quantity,
            0
          ),
        })
      },
      increaseQuantity: (id) => {
        const updatedCart = get().cartItems.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity + 1 } : p
        )
        set({
          cartItems: updatedCart,
          cartItemsQuantity: updatedCart.reduce(
            (sum, p) => sum + p.quantity,
            0
          ),
          totalPrice: updatedCart.reduce(
            (sum, p) => sum + p.price * p.quantity,
            0
          ),
        })
      },
      decreaseQuantity: (id) => {
        const found = get().cartItems.find((p) => p.id === id)
        if (!found) return
        if (found.quantity === 1) {
          get().removeFromCart(id)
        } else {
          const updatedCart = get().cartItems.map((p) =>
            p.id === id ? { ...p, quantity: p.quantity - 1 } : p
          )
          set({
            cartItems: updatedCart,
            cartItemsQuantity: updatedCart.reduce(
              (sum, p) => sum + p.quantity,
              0
            ),
            totalPrice: updatedCart.reduce(
              (sum, p) => sum + p.price * p.quantity,
              0
            ),
          })
        }
      },
      clearCart: () =>
        set({ cartItems: [], cartItemsQuantity: 0, totalPrice: 0 }),
    }),
    { name: 'cart' }
  )
)
