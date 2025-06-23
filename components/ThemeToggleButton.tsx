import { useEffect } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useThemeStore } from '@/stores/themeStore'

export default function ThemeToggleButton() {
  const { theme, setTheme, toggleTheme } = useThemeStore()

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    const savedTheme = localStorage.getItem('theme') || systemTheme
    setTheme(savedTheme)
  }, [setTheme])

  return (
    <button onClick={toggleTheme} className="p-2 text-white">
      {theme === 'dark' ? (
        <FaSun size={20} className="hover:text-orange text-white" />
      ) : (
        <FaMoon size={20} className="hover:text-orange text-white" />
      )}
    </button>
  )
}
