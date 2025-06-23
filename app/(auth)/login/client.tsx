'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useThemeStore } from '@/stores/themeStore'
import AuthToggleButtons from '@/components/AuthToggleButtons'
import { useRouter } from 'next/navigation'
import { twMerge, twJoin } from 'tailwind-merge'
import { useAuthStore } from '@/stores/authStore'

const logInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export default function Login() {
  const { theme } = useThemeStore()
  const router = useRouter()
  const { setHasToken } = useAuthStore()

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('fake_token')) {
      router.replace('/products')
    }
  }, [router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    resolver: zodResolver(logInSchema),
    mode: 'onSubmit',
  })

  const onSubmit = () => {
    localStorage.setItem('fake_token', '123456')
    setHasToken(true)
    router.push('/products')
  }

  return (
    <div
      className={twMerge(
        twJoin(
          'flex size-full min-h-screen items-center justify-center pt-20',
          theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-black'
        )
      )}
    >
      <div className="flex size-full flex-col gap-5 rounded-lg p-8 sm:w-4/5 sm:shadow-lg md:w-3/4 lg:w-1/2 2xl:w-1/3">
        <AuthToggleButtons />
        <h2 className="flex justify-center text-4xl font-bold">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-4 block text-2xl">
              Email
            </label>
            <input
              id="email"
              type="text"
              {...register('email')}
              className="w-full rounded border p-2 text-xl text-black focus:outline-none"
            />
            {errors.email?.message && (
              <p className="text-red-500">{errors.email.message.toString()}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="mb-2 block text-2xl">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full rounded border p-2 text-xl text-black focus:outline-none"
            />
            {errors.password?.message && (
              <p className="text-red-500">
                {errors.password.message.toString()}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-orange hover:bg-orangeLight mt-4 w-full rounded p-3 text-2xl text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
