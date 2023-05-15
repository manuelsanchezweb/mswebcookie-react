import { useCookieContext } from '../context/CookieContext'

export default function CookieFooter({
  setIsCookieDetailsOpen,
}: {
  setIsCookieDetailsOpen: (value: boolean) => void
}) {
  const { data } = useCookieContext()
  return (
    <div className="cookie-layer-menu flex w-full items-center justify-center mt-6 mx-auto md:mx-0 gap-6 text-sm">
      <a href="/datenschutz/" title="Datenschutz" tabIndex={0}>
        {data.cookieFooter.dataProtection}
      </a>
      <a href="/impressum/" title="Impressum" tabIndex={0}>
        {data.cookieFooter.imprint}
      </a>
      <button
        className="cookie__details-link"
        aria-label="Cookie Details öffnen"
        onClick={() => setIsCookieDetailsOpen(true)}
      >
        {data.cookieFooter.moreDetails}
      </button>
    </div>
  )
}
