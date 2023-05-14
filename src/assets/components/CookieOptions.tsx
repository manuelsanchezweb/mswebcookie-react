import { useState } from 'react'
import {
  CookieLabels,
  CookieType,
  useCookieContext,
} from '../context/CookieContext'
import debugFactory from 'debug'

const debug = debugFactory('components/CookieOptions')

export default function CookieOptions() {
  const { setCookieBannerOpen, data, cookies, setCookie } = useCookieContext()
  const [tempCookieState, setTempCookieState] = useState(cookies)

  const cookiesToShow = Object.values(CookieType).filter(
    (cookieType) => cookieType !== CookieType.HAS_USER_INTERACTED
  )

  function renderCookieOptions() {
    return Object.values(cookiesToShow).map((cookieType) => {
      const labelText = ''
      return (
        <div className="cookie-parameter" key={cookieType}>
          <input
            aria-labelledby={`${cookieType}-cookies`}
            type="checkbox"
            tabIndex={0}
            id={`${cookieType}-id`}
            className="cookie-parameter__input cookie-parameter__input-editable"
            name={`${cookieType}-id`}
            checked={false}
            onChange={() => {
              debug(`Toggling ${cookieType}:`, !tempCookieState[cookieType])
              setTempCookieState({
                ...tempCookieState,
                [cookieType]: !tempCookieState[cookieType],
              })
            }}
          />
          <label
            aria-labelledby={`${cookieType}-cookies`}
            aria-label={`${labelText} cookies`}
            className="cookie-parameter__label text-xs"
            htmlFor={`${cookieType}-id`}
          ></label>
          <span className="cookie-parameter__name" id={`${cookieType}-cookies`}>
            {labelText}
          </span>
        </div>
      )
    })
  }

  function handleAccept() {
    for (const type of Object.values(CookieType)) {
      if (type !== CookieType.HAS_USER_INTERACTED) {
        setCookie(type, tempCookieState[type])
      }
    }
    setCookieBannerOpen(false)
    setCookie(CookieType.HAS_USER_INTERACTED, true)
    debug('Cookies accepted: ', tempCookieState)
  }

  function handleCancel() {
    setCookie(CookieType.HAS_USER_INTERACTED, true)
    setCookieBannerOpen(false)
    setTempCookieState(cookies)
  }

  return (
    <div className="cookie-options">
      <div
        className="flex flex-wrap w-full justify-between my-6 gap-4"
        aria-labelledby="cookie-settings"
      >
        <div className="cookie-parameter">
          <input
            disabled={true}
            checked={true}
            aria-labelledby="Funktion-cookies"
            type="checkbox"
            id="Function"
            className="cookie-parameter__input cookie-parameter__input-default"
            name="Function"
            tabIndex={0}
          />
          <label
            aria-labelledby="Funktion-cookies"
            className="cookie-parameter__label text-xs"
            htmlFor="Function"
          ></label>
          <span className="cookie-parameter__name" id="Funktion-cookies">
            Funktion
          </span>
        </div>
        {renderCookieOptions()}
      </div>
      <div className="flex flex-row items-center gap-4 justify-center">
        <button
          tabIndex={0}
          type="button"
          title="Return all cookies to previous state and close banner"
          aria-label="Return all cookies to previous state and close banner"
          className="btn btn-action cookie-cancel"
          onClick={handleCancel}
        >
          {data.cookieBanner.cancel}
        </button>
        <button
          tabIndex={0}
          type="button"
          title="Aktuelle Cookie-Auswahl speichern"
          aria-label="Aktuelle Cookie-Auswahl speichern"
          className="btn cookie-accept"
          onClick={handleAccept}
        >
          {data.cookieBanner.accept}
        </button>
      </div>
    </div>
  )
}
