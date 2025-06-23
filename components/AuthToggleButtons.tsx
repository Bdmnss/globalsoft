'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { twJoin } from 'tailwind-merge'

export default function AuthToggleButtons() {
  const pathname = usePathname()

  const isLoginPath = pathname === '/login'
  const isRegisterPath = pathname === '/register'

  return (
    <div className="flex">
      <Link
        href="/login"
        className={twMerge(
          twJoin(
            'w-1/2 rounded-l p-3 text-2xl',
            isLoginPath ? 'bg-orange text-white' : 'bg-gray-200 text-black'
          )
        )}
      >
        Login
      </Link>
      <Link
        href="/register"
        className={twMerge(
          twJoin(
            'w-1/2 rounded-r p-3 text-2xl',
            isRegisterPath ? 'bg-orange text-white' : 'bg-gray-200 text-black'
          )
        )}
      >
        Register
      </Link>
    </div>
  )
}
