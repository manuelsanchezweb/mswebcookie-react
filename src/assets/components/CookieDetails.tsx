type CookieDetailsProps = {
  isCookieDetailsOpen: boolean;
  setIsCookieDetailsOpen: (value: boolean) => void;
};

export default function CookieDetails({
  isCookieDetailsOpen,
  setIsCookieDetailsOpen,
}: CookieDetailsProps) {
  return (
    <div
      data-details-cookies=""
      className={`cookie__details ${isCookieDetailsOpen ? "active" : ""}`}
    >
      <button
        className="close-button"
        aria-label="Cookie Details schliessen"
        onClick={() => setIsCookieDetailsOpen(false)}
      >
        X
      </button>
      <div className="cookie-text__title">Details</div>
      <div className="cookie-list">
        <div className="cookie-detail">
          <div className="cookie-detail-name">Function</div>
          <div>
            <b>Anbieter:</b> msweb
          </div>
          <div>
            <b>Duration:</b> unlimited
          </div>
          <div>
            <b>Goal</b> Allow functional behaviour of the website
          </div>
          <div>
            <b>Type:</b> Functional cookies
          </div>
        </div>
      </div>
    </div>
  );
}
