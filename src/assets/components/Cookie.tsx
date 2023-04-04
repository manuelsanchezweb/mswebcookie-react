import { CookieBanner, CookieButton, CookieOverlay } from ".";
import { CookieType, useCookieContext } from "../context/CookieContext";
import IframeGMaps from "./IframeGMaps";
import IframeYoutube from "./IframeYoutube";

export default function Cookie() {
  // let hasUserAlreadySeenCookieBanner = localStorage.getItem(
  //   "hasUserAlreadySeenCookieBanner"
  // );

  console.log(localStorage.getItem(CookieType.YOUTUBE));
  const {
    isYoutubeAccepted,
    isGoogleMapsAccepted,
    isCookieBannerOpen,
    setCookieBannerOpen,
  } = useCookieContext();
  return (
    <>
      <p>ISCOOKIEBANNEROPEN: {isCookieBannerOpen.toString()}</p>
      {/* BODY  */}

      <div className="flex flex-col md:flex-row gap-4">
        {isYoutubeAccepted ? <IframeYoutube /> : "Cookies need to be accepted"}
        {isGoogleMapsAccepted ? <IframeGMaps /> : "Cookies need to be accepted"}
      </div>

      <CookieButton
        onClick={() => setCookieBannerOpen(true)}
        isCookieBannerOpen={isCookieBannerOpen}
      />
      <CookieOverlay />
      <CookieBanner
        isCookieBannerOpen={isCookieBannerOpen}
        setIsCookieBannerOpen={setCookieBannerOpen}
      />
    </>
  );
}
