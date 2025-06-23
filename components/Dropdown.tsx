'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { FaChevronDown, FaChevronUp, FaCheck } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'
import { twJoin } from 'tailwind-merge'

interface DropdownOption<T> {
  value: T
  label: ReactNode
  icon?: ReactNode
}

interface DropdownProps<T> {
  options: DropdownOption<T>[]
  selected: T | T[]
  setSelected: (value: T | T[]) => void
  open: boolean
  setOpen: (open: boolean) => void
  buttonClassName?: string
  optionClassName?: string
  renderSelected?: (options: DropdownOption<T>[]) => ReactNode
  label?: ReactNode
  multi?: boolean
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
  multi = false,
}: DropdownProps<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectedOptions = Array.isArray(selected)
    ? options.filter((opt) => selected.includes(opt.value))
    : options.filter((opt) => opt.value === selected)

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
        className={twMerge(
          'flex w-full items-center justify-between rounded border border-orange bg-white px-4 py-2 text-lg font-semibold text-black dark:bg-charcoal dark:text-white',
          buttonClassName
        )}
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="flex flex-wrap items-center gap-2">
          {renderSelected ? (
            renderSelected(selectedOptions)
          ) : multi && selectedOptions.length > 2 ? (
            <span className="text-gray-700 dark:text-gray-200">Multiple</span>
          ) : selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <span key={String(opt.value)} className="flex items-center gap-1">
                {opt.icon}
                {opt.label}
              </span>
            ))
          ) : null}
        </span>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {open && (
        <div className="absolute left-0 top-full z-10 mt-1 w-full rounded border border-orange bg-white shadow dark:bg-charcoal">
          {options.map((opt) => {
            const isSelected = Array.isArray(selected)
              ? selected.includes(opt.value)
              : selected === opt.value
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
                  if (multi) {
                    if (opt.value === 'All') {
                      setSelected(['All' as T])
                    } else {
                      if (Array.isArray(selected)) {
                        let newSelected = selected.filter(
                          (v) => v !== ('All' as T)
                        )
                        if (isSelected) {
                          newSelected = newSelected.filter(
                            (v) => v !== opt.value
                          )
                        } else {
                          newSelected = [...newSelected, opt.value]
                        }
                        setSelected(newSelected)
                      } else {
                        setSelected([opt.value])
                      }
                    }
                  } else {
                    setSelected(opt.value)
                    setOpen(false)
                  }
                }}
              >
                {multi && (
                  <span className="mr-2">
                    {isSelected ? (
                      <FaCheck />
                    ) : (
                      <span className="inline-block w-3" />
                    )}
                  </span>
                )}
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
