const browserLang = navigator.language;
export const getRightLanguage = () => {
  let userLanguage: string;
  if (browserLang.startsWith("en")) {
    userLanguage = "ENGLISH";
  } else if (browserLang.startsWith("es")) {
    userLanguage = "SPANISH";
  } else if (browserLang.startsWith("de")) {
    userLanguage = "GERMAN";
  } else {
    userLanguage = "ENGLISH"; // fallback to English if browser language is not supported
  }
  return userLanguage;
};
