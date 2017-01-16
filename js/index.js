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
var menuPrevButton = document.getElementById('menu-prev');
var menuNextButton = document.getElementById('menu-next');
var lastMenuPage;

menuImage.onerror = function menuImageOnError(event) {
  var previousMenuPage = getCurrentMenuPage() - 1;
  var previousMenuPageUrl = '/img/menu-' + previousMenuPage + '.png';

  menuImage.className = 'loading';
  menuImage.src = previousMenuPageUrl;
  menuNextButton.style['display'] = 'none';
  lastMenuPage = previousMenuPage;
};

menuImage.onload = function menuImageOnLoad(event) {
  menuImage.className = '';
};

menuPrevButton.onclick = function menuPrevOnClick(event) {
  var currentMenuPage = getCurrentMenuPage();
  var previousMenuPage = currentMenuPage - 1;
  var previousMenuPageUrl = '/img/menu-' + previousMenuPage + '.png';

  if (previousMenuPage >= 0) {
    menuImage.className = 'loading';
    menuImage.src = previousMenuPageUrl;
  }

  if (previousMenuPage === 0) {
    menuPrevButton.style['display'] = 'none';
  }

  menuNextButton.style['display'] = '';
};

menuNextButton.onclick = function menuNextOnClick(event) {
  var currentMenuPage = getCurrentMenuPage();
  var nextMenuPage = currentMenuPage + 1;
  var nextMenuPageUrl = '/img/menu-' + nextMenuPage + '.png';

  if (!lastMenuPage || currentMenuPage < lastMenuPage) {
    menuImage.className = 'loading';
    menuImage.src = nextMenuPageUrl;
  }

  if (nextMenuPage === lastMenuPage) {
    menuNextButton.style['display'] = 'none';
  }

  menuPrevButton.style['display'] = '';
};

function getCurrentMenuPage() {
  return parseInt(document.getElementById('menu-image')['src'].match(/[0-9](?=\.png)/)[0]);
}
