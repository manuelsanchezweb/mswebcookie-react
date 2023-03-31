export type CookieState = {
  youtube?: boolean;
  googleMaps?: boolean;
  googleAnalytics?: boolean;
  googleTagManager?: boolean;
  googleFonts?: boolean;
};

export type CookieAction = {
  type: "SET_COOKIE";
  payload: { key: CookieNames; value: boolean };
};

export enum CookieOptions {
  YOUTUBE = "cookie-yt",
  GOOGLE_MAPS = "cookie-gm",
  GOOGLE_ANALYTICS = "cookie-ga",
  GOOGLE_TAG_MANAGER = "cookie-gtm",
  GOOGLE_FONTS = "cookie-gf",
}
