import { useEffect, useState } from "react";
import { useCookieContext } from "../context/CookieContext";
import CookieDetails from "./CookieDetails";

type CookieBannerProps = {
  isCookieBannerOpen: boolean;
  setIsCookieBannerOpen: (value: boolean) => void;
};

export default function CookieBanner({
  isCookieBannerOpen,
  setIsCookieBannerOpen,
}: CookieBannerProps) {
  const [isCookieDetailsOpen, setIsCookieDetailsOpen] = useState(false);
  const { language, data } = useCookieContext();

  useEffect(() => {
    const cookieBanner = document.querySelector(".cookie-banner");
    if (isCookieBannerOpen) {
      setTimeout(() => {
        cookieBanner?.classList.add("active");
      }, 120);
    } else {
      setTimeout(() => {
        cookieBanner?.classList.remove("active");
      }, 120);
    }
  }, [isCookieBannerOpen]);

  return (
    <div className={`cookie-banner`}>
      <div className="cookie-text">
        <div className="cookie-text__title">
          <p className="text-4xl">{data.cookieBanner.title}</p>
        </div>
        <div className="cookie-text__body">
          <p>{data.cookieBanner.description}</p>
        </div>
      </div>
      <CookieOptions setIsCookieBannerOpen={setIsCookieBannerOpen} />
      <CookieFooter setIsCookieDetailsOpen={setIsCookieDetailsOpen} />
      <CookieDetails
        isCookieDetailsOpen={isCookieDetailsOpen}
        setIsCookieDetailsOpen={setIsCookieDetailsOpen}
      />
    </div>
  );
}

const CookieOptions = ({
  setIsCookieBannerOpen,
}: {
  setIsCookieBannerOpen: (value: boolean) => void;
}) => {
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
            onClick={() => setIsCookieBannerOpen(false)}
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
};

const CookieFooter = ({
  setIsCookieDetailsOpen,
}: {
  setIsCookieDetailsOpen: (value: boolean) => void;
}) => {
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
};
