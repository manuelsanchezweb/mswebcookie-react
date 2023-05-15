import { useCookieContext } from '../context/CookieContext'

type CookieDetailsProps = {
  isCookieDetailsOpen: boolean
  setIsCookieDetailsOpen: (value: boolean) => void
}

export default function CookieDetails({
  isCookieDetailsOpen,
  setIsCookieDetailsOpen,
}: CookieDetailsProps) {
  const { data } = useCookieContext()
  return (
    <div
      data-details-cookies=""
      className={`cookie__details ${isCookieDetailsOpen ? 'active' : ''} z-50`}
    >
      <button
        className="absolute top-4 right-6"
        aria-label="Close Cookie Details"
        onClick={() => setIsCookieDetailsOpen(false)}
      >
        X
      </button>
      <div className="text-left font-bold text-2xl mb-4">
        {data.cookieDetails.title}
      </div>
      <div className="cookie-list">
        <div className="cookie-detail text-left">
          <div className="text-white bg-[var(--color-primary)] text-xl pl-1">
            {data.cookieDetails.default}
          </div>
          <div>
            <b>{data.cookieDetails.provider}:</b> msweb
          </div>
          <div>
            <b>{data.cookieDetails.duration}:</b> unlimited
          </div>
          <div>
            <b>{data.cookieDetails.purpose}:</b> Allow functional behaviour of
            the website
          </div>
          <div>
            <b>{data.cookieDetails.type}:</b> Functional cookies
          </div>
        </div>
      </div>
    </div>
  )
}
