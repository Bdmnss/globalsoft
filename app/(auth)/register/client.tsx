'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useThemeStore } from '@/stores/themeStore'
import AuthToggleButtons from '@/components/AuthToggleButtons'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/navigation'

const signUpSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function Register() {
  const { theme } = useThemeStore()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('fake_token')) {
      router.replace('/products')
    }
  }, [router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string; confirmPassword: string }>({
    resolver: zodResolver(signUpSchema),
    mode: 'onSubmit',
  })

  const onSubmit = () => {
    router.push('/login')
  }

  return (
    <div
      className={twMerge(
        'flex size-full min-h-screen justify-center transition-colors duration-500 lg:items-center',
        theme === 'dark' && 'bg-dark text-white',
        theme !== 'dark' && 'bg-white text-black'
      )}
    >
      <div className="flex size-full flex-col gap-5 rounded-lg p-8 sm:w-4/5 sm:shadow-lg md:w-3/4 lg:w-1/2 2xl:w-1/3">
        <AuthToggleButtons />
        <h2 className="flex justify-center text-4xl font-bold">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-4 block text-2xl">
              Email
            </label>
            <input
              id="email"
              type="email"
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="mb-2 block text-2xl">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className="w-full rounded border p-2 text-xl text-black focus:outline-none"
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500">
                {errors.confirmPassword.message.toString()}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded bg-orange p-3 text-2xl text-white hover:bg-orangeLight"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
