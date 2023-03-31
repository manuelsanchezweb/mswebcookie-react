import { useCookieContext } from "../context/CookieContext";

export default function Debug({ open = false }: { open?: boolean }) {
  const {
    isYoutubeAccepted,
    isGoogleMapsAccepted,
    isGoogleAnalyticsAccepted,
    language,
    setYoutube,
    setGoogleMaps,
    setGoogleAnalytics,
    setLanguage,
  } = useCookieContext();

  if (!open) return null;

  const handleYoutubeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutube(event.target.checked);
  };

  const handleGoogleMapsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGoogleMaps(event.target.checked);
  };

  const handleGoogleAnalyticsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGoogleAnalytics(event.target.checked);
  };

  return (
    <>
      <div className="fixed top-0 right-0 bg-white p-4 z-50 border border-black text-md text-left">
        <h1 className="text-center text-2xl mb-5">Debugging</h1>
        <h2 className="text-xl mb-2">Cookies</h2>
        <hr className="bg-black h-[5px] my-2" />
        <ul>
          <li>YouTube Cookie: {isYoutubeAccepted?.toString()}</li>
          <li>Google Maps Cookie: {isGoogleMapsAccepted?.toString()}</li>
          <li>Google Analytics: {isGoogleAnalyticsAccepted?.toString()}</li>
        </ul>
        <h2 className="text-xl my-2">Setters</h2>
        <hr className="bg-black h-[5px] my-2" />
        <div>
          <label>
            <input
              type="checkbox"
              defaultChecked={isYoutubeAccepted.toString() === "true"}
              onChange={handleYoutubeChange}
            />
            YouTube
          </label>
          <label>
            <input
              type="checkbox"
              defaultChecked={isGoogleMapsAccepted.toString() === "true"}
              onChange={handleGoogleMapsChange}
            />
            Google Maps
          </label>
          <label>
            <input
              type="checkbox"
              defaultChecked={isGoogleAnalyticsAccepted.toString() === "true"}
              onChange={handleGoogleAnalyticsChange}
            />
            Google Analytics
          </label>
        </div>
        <h2 className="text-xl my-2">Language</h2>
        <hr className="bg-black h-[5px] my-2" />
        <p>{language}</p>
        <button onClick={() => setLanguage("ENGLISH")}>
          Change to English
        </button>
        <button onClick={() => setLanguage("SPANISH")}>
          Change to Spanish
        </button>
      </div>
    </>
  );
}
