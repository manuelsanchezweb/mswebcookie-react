import { CookieBanner, CookieButton, CookieOverlay } from ".";
import { useCookieContext } from "../context/CookieContext";
import IframeGMaps from "./IframeGMaps";
import IframeYoutube from "./IframeYoutube";

export default function Cookie() {
  const { isYoutubeAccepted, isGoogleMapsAccepted } = useCookieContext();
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        {isYoutubeAccepted ? <IframeYoutube /> : "Cookies need to be accepted"}
        {isGoogleMapsAccepted ? <IframeGMaps /> : "Cookies need to be accepted"}
      </div>

      <CookieButton />
      <CookieOverlay />
      <CookieBanner />
    </>
  );
}
