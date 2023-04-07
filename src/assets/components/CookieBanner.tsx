import { useEffect, useState } from "react";
import { useCookieContext } from "../context/CookieContext";
import CookieDetails from "./CookieDetails";
import CookieFooter from "./CookieFooter";
import CookieOptions from "./CookieOptions";

export default function CookieBanner() {
  const [isCookieDetailsOpen, setIsCookieDetailsOpen] = useState(false);

  const { data, isCookieBannerOpen } = useCookieContext();

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
      <CookieOptions />
      <CookieFooter setIsCookieDetailsOpen={setIsCookieDetailsOpen} />

      <CookieDetails
        isCookieDetailsOpen={isCookieDetailsOpen}
        setIsCookieDetailsOpen={setIsCookieDetailsOpen}
      />
    </div>
  );
}
