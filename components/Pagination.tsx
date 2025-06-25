'use client'

import { twMerge, twJoin } from 'tailwind-merge'

interface PaginationProps {
  page: number
  pageCount: number
  setPage: (page: number) => void
}

export default function Pagination({
  page,
  pageCount,
  setPage,
}: PaginationProps) {
  if (pageCount <= 1) return null

  const visibleCount = 5
  let start = Math.max(1, page - Math.floor(visibleCount / 2))
  let end = start + visibleCount - 1

  if (end > pageCount) {
    end = pageCount
    start = Math.max(1, end - visibleCount + 1)
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => {
          setPage(page - 1)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        disabled={page === 1}
        className={twMerge(
          twJoin(
            'rounded bg-white px-2 py-1 text-base text-black shadow transition-colors duration-500 hover:bg-orange hover:text-white disabled:opacity-50',
            'dark:bg-charcoal dark:text-white dark:hover:bg-orange sm:px-3 sm:py-2 sm:text-base'
          )
        )}
      >
        &lt;
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => {
            setPage(p)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className={twMerge(
            twJoin(
              'rounded px-2 py-1 text-base shadow sm:px-3 sm:py-2',
              page === p
                ? 'bg-orange text-white'
                : 'bg-white text-black transition-colors duration-500 hover:bg-orange hover:text-white dark:bg-charcoal dark:text-white dark:hover:bg-orange'
            )
          )}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => {
          setPage(page + 1)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        disabled={page === pageCount}
        className={twMerge(
          twJoin(
            'rounded bg-white px-2 py-1 text-base text-black shadow transition-colors duration-500 hover:bg-orange hover:text-white disabled:opacity-50',
            'dark:bg-charcoal dark:text-white dark:hover:bg-orange sm:px-3 sm:py-2 sm:text-base'
          )
        )}
      >
        &gt;
      </button>
    </div>
  )
}
