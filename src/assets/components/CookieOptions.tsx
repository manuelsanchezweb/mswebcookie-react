import { useState } from "react";
import { CookieType, useCookieContext } from "../context/CookieContext";

export default function CookieOptions() {
  const {
    setCookieBannerOpen,
    data,
    isYoutubeAccepted,
    isGoogleMapsAccepted,
    isGoogleAnalyticsAccepted,
    setYoutube,
    setGoogleMaps,
    setGoogleAnalytics,
  } = useCookieContext();
  const [tempCookieState, setTempCookieState] = useState({
    [CookieType.YOUTUBE]: isYoutubeAccepted,
    [CookieType.GOOGLE_MAPS]: isGoogleMapsAccepted,
    [CookieType.GOOGLE_ANALYTICS]: isGoogleAnalyticsAccepted,
  });

  // Testing purposes
  // useEffect(() => {
  //   console.log("Updating cookies: ", tempCookieState);
  // }, [tempCookieState]);

  function renderCookieOptions() {
    return Object.values(CookieType).map((cookieType) => {
      const labelText = data.cookieLabels[cookieType];
      return (
        <div className="cookie-parameter" key={cookieType}>
          <input
            aria-labelledby={`${cookieType}-cookies`}
            type="checkbox"
            tabIndex={0}
            id={`${cookieType}-id`}
            className="cookie-parameter__input cookie-parameter__input-editable"
            name={`${cookieType}-id`}
            checked={tempCookieState[cookieType] || false}
            onChange={() => {
              console.log(
                `Toggling ${cookieType}:`,
                !tempCookieState[cookieType]
              );
              setTempCookieState({
                ...tempCookieState,
                [cookieType]: !tempCookieState[cookieType],
              });
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
      );
    });
  }

  function handleAccept() {
    setYoutube(tempCookieState[CookieType.YOUTUBE]);
    setGoogleMaps(tempCookieState[CookieType.GOOGLE_MAPS]);
    setGoogleAnalytics(tempCookieState[CookieType.GOOGLE_ANALYTICS]);
    setCookieBannerOpen(false);
  }

  function handleCancel() {
    setCookieBannerOpen(false);
    setTempCookieState({
      [CookieType.YOUTUBE]: isYoutubeAccepted,
      [CookieType.GOOGLE_MAPS]: isGoogleMapsAccepted,
      [CookieType.GOOGLE_ANALYTICS]: isGoogleAnalyticsAccepted,
    });
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
  );
}
