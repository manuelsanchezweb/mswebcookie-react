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

export enum CookieLabels {
  YOUTUBE = 'cookie-yt',
  GOOGLE_MAPS = 'cookie-gm',
  GOOGLE_ANALYTICS = 'cookie-ga',
  FUNCTION = 'cookie-fn',
}

export enum CookieType {
  // Add the cookie labels
  YOUTUBE = 'cookie-yt',
  GOOGLE_MAPS = 'cookie-gm',
  GOOGLE_ANALYTICS = 'cookie-ga',
  HAS_USER_INTERACTED = 'hasAlreadyInteractedWithCookieBanner',
  LANGUAGE = 'language',
}

type CookieContextType = {
  cookies: Record<CookieType, boolean | string>
  language: keyof typeof TRANSLATIONS
  data: typeof TRANSLATIONS.ENGLISH
  setCookie: (type: CookieType, value: boolean | string) => void
  isCookieBannerOpen: boolean
  setCookieBannerOpen: (value: boolean) => void
}

let defaultCookies: any = {}
for (const type of Object.values(CookieType)) {
  const item = localStorage.getItem(type)
  if (type === CookieType.LANGUAGE) {
    defaultCookies[type] = item || 'ENGLISH'
  } else {
    defaultCookies[type] = JSON.parse(item || 'false')
  }
}

const CookieContext = createContext<CookieContextType>({
  // default states also from local storage
  cookies: defaultCookies,
  language: 'ENGLISH',
  data: TRANSLATIONS.ENGLISH,
  setCookie: () => {},
  isCookieBannerOpen: false,
  setCookieBannerOpen: () => {},
})

export const useCookieContext = () => useContext(CookieContext)

type ProviderProps = {
  children: React.ReactNode
}

export const CookieContextProvider = ({ children }: ProviderProps) => {
  const [isCookieBannerOpen, setCookieBannerOpen] = useState(false)
  const [cookies, setCookies] =
    useState<Record<CookieType, boolean | string>>(defaultCookies)

  const [language, setLanguage] = useState(
    localStorage.getItem(CookieType.LANGUAGE)
      ? localStorage.getItem(CookieType.LANGUAGE)
      : getRightLanguage()
  )

  useEffect(() => {
    Object.entries(cookies).forEach(([type, value]) => {
      localStorage.setItem(type, JSON.stringify(value))
    })
    if (language) localStorage.setItem(CookieType.LANGUAGE, language)
  }, [cookies, language])

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
    data,
    setCookie,
    isCookieBannerOpen,
    setCookieBannerOpen,
    // Add other cookie states and related setter functions here
  }

  return (
    // @ts-expect-error
    <CookieContext.Provider value={value}>{children}</CookieContext.Provider>
  )
}
