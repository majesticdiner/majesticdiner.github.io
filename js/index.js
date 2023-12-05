const MENU_FILE_EXTENSION = "jpeg";

window.onscroll = function windowOnScroll(event) {
  function setActiveLink(linkId) {
    while (document.getElementsByClassName("active")[0]) {
      document.getElementsByClassName("active")[0].className = "";
    }

    document.querySelector(linkId).className = "active";
  }

  function getActiveLinkId() {
    function getDistanceFromTopOfPage(elementSelector) {
      return document.querySelector(elementSelector).offsetTop;
    }

    const currentVerticalScrollDistance = window.scrollY;
    const headerOffset =
      document.querySelector("header").offsetHeight ||
      document.querySelector("header").clientHeight;

    if (
      currentVerticalScrollDistance + headerOffset <
      getDistanceFromTopOfPage("#about-us")
    ) {
      return "#home-link";
    } else if (
      currentVerticalScrollDistance + headerOffset <
      getDistanceFromTopOfPage("#menu")
    ) {
      return "#about-us-link";
    } else if (
      currentVerticalScrollDistance + headerOffset <
      getDistanceFromTopOfPage("#contact")
    ) {
      return "#menu-link";
    } else {
      return "#contact-link";
    }
  }

  setActiveLink(getActiveLinkId());
};

window.onscroll();

const menuImage = document.getElementById("menu-image");
const nextMenuImage = document.getElementById("next-menu-image");
const menuPrevButton = document.getElementById("menu-prev");
const menuNextButton = document.getElementById("menu-next");
let lastMenuPage;

if (nextMenuImage) {
  nextMenuImage.onerror = function nextMenuImageOnError(event) {
    menuNextButton.style["display"] = "none";
    lastMenuPage = getCurrentMenuPage();
  };
}

menuImage.onload = function menuImageOnLoad(event) {
  menuImage.className = "";
};

menuPrevButton.onclick = function menuPrevOnClick(event) {
  const currentMenuPage = getCurrentMenuPage();
  const previousMenuPage = currentMenuPage - 1;
  const previousMenuPageUrl = getMenuUrl(previousMenuPage);

  if (previousMenuPage >= 0) {
    menuImage.className = "loading";
    menuImage.src = previousMenuPageUrl;
  }

  if (previousMenuPage === 0) {
    menuPrevButton.style["display"] = "none";
  }

  menuNextButton.style["display"] = "";
};

if (menuNextButton) {
  menuNextButton.onclick = function menuNextOnClick(event) {
    const currentMenuPage = getCurrentMenuPage();
    const nextMenuPage = currentMenuPage + 1;
    const timeAtCurrentMinute = getTimeAtCurrentMinute();
    const nextMenuPageUrl = getMenuUrl(nextMenuPage);
    const nextNextMenuPage = nextMenuPage + 1;
    const nextNextMenuPageUrl = getMenuUrl(nextNextMenuPage);

    if (!lastMenuPage || currentMenuPage < lastMenuPage) {
      menuImage.className = "loading";
      menuImage.src = nextMenuPageUrl;

      if (!lastMenuPage) nextMenuImage.src = nextNextMenuPageUrl;
    }

    if (nextMenuPage === lastMenuPage) {
      menuNextButton.style["display"] = "none";
    }

    menuPrevButton.style["display"] = "";
  };
}

function getCurrentMenuPage() {
  const currentMenuPageRegExp = new RegExp(`[0-9](?=\.${MENU_FILE_EXTENSION})`);

  return parseInt(
    document.getElementById("menu-image")["src"].match(currentMenuPageRegExp)[0]
  );
}

function getMenuUrl(page) {
  return `/img/menu-${page}.${MENU_FILE_EXTENSION}?${getTimeAtCurrentMinute()}`;
}

function getTimeAtCurrentMinute() {
  const now = new Date();

  now.setMilliseconds(0);
  now.setSeconds(0);

  return now.getTime();
}
