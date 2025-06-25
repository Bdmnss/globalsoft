'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { twMerge, twJoin } from 'tailwind-merge'

interface DropdownOption<T> {
  value: T
  label: ReactNode
  icon?: ReactNode
}

interface DropdownProps<T> {
  options: DropdownOption<T>[]
  selected: T
  setSelected: (value: T) => void
  open: boolean
  setOpen: (open: boolean) => void
  buttonClassName?: string
  optionClassName?: string
  renderSelected?: (options: DropdownOption<T>[]) => ReactNode
  label?: ReactNode
}

export default function Dropdown<T extends string | number>({
  options,
  selected,
  setSelected,
  open,
  setOpen,
  buttonClassName = '',
  optionClassName = '',
  renderSelected,
  label,
}: DropdownProps<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectedOptions = options.filter((opt) => opt.value === selected)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, setOpen])

  return (
    <div className="relative w-full lg:w-72" ref={dropdownRef}>
      {label && (
        <span className="mr-2 text-lg font-semibold text-black transition-colors duration-500 dark:text-white">
          {label}
        </span>
      )}
      <button
        className={twMerge(
          'flex w-full items-center justify-between rounded border border-orange bg-white px-4 py-2 text-lg font-semibold text-black transition-colors duration-500 dark:bg-charcoal dark:text-white',
          buttonClassName
        )}
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="flex flex-wrap items-center gap-2">
          {renderSelected
            ? renderSelected(selectedOptions)
            : selectedOptions.length > 0
              ? selectedOptions.map((opt) => (
                  <span
                    key={String(opt.value)}
                    className="flex items-center gap-1"
                  >
                    {opt.icon}
                    {opt.label}
                  </span>
                ))
              : null}
        </span>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {open && (
        <div className="absolute left-0 top-full z-10 mt-1 w-full rounded border border-orange bg-white shadow dark:bg-charcoal">
          {options.map((opt) => {
            const isSelected = selected === opt.value
            return (
              <div
                key={String(opt.value)}
                className={twJoin(
                  'flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-orange hover:text-white',
                  isSelected
                    ? 'bg-orange text-white'
                    : 'text-black dark:text-white',
                  optionClassName
                )}
                onClick={() => {
                  setSelected(opt.value)
                  setOpen(false)
                }}
              >
                {opt.icon}
                {opt.label}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
