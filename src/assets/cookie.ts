const cookieButton = document.querySelector('.cookie-button');
const cookieBanner = document.querySelector('.cookie-banner');
const cookieCancelButton = document.querySelector('.cookie-cancel') as HTMLButtonElement;
const cookieAcceptButton = document.querySelector('.cookie-accept') as HTMLButtonElement;
const cookieParameters = document.querySelectorAll('.cookie-parameter');
const cookieOverlay = document.querySelector('#cookie-overlay');
const cookieLinks = document.querySelectorAll('.cookie-layer-menu a');

const entranceTime = 1000;

export async function initCookie() {
  const inputDefaultId = (
    document?.querySelector('.cookie-parameter__input-default') as HTMLInputElement
  )?.getAttribute('id');

  //   Handle analytics from Matomo
  // if (
  //   localStorage.getItem("Statistik-id", true) ||
  //   localStorage.getItem("Matomo-id", true)
  // ) {
  //   addMatomoAnalytics();
  // }

  if (cookieBanner) {
    // Verify that only one overlay is possible at the same time: either popup or cookie one
    if (localStorage.getItem(inputDefaultId) === 'true') {
      cookieButton.classList.add('active');
    } else if (sessionStorage.getItem('popup') && !localStorage.getItem(inputDefaultId)) {
      setTimeout(function () {
        cookieOverlay.classList.add('active');
        cookieBanner.classList.add('active');
        isCookieBannerOpen();
      }, entranceTime);
    } else {
      setTimeout(function () {
        cookieBanner.classList.add('active');
        isCookieBannerOpen();
      }, entranceTime);
    }

    cookieButton.addEventListener('click', () => {
      cookieBanner.classList.add('active');
      isCookieBannerOpen();
      cookieButton.classList.remove('active');
      cookieOverlay.classList.add('active');
    });

    function handleCookieBanner(isAccept: boolean) {
      cookieBanner.classList.remove('active');
      isCookieBannerOpen();
      cookieOverlay.classList.remove('active');
      cookieButton.classList.add('active');

      if (isAccept) {
        localStorage.setItem(inputDefaultId, 'true');

        cookieParameters.forEach((parameter) => {
          const input = parameter.querySelector(
            '.cookie-parameter__input'
          ) as HTMLInputElement;
          const labelPre = parameter.querySelector(
            '.cookie-parameter__label'
          ) as HTMLLabelElement;
          const label = labelPre.htmlFor;

          if (input.checked === true) {
            localStorage.setItem(label, 'true');
          } else {
            localStorage.removeItem(label);
          }
        });

        // create a new event object
        const myEvent = new Event('cookiesUpdated');

        // dispatch the event on the document object
        document.dispatchEvent(myEvent);
      } else {
        const inputs = cookieBanner.querySelectorAll(
          '.cookie-parameter__input-editable'
        ) as NodeListOf<HTMLInputElement>;

        inputs.forEach((input) => {
          const id = input.getAttribute('id');
          const value = localStorage.getItem(id);
          if (value === 'true') {
            input.checked = true;
          } else {
            input.checked = false;
          }
        });
      }
    }

    cookieAcceptButton.addEventListener('click', () => {
      handleCookieBanner(true);
    });

    cookieCancelButton.addEventListener('click', () => {
      handleCookieBanner(false);
    });

    const switchState = (input: HTMLInputElement) => input.click();

    cookieParameters.forEach((parameter) => {
      const input = parameter.querySelector(
        '.cookie-parameter__input'
      ) as HTMLInputElement;
      const labelElement = parameter.querySelector('.cookie-parameter__label');
      const labelPre = parameter.querySelector(
        '.cookie-parameter__label'
      ) as HTMLLabelElement;
      const label = labelPre.htmlFor;

      if (localStorage.getItem(label) === 'true') {
        switchState(input);
      }

      // This only applies to firefox
      if (navigator.userAgent.match(/firefox|fxios/i)) {
        labelElement.addEventListener('click', () => {
          switchState(input);
        });
      }

      input.addEventListener('click', () => {
        switchState(input);
      });
    });
  }
}

export function isCookieBannerOpen() {
  if (cookieBanner.classList.contains('active')) {
    cookieCancelButton.tabIndex = 0;
    cookieAcceptButton.tabIndex = 0;
    cookieParameters.forEach((parameter) => {
      parameter.querySelector('input').tabIndex = 0;
    });
    cookieLinks.forEach((link: HTMLElement) => {
      link.tabIndex = 0;
    });
    cookieBanner.removeAttribute('aria-hidden');
  } else {
    cookieCancelButton.tabIndex = -1;
    cookieAcceptButton.tabIndex = -1;
    cookieParameters.forEach((parameter) => {
      parameter.querySelector('input').tabIndex = -1;
    });
    cookieLinks.forEach((link: HTMLElement) => {
      link.tabIndex = -1;
    });
    cookieBanner.setAttribute('aria-hidden', 'true');
  }
}

export async function initCookieDetails() {
  const detailsCookies = document.querySelector('[data-details-cookies]');
  const openButton = document.querySelector('[data-open-details-cookies]');
  const closeButton = document.querySelector('[data-close-details-cookies]');
  if (!openButton || !detailsCookies) return;

  openButton.addEventListener('click', () => {
    detailsCookies.classList.add('active');
  });

  closeButton.addEventListener('click', () => {
    detailsCookies.classList.remove('active');
  });
}
