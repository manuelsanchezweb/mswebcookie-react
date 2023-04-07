import { useCookieContext } from "../context/CookieContext";

export default function CookieOptions() {
  const { setCookieBannerOpen } = useCookieContext();

  return (
    <>
      <style>
        {`
            .cookie-switchers {
              display: flex;
              flex-wrap: wrap;
              width: 100%;
              justify-content: space-between;
              margin: 1.9em 0 1.4em;
              row-gap: 0.625em;
            }
    
            @media only screen and (min-width: 500px) {
              .cookie-switchers {
                margin: 1.9em 0;
              } 
            }
            `}
      </style>
      <div className="cookie-options">
        <div className="cookie-switchers" aria-labelledby="cookie-settings">
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
              className="cookie-parameter__label"
              htmlFor="Function"
            ></label>
            <span className="cookie-parameter__name" id="Funktion-cookies">
              Funktion
            </span>
          </div>
          <div className="cookie-parameter">
            <input
              aria-labelledby="Youtube-cookies"
              type="checkbox"
              tabIndex={0}
              id="Youtube-id"
              className="cookie-parameter__input cookie-parameter__input-editable"
              name="Youtube-id"
            />
            <label
              aria-labelledby="Youtube-cookies"
              aria-label="Youtube cookies"
              className="cookie-parameter__label"
              htmlFor="Youtube-id"
            ></label>
            <span className="cookie-parameter__name" id="Youtube-cookies">
              Youtube
            </span>
          </div>
          <div className="cookie-parameter">
            <input
              aria-labelledby="Matomo-cookies"
              type="checkbox"
              tabIndex={0}
              id="Matomo-id"
              className="cookie-parameter__input cookie-parameter__input-editable"
              name="Matomo-id"
            />
            <label
              aria-labelledby="Matomo-cookies"
              aria-label="Matomo cookies"
              className="cookie-parameter__label"
              htmlFor="Matomo-id"
            ></label>
            <span className="cookie-parameter__name" id="Matomo-cookies">
              Matomo
            </span>
          </div>
        </div>
        <div className="cookie-buttons">
          <button
            tabIndex={0}
            type="button"
            title="Alle Cookies, bis auf Funktions-Cookies, ablehnen"
            aria-label="Alle Cookies, bis auf Funktions-Cookies, ablehnen"
            className="btn blueborder cookie-cancel"
            onClick={() => setCookieBannerOpen(false)}
          >
            Ablehnen
          </button>
          <button
            tabIndex={0}
            type="button"
            title="Aktuelle Cookie-Auswahl speichern"
            aria-label="Aktuelle Cookie-Auswahl speichern"
            className="btn cookie-accept"
          >
            Auswahl speichern
          </button>
        </div>
      </div>
    </>
  );
}
