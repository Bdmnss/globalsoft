import Spinner from '@/components/Spinner'

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-light transition-colors duration-500 dark:bg-dark">
      <span className="mb-28 text-4xl font-extrabold tracking-widest text-orange drop-shadow-lg sm:text-5xl">
        GLOBALSOFT
      </span>
      <Spinner text="Loading site..." />
    </div>
  )
}
