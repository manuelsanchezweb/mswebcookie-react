export default function CookieFooter({
  setIsCookieDetailsOpen,
}: {
  setIsCookieDetailsOpen: (value: boolean) => void;
}) {
  return (
    <>
      <style>
        {`
          .cookie-layer-menu {
            display: flex;
            flex-direction: column;
            width: max-content;
            align-items: center;
            justify-content: center;
            margin: 1.6em auto 0;
          }
  
          @media only screen and (min-width: 500px) {
            .cookie-layer-menu {
              flex-direction: row;
              width: 100%;
              margin: 1.6em 0 0;
            }
          }
  
          @media only screen and (min-width: 768px) {
            .cookie-layer-menu {
              margin: 3.3em 0 auto;
            }
          }
          `}
      </style>
      <div className="cookie-layer-menu">
        <a href="/datenschutz/" title="Datenschutz" tabIndex={0}>
          Datenschutz{" "}
        </a>
        <a href="/impressum/" title="Impressum" tabIndex={0}>
          {" "}
          Impressum{" "}
        </a>
        <button
          className="cookie__details-link"
          aria-label="Cookie Details öffnen"
          onClick={() => setIsCookieDetailsOpen(true)}
        >
          Mehr Details
        </button>
      </div>
    </>
  );
}
