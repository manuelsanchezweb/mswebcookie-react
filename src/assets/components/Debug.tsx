import { useState } from 'react'
import { useCookieContext } from '../context/CookieContext'

export default function Debug() {
  const {
    isYoutubeAccepted,
    isGoogleMapsAccepted,
    isGoogleAnalyticsAccepted,
    language,
    isCookieBannerOpen,
    hasAlreadyInteractedWithCookieBanner,
    setYoutube,
    setGoogleMaps,
    setGoogleAnalytics,
    setLanguage,
    setCookieBannerOpen,
    setHasAlreadyInteractedWithCookieBanner,
  } = useCookieContext()

  const [isDebugOpened, setIsDebugOpened] = useState(false)

  const toggleYoutubeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutube(event.target.checked)
  }

  const toggleGoogleMapsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGoogleMaps(event.target.checked)
  }

  const toggleGoogleAnalyticsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGoogleAnalytics(event.target.checked)
  }

  const toggleHasUserInteracted = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHasAlreadyInteractedWithCookieBanner(event.target.checked)
  }
  return (
    <>
      {isDebugOpened ? (
        <div className="fixed top-0 left-0 bg-white p-4 z-10 border border-black text-md text-left">
          <button
            className="btn mb-2 flex w-fit ml-auto"
            onClick={() => setIsDebugOpened(false)}
          >
            X
          </button>
          <h2 className="text-2xl mb-5">Debugging</h2>
          <h3 className="text-xl mb-2">Cookies</h3>
          <hr className="bg-black h-[5px] my-2" />
          <ul>
            <li>YouTube Cookie: {isYoutubeAccepted?.toString()}</li>
            <li>Google Maps Cookie: {isGoogleMapsAccepted?.toString()}</li>
            <li>Google Analytics: {isGoogleAnalyticsAccepted?.toString()}</li>
            <li>
              Has User Interacted at least once?:{' '}
              {hasAlreadyInteractedWithCookieBanner?.toString()}
            </li>
          </ul>
          <h3 className="text-xl my-2">Setters</h3>
          <hr className="bg-black h-[5px] my-2" />
          <div>
            <label>
              <input
                type="checkbox"
                defaultChecked={isYoutubeAccepted?.toString() === 'true'}
                onChange={toggleYoutubeChange}
              />
              YouTube
            </label>
            <label>
              <input
                type="checkbox"
                defaultChecked={isGoogleMapsAccepted?.toString() === 'true'}
                onChange={toggleGoogleMapsChange}
              />
              Google Maps
            </label>
            <label>
              <input
                type="checkbox"
                defaultChecked={
                  isGoogleAnalyticsAccepted?.toString() === 'true'
                }
                onChange={toggleGoogleAnalyticsChange}
              />
              Google Analytics
            </label>
            <label>
              <input
                type="checkbox"
                defaultChecked={
                  hasAlreadyInteractedWithCookieBanner?.toString() === 'true'
                }
                onChange={toggleHasUserInteracted}
              />
              Toggle Has User Interacted
            </label>
          </div>
          <section>
            <h3 className="text-xl my-2">Language</h3>
            <hr className="bg-black h-[5px] my-2" />
            <p>{language}</p>
            <button className="btn mb-2" onClick={() => setLanguage('ENGLISH')}>
              Change to English
            </button>
            <button className="btn" onClick={() => setLanguage('SPANISH')}>
              Change to Spanish
            </button>
          </section>
          <section>
            <h3 className="text-xl my-2">Cookie Banner</h3>
            <hr className="bg-black h-[5px] my-2" />
            <p>Is the cookie banner opened: {isCookieBannerOpen?.toString()}</p>
            <button
              className="btn"
              onClick={() => setCookieBannerOpen(!isCookieBannerOpen)}
            >
              Toggle Cookie Banner
            </button>
          </section>
        </div>
      ) : (
        <button
          className="fixed top-0 left-0 bg-white p-4 z-10 border border-black text-md text-left"
          onClick={() => setIsDebugOpened(true)}
        >
          Open Debug
        </button>
      )}
    </>
  )
}
