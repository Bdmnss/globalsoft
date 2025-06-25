import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-light px-4 transition-colors duration-500 dark:bg-dark">
      <span className="mb-4 select-none text-6xl font-extrabold text-orange drop-shadow-lg sm:text-8xl">
        404
      </span>
      <span className="mb-2 text-center text-2xl font-bold text-gray-800 transition-colors duration-500 dark:text-white sm:text-3xl">
        Page Not Found
      </span>
      <span className="mb-8 text-center text-base text-gray-500 transition-colors duration-500 dark:text-gray-400 sm:text-lg">
        The page you are looking for does not exist.
      </span>
      <Link
        href="/"
        className="rounded bg-orange px-4 py-2 text-base font-semibold text-white shadow transition hover:bg-orangeLight sm:px-6 sm:py-3 sm:text-lg"
      >
        Go Home
      </Link>
    </div>
  )
}
