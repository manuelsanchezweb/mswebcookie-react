import { useState } from 'react'
import { CookieBanner, CookieButton, CookieOverlay } from '.'
import { CookieType, useCookieContext } from '../context/CookieContext'
import IframeGMaps from './IframeGMaps'
import IframeYoutube from './IframeYoutube'
import { Modal } from './Modal'
import debugFactory from 'debug'

const debug = debugFactory('components/Cookie')

export default function Cookie() {
  const { cookies, setCookieBannerOpen } = useCookieContext()
  const [isGMapsModalOpen, setIsGMapsModalOpen] = useState(false)
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false)

  const openCookieBannerAndFocus = (cookieType: string) => {
    setCookieBannerOpen(true)

    // Add focus here
    const cookieOption = document.querySelector(
      `#${cookieType}`
    ) as HTMLInputElement
    cookieOption?.focus()
    debug('This is the option that has been focused now:', cookieOption)
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 items-center justify-center my-12">
        {cookies[CookieType.YOUTUBE] ? (
          <IframeYoutube />
        ) : (
          <>
            <button onClick={() => setIsYouTubeModalOpen(true)} className="btn">
              Watch YouTube Video
            </button>
            <Modal
              isOpen={isYouTubeModalOpen}
              onClose={() => setIsYouTubeModalOpen(false)}
            >
              <div className="flex flex-col items-center gap-6">
                <p>You have to accept cookies first to watch this video</p>
                <button
                  className="btn"
                  onClick={() => {
                    openCookieBannerAndFocus(`${CookieType.YOUTUBE}-id`)
                    setIsYouTubeModalOpen(false)
                  }}
                >
                  Open Cookie YouTube
                </button>
              </div>
            </Modal>
          </>
        )}
        {cookies[CookieType.GOOGLE_MAPS] ? (
          <IframeGMaps />
        ) : (
          <>
            <button className="btn" onClick={() => setIsGMapsModalOpen(true)}>
              Open Google Maps
            </button>
            <Modal
              isOpen={isGMapsModalOpen}
              onClose={() => setIsGMapsModalOpen(false)}
            >
              <div className="flex flex-col items-center gap-6">
                <p>You have to accept cookies first to see the map</p>
                <button
                  className="btn"
                  onClick={() => {
                    openCookieBannerAndFocus(`${CookieType.GOOGLE_MAPS}-id`)
                    setIsGMapsModalOpen(false)
                  }}
                >
                  Open Cookie Google Maps
                </button>
              </div>
            </Modal>
          </>
        )}
      </div>

      <CookieButton />
      <CookieOverlay />
      <CookieBanner />
    </>
  )
}
