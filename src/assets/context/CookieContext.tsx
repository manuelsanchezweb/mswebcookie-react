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
  YOUTUBE = 'cookie-yt',
  GOOGLE_MAPS = 'cookie-gm',
  GOOGLE_ANALYTICS = 'cookie-ga',
}

export const HAS__USER_INTERACTED = 'hasAlreadyInteractedWithCookieBanner'

type CookieContextType = {
  isCookieBannerOpen: boolean
  isYoutubeAccepted: boolean
  isGoogleMapsAccepted: boolean
  isGoogleAnalyticsAccepted: boolean
  hasAlreadyInteractedWithCookieBanner: boolean
  language: keyof typeof TRANSLATIONS
  data: typeof TRANSLATIONS.ENGLISH
  setYoutube: (value: boolean) => void
  setGoogleMaps: (value: boolean) => void
  setGoogleAnalytics: (value: boolean) => void
  setLanguage: (value: string) => void
  setCookieBannerOpen: (value: boolean) => void
  setHasAlreadyInteractedWithCookieBanner: (value: boolean) => void
  // Add other cookie states here
}

const CookieContext = createContext<CookieContextType>({
  // default states also from local storage
  isCookieBannerOpen: false,
  isYoutubeAccepted: Boolean(localStorage.getItem(CookieType.YOUTUBE)),
  isGoogleMapsAccepted: Boolean(localStorage.getItem(CookieType.GOOGLE_MAPS)),
  isGoogleAnalyticsAccepted: Boolean(
    localStorage.getItem(CookieType.GOOGLE_ANALYTICS)
  ),
  language: 'ENGLISH',
  data: TRANSLATIONS.ENGLISH,
  hasAlreadyInteractedWithCookieBanner: Boolean(
    localStorage.getItem(HAS__USER_INTERACTED)
  ),
  // Add other cookie states here
  setYoutube: () => {},
  setGoogleMaps: () => {},
  setGoogleAnalytics: () => {},
  setLanguage: () => {},
  setCookieBannerOpen: () => {},
  setHasAlreadyInteractedWithCookieBanner: () => {},
})

export const useCookieContext = () => useContext(CookieContext)

type ProviderProps = {
  children: React.ReactNode
}

export const CookieContextProvider = ({ children }: ProviderProps) => {
  const [isCookieBannerOpen, setCookieBannerOpen] = useState(false)
  const [
    hasAlreadyInteractedWithCookieBanner,
    setHasAlreadyInteractedWithCookieBanner,
  ] = useState(
    JSON.parse(localStorage.getItem(HAS__USER_INTERACTED) || 'false')
  )

  const [isYoutubeAccepted, setYoutube] = useState(
    JSON.parse(localStorage.getItem(CookieType.YOUTUBE) || 'false')
  )
  const [isGoogleMapsAccepted, setGoogleMaps] = useState(
    JSON.parse(localStorage.getItem(CookieType.GOOGLE_MAPS) || 'false')
  )
  const [isGoogleAnalyticsAccepted, setGoogleAnalytics] = useState(
    JSON.parse(localStorage.getItem(CookieType.GOOGLE_ANALYTICS) || 'false')
  )
  const [language, setLanguage] = useState(
    localStorage.getItem('language')
      ? localStorage.getItem('language')
      : getRightLanguage()
  )

  useEffect(() => {
    if (CookieType.YOUTUBE)
      localStorage.setItem(
        CookieType.YOUTUBE,
        JSON.stringify(isYoutubeAccepted)
      )
    if (CookieType.GOOGLE_MAPS)
      localStorage.setItem(
        CookieType.GOOGLE_MAPS,
        JSON.stringify(isGoogleMapsAccepted)
      )
    if (CookieType.GOOGLE_ANALYTICS)
      localStorage.setItem(
        CookieType.GOOGLE_ANALYTICS,
        JSON.stringify(isGoogleAnalyticsAccepted)
      )

    if (HAS__USER_INTERACTED)
      localStorage.setItem(
        HAS__USER_INTERACTED,
        JSON.stringify(hasAlreadyInteractedWithCookieBanner)
      )

    if (language) localStorage.setItem('language', language)
  }, [
    isYoutubeAccepted,
    isGoogleMapsAccepted,
    isGoogleAnalyticsAccepted,
    language,
    hasAlreadyInteractedWithCookieBanner,
  ])

  const data = TRANSLATIONS[language as keyof typeof TRANSLATIONS]

  const value = {
    isYoutubeAccepted,
    setYoutube,
    isGoogleMapsAccepted,
    setGoogleMaps,
    isGoogleAnalyticsAccepted,
    setGoogleAnalytics,
    language,
    setLanguage,
    data,
    isCookieBannerOpen,
    setCookieBannerOpen,
    hasAlreadyInteractedWithCookieBanner,
    setHasAlreadyInteractedWithCookieBanner,
    // Add other cookie states and related setter functions here
  }

  return (
    // @ts-expect-error
    <CookieContext.Provider value={value}>{children}</CookieContext.Provider>
  )
}
