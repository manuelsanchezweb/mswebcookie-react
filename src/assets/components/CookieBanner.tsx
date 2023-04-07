import { useEffect, useState } from "react";
import { CookieDetails, CookieFooter, CookieOptions } from ".";
import { useCookieContext } from "../context/CookieContext";
import { LanguageSwitcher } from "./CookieLanguageSwitcher";

export default function CookieBanner() {
  const [isCookieDetailsOpen, setIsCookieDetailsOpen] = useState(false);

  const { data, isCookieBannerOpen, language, setLanguage } =
    useCookieContext();

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
      <LanguageSwitcher />
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
