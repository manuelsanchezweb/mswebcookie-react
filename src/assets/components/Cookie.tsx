import { useState } from "react";
import { CookieBanner, CookieButton, CookieOverlay } from ".";

export default function Cookie() {
  let hasUserAlreadySeenCookieBanner = localStorage.getItem(
    "hasUserAlreadySeenCookieBanner"
  );
  const [isCookieBannerOpen, setIsCookieBannerOpen] = useState(
    hasUserAlreadySeenCookieBanner ? false : true
  );
  return (
    <>
      <p>ISCOOKIEBANNEROPEN: {isCookieBannerOpen.toString()}</p>
      <CookieButton
        onClick={() => setIsCookieBannerOpen(true)}
        isCookieBannerOpen={isCookieBannerOpen}
      />
      <CookieOverlay />
      <CookieBanner
        isCookieBannerOpen={isCookieBannerOpen}
        setIsCookieBannerOpen={setIsCookieBannerOpen}
      />
    </>
  );
}
