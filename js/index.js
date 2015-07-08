window.onscroll = function windowOnScroll(event) {
  function setActiveLink(linkId) {
    while(document.getElementsByClassName('active')[0]) {
      document.getElementsByClassName('active')[0].className = '';
    }

    document.querySelector(linkId).className = 'active';
  }

  function getActiveLinkId() {
    function getDistanceFromTopOfPage(elementSelector) {
      return document.querySelector(elementSelector).offsetTop;
    }

    var currentVerticalScrollDistance = window.scrollY;
    var headerOffset = document.querySelector('header').offsetHeight || document.querySelector('header').clientHeight;

    if (currentVerticalScrollDistance + headerOffset < getDistanceFromTopOfPage('#about-us')) {
      return '#home-link';
    } else if (currentVerticalScrollDistance + headerOffset < getDistanceFromTopOfPage('#menu')) {
      return '#about-us-link';
    } else if (currentVerticalScrollDistance + headerOffset < getDistanceFromTopOfPage('#contact')) {
      return '#menu-link';
    } else {
      return '#contact-link';
    }
  }

  setActiveLink(getActiveLinkId());
}

window.onscroll();

var menuImage = document.getElementById('menu-image');

menuImage.onerror = function menuImageOnError(event) {
  if (getCurrentMenuPage() - 1) {
    var styleSheet = document.styleSheets[0];

    styleSheet.insertRule('#menu-image[src*="menu-' + (getCurrentMenuPage() - 1).toString() + '.png"] ~ #menu-next { display: none; }', 1);

    menuImage.src = '/img/menu-' + (getCurrentMenuPage() - 1).toString() + '.png';
  } else {
    menuImage.src = '/img/menu-0.png';
  }
}

menuImage.onload = function menuImageOnLoad(event) {
  menuImage.className = '';
}

function getCurrentMenuPage() {
  return parseInt(document.getElementById('menu-image')['src'].match(/[0-9](?=\.png)/)[0]);
}

document.getElementById('menu-prev').onclick = function menuPrevOnClick(event) {
  var previousMenuPage    = getCurrentMenuPage() - 1,
      previousMenuPageUrl = '/img/menu-' + previousMenuPage + '.png';

  menuImage.className = 'loading';
  menuImage.src = previousMenuPageUrl;
};

document.getElementById('menu-next').onclick = function menuNextOnClick(event) {
  var nextMenuPage    = getCurrentMenuPage() + 1,
      nextMenuPageUrl = '/img/menu-' + nextMenuPage + '.png';

  menuImage.className = 'loading';
  menuImage.src = nextMenuPageUrl;
};
