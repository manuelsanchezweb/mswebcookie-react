////////////////////////////////////////////////////////////////
///////////// THIS IS ONE POSSIBILITY OF DOING IT:
///////////// WITH CONTEXT WRAPPING YOUR APP
//////////////<CookieContextProvider>
////////////////<App />
//////////////</CookieContextProvider>
////////////////////////////////////////////////////////////////

import { createContext, useContext, useEffect, useState } from "react";

enum CookieType {
  YOUTUBE = "cookie-yt",
  GOOGLE_MAPS = "cookie-gm",
  GOOGLE_ANALYTICS = "cookie-ga",
}

// TODO: Get the translation information depending on the language

export const TRANSLATIONS = {
  ENGLISH: {
    cookieBanner: {
      title: "Cookie settings",
      description:
        "We use cookies to improve your experience on our website. These cookies provide a better performance, enhance features and enable certain functionality. Some cookies are placed by third party services that appear on our pages. You can change or withdraw your consent at any time.",
      accept: "Accept cookies",
      cancel: "Decline cookies",
      details: "Cookie details",
      save: "Save settings",
    },
  },
  GERMAN: {
    cookieBanner: {
      title: "Cookie-Einstellungen",
      description:
        "Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Diese Cookies bieten eine bessere Leistung, verbessern Funktionen und ermöglichen bestimmte Funktionalität. Einige Cookies werden von Drittanbietern gesetzt, die auf unseren Seiten erscheinen. Sie können Ihre Einwilligung jederzeit ändern oder widerrufen.",
      accept: "Cookies akzeptieren",
      cancel: "Cookies ablehnen",
      details: "Cookie-Details",
      save: "Einstellungen speichern",
    },
  },
  SPANISH: {
    cookieBanner: {
      title: "Configuración de cookies",
      description:
        "Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Estas cookies proporcionan un mejor rendimiento, mejoran las funciones y habilitan ciertas funcionalidades. Algunas cookies son colocadas por servicios de terceros que aparecen en nuestras páginas. Puede cambiar o retirar su consentimiento en cualquier momento.",
      accept: "Aceptar cookies",
      cancel: "Rechazar cookies",
      details: "Detalles de cookies",
      save: "Guardar configuración",
    },
  },
};

type CookieContextType = {
  isYoutubeAccepted: boolean;
  isGoogleMapsAccepted: boolean;
  isGoogleAnalyticsAccepted: boolean;
  language: keyof typeof TRANSLATIONS;
  data: typeof TRANSLATIONS.ENGLISH;
  setYoutube: (value: boolean) => void;
  setGoogleMaps: (value: boolean) => void;
  setGoogleAnalytics: (value: boolean) => void;
  setLanguage: (value: string) => void;
  // Add other cookie states here
};

const CookieContext = createContext<CookieContextType>({
  // default states also from local storage
  isYoutubeAccepted: localStorage.getItem(CookieType.YOUTUBE) === "true",
  isGoogleMapsAccepted: localStorage.getItem(CookieType.GOOGLE_MAPS) === "true",
  isGoogleAnalyticsAccepted:
    localStorage.getItem(CookieType.GOOGLE_ANALYTICS) === "true",
  language: "ENGLISH",
  data: TRANSLATIONS.ENGLISH,
  // Add other cookie states here
  setYoutube: () => {},
  setGoogleMaps: () => {},
  setGoogleAnalytics: () => {},
  setLanguage: () => {},
});

export const useCookieContext = () => useContext(CookieContext);

type ProviderProps = {
  children: React.ReactNode;
};

const browserLang = navigator.language;
const getRightLanguage = () => {
  let userLanguage: string;
  if (browserLang.startsWith("en")) {
    userLanguage = "ENGLISH";
  } else if (browserLang.startsWith("es")) {
    userLanguage = "SPANISH";
  } else if (browserLang.startsWith("de")) {
    userLanguage = "GERMAN";
  } else {
    userLanguage = "ENGLISH"; // fallback to English if browser language is not supported
  }
  return userLanguage;
};

export const CookieContextProvider = ({ children }: ProviderProps) => {
  const [isYoutubeAccepted, setYoutube] = useState(
    localStorage.getItem(CookieType.YOUTUBE)
  );
  const [isGoogleMapsAccepted, setGoogleMaps] = useState(
    localStorage.getItem(CookieType.GOOGLE_MAPS)
  );
  const [isGoogleAnalyticsAccepted, setGoogleAnalytics] = useState(
    localStorage.getItem(CookieType.GOOGLE_ANALYTICS)
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language")
      ? localStorage.getItem("language")
      : getRightLanguage()
  );

  useEffect(() => {
    localStorage.setItem(CookieType.YOUTUBE, String(isYoutubeAccepted));
    localStorage.setItem(CookieType.GOOGLE_MAPS, String(isGoogleMapsAccepted));
    localStorage.setItem(
      CookieType.GOOGLE_ANALYTICS,
      String(isGoogleAnalyticsAccepted)
    );
    if (language) localStorage.setItem("language", language);
    // Update other cookie states in local storage here
  }, [
    isYoutubeAccepted,
    isGoogleMapsAccepted,
    isGoogleAnalyticsAccepted,
    language,
  ]);

  const data = TRANSLATIONS[language as keyof typeof TRANSLATIONS];

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
    // Add other cookie states and related setter functions here
  };

  return (
    // @ts-expect-error
    <CookieContext.Provider value={value}>{children}</CookieContext.Provider>
  );
};
