'use client'

import { twMerge, twJoin } from 'tailwind-merge'

interface SpinnerProps {
  text?: string
  fullScreen?: boolean
}

export default function Spinner({
  text = 'Loading...',
  fullScreen,
}: SpinnerProps) {
  return (
    <div
      className={twMerge(
        twJoin(
          'flex items-center justify-center bg-light transition-colors duration-500 dark:bg-dark',
          fullScreen && 'h-screen'
        )
      )}
    >
      <span className="flex flex-col items-center gap-6">
        <span className="inline-block h-20 w-20 animate-spin rounded-full border-8 border-orange border-t-transparent" />
        <span className="text-2xl font-bold text-orange">{text}</span>
      </span>
    </div>
  )
}
