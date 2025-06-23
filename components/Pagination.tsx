'use client'

export default function Pagination() {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button className="hover:bg-orange dark:bg-charcoal dark:hover:bg-orange rounded bg-white px-3 py-2 text-black shadow hover:text-white dark:text-white">
        &lt;
      </button>
      <button className="bg-orange rounded px-3 py-2 text-white shadow">
        1
      </button>
      <button className="hover:bg-orange dark:bg-charcoal dark:hover:bg-orange rounded bg-white px-3 py-2 text-black shadow hover:text-white dark:text-white">
        2
      </button>
      <button className="hover:bg-orange dark:bg-charcoal dark:hover:bg-orange rounded bg-white px-3 py-2 text-black shadow hover:text-white dark:text-white">
        3
      </button>
      <span className="px-2 text-gray-400">...</span>
      <button className="hover:bg-orange dark:bg-charcoal dark:hover:bg-orange rounded bg-white px-3 py-2 text-black shadow hover:text-white dark:text-white">
        10
      </button>
      <button className="hover:bg-orange dark:bg-charcoal dark:hover:bg-orange rounded bg-white px-3 py-2 text-black shadow hover:text-white dark:text-white">
        &gt;
      </button>
    </div>
  )
}
