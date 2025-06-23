'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

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
  renderSelected?: (option: DropdownOption<T>) => ReactNode
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
  const current = options.find((opt) => opt.value === selected)

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
        <span className="mr-2 text-lg font-semibold text-black dark:text-white">
          {label}
        </span>
      )}
      <button
        className={`border-orange dark:bg-charcoal flex w-full items-center justify-between rounded border bg-white px-4 py-2 text-lg font-semibold text-black dark:text-white ${buttonClassName}`}
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="flex items-center gap-2">
          {renderSelected ? (
            renderSelected(current!)
          ) : (
            <>
              {current?.icon}
              {current?.label}
            </>
          )}
        </span>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {open && (
        <div className="border-orange dark:bg-charcoal absolute left-0 top-full z-10 mt-1 w-full rounded border bg-white shadow">
          {options.map((opt) => (
            <div
              key={String(opt.value)}
              className={`hover:bg-orange flex cursor-pointer items-center gap-2 px-4 py-2 hover:text-white ${
                selected === opt.value
                  ? 'bg-orange text-white'
                  : 'text-black dark:text-white'
              } ${optionClassName}`}
              onClick={() => {
                setSelected(opt.value)
                setOpen(false)
              }}
            >
              {opt.icon}
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
