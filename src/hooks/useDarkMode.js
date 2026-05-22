import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('fincalc-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    localStorage.setItem('fincalc-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleDark = () => setIsDark(prev => !prev)

  return { isDark, toggleDark }
}
