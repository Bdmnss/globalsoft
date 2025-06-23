'use client'

import { useState, useEffect, useRef } from 'react'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'

export default function UserDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { hasToken, setHasToken } = useAuthStore()

  useEffect(() => {
    setHasToken(!!localStorage.getItem('fake_token'))
    const onStorage = () => setHasToken(!!localStorage.getItem('fake_token'))
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [setHasToken])

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <FaUser
        size={20}
        className="hover:text-orange cursor-pointer text-white"
        onClick={() => {
          if (!hasToken) {
            router.push('/login')
          } else {
            setIsDropdownOpen((prev) => !prev)
          }
        }}
      />
      {isDropdownOpen && hasToken && (
        <div className="bg-dark absolute right-0 top-10 w-48 rounded text-white shadow-lg">
          <button
            onClick={() => {
              localStorage.removeItem('fake_token')
              setHasToken(false)
              setIsDropdownOpen(false)
              router.push('/login')
            }}
            className="hover:bg-orange flex w-full items-center p-2 text-xl"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
