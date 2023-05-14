////////////////////////////////////////////////////////////////
///////////// THIS IS ONE POSSIBILITY OF DOING IT:
///////////// WITH CONTEXT WRAPPING YOUR APP
//////////////<CookieContextProvider>
////////////////<App />
//////////////</CookieContextProvider>
////////////////////////////////////////////////////////////////

import { createContext, useContext, useEffect, useState } from 'react'
import { TRANSLATIONS } from '../data/translations'
import { getRightLanguage } from '../utils/utils'

export enum CookieType {
  // Add the cookie labels
  YOUTUBE = 'cookie-yt',
  GOOGLE_MAPS = 'cookie-gm',
  GOOGLE_ANALYTICS = 'cookie-ga',
}

export enum CookieOptions {
  LANGUAGE = 'language',
  HAS_USER_INTERACTED = 'hasAlreadyInteractedWithCookieBanner',
}

type CookieContextType = {
  cookies: Record<CookieType, boolean>
  language: keyof typeof TRANSLATIONS
  setLanguage: (value: keyof typeof TRANSLATIONS) => void
  data: typeof TRANSLATIONS.ENGLISH
  setCookie: (type: CookieType, value: boolean | string) => void
  isCookieBannerOpen: boolean
  setCookieBannerOpen: (value: boolean) => void
  hasUserInteracted: boolean
  setHasUserInteracted: (value: boolean) => void
}

let defaultCookies: any = {}
for (const type of Object.values(CookieType)) {
  const item = localStorage.getItem(type)

  defaultCookies[type] = JSON.parse(item || 'false')
}

const CookieContext = createContext<CookieContextType>({
  // default states also from local storage
  cookies: defaultCookies,
  language: 'ENGLISH',
  setLanguage: () => {},
  data: TRANSLATIONS.ENGLISH,
  setCookie: () => {},
  isCookieBannerOpen: false,
  setCookieBannerOpen: () => {},
  hasUserInteracted: false,
  setHasUserInteracted: () => {},
})

export const useCookieContext = () => useContext(CookieContext)

type ProviderProps = {
  children: React.ReactNode
}

export const CookieContextProvider = ({ children }: ProviderProps) => {
  const [isCookieBannerOpen, setCookieBannerOpen] = useState(false)
  const [cookies, setCookies] =
    useState<Record<CookieType, boolean>>(defaultCookies)

  const [language, setLanguage] = useState(
    localStorage.getItem(CookieOptions.LANGUAGE)
      ? localStorage.getItem(CookieOptions.LANGUAGE)
      : getRightLanguage()
  )

  const [hasUserInteracted, setHasUserInteracted] = useState(
    localStorage.getItem(CookieOptions.HAS_USER_INTERACTED)
      ? JSON.parse(localStorage.getItem(CookieOptions.HAS_USER_INTERACTED)!)
      : false
  )

  useEffect(() => {
    Object.entries(cookies).forEach(([type, value]) => {
      localStorage.setItem(type, JSON.stringify(value))
    })
    if (language) localStorage.setItem(CookieOptions.LANGUAGE, language)
    if (hasUserInteracted) {
      localStorage.setItem(
        CookieOptions.HAS_USER_INTERACTED,
        JSON.stringify(hasUserInteracted)
      )
    } else {
      localStorage.removeItem(CookieOptions.HAS_USER_INTERACTED)
    }
  }, [cookies, language, hasUserInteracted])

  const data = TRANSLATIONS[language as keyof typeof TRANSLATIONS]

  const setCookie = (type: CookieType, value: boolean | string) => {
    setCookies((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const value = {
    cookies,
    language,
    setLanguage,
    data,
    setCookie,
    isCookieBannerOpen,
    setCookieBannerOpen,
    hasUserInteracted,
    setHasUserInteracted,
    // Add other cookie states and related setter functions here
  }

  return (
    // @ts-expect-error
    <CookieContext.Provider value={value}>{children}</CookieContext.Provider>
  )
}
