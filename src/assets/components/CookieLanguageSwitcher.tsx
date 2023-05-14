// LanguageSwitcher.js
import React from 'react'
import { useCookieContext } from '../context/CookieContext'

export const LanguageSwitcher = () => {
  const { setLanguage, language } = useCookieContext()
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value as any)
  }

  return (
    <div className="language-switcher absolute left-6 top-4">
      <select
        className="language-switcher__select text-2xl"
        onChange={handleLanguageChange}
        value={language}
      >
        <option value="ENGLISH">🇺🇸</option>
        <option value="SPANISH">🇪🇸</option>
        <option value="GERMAN">🇩🇪</option>
      </select>
    </div>
  )
}
