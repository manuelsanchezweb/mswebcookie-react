import { useCookieContext } from '../context/CookieContext'

export default function CookieOverlay() {
  const { isCookieBannerOpen } = useCookieContext()

  return (
    <>
      <style>
        {`
          #mswebcookie-overlay {
            position: fixed;
            opacity: 0;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            pointer-events: none;
            transition: opacity $anim-mediumDuration ease-in-out;
          }
          
          #mswebcookie-overlay.active {
            opacity: 1;
            z-index: 100;
            pointer-events: all;
          }

          @media (min-width: 768px) {
            #mswebcookie-overlay {
              display: none;
            }
          }
        `}
      </style>
      {isCookieBannerOpen && (
        <div id="mswebcookie-overlay" className="active"></div>
      )}
    </>
  )
}
