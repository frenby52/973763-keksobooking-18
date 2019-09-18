'use strict';

var GENERATE_QUANTITY = 8;
// временно задал 500
var BLOCK_SIZE = 500;
// var PIN_MIN_X;
// var PIN_MAX_X;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
}

var getAvatar = function (quantity) {
  var avatarArray = [];
  for (var i = 0; i < quantity; i++) {
    avatarArray[i] = 'img/avatars/user0' + (i + 1) + '.png';
  }

  return avatarArray;
};

var createAdInfo = function (avatar) {
  var adInfo = {
    author: {
      avatar: avatar
    },
    location: {
      x: randomInteger(0, BLOCK_SIZE),
      y: randomInteger(PIN_MIN_Y, PIN_MAX_Y)
    }
  };

  return adInfo;
};

var generateData = function (quantity) {
  var avatars = getAvatar(quantity);
  var dataAds = [];
  for (var i = 0; i < quantity; i++) {
    dataAds[i] = createAdInfo(avatars[i]);
  }

  return dataAds;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var dataAds = generateData(GENERATE_QUANTITY);


var createElements = function (quantity, templateId, contentElement) {
  var template = document.querySelector(templateId).content.querySelector(contentElement);
  var documentFragment = document.createDocumentFragment();

  for (var i = 0; i < quantity; i++) {
    var element = template.cloneNode(true);
    element.style = 'left: ' + dataAds[i].location.x + 'px; top: ' + dataAds[i].location.y + 'px;';
    element.querySelector('img').src = dataAds[i].author.avatar;
    // pinElement.querySelector('img').alt = dataAds[i].offer.title;
    documentFragment.appendChild(element);
  }

  return documentFragment;
};

var fillElements = function (quantity, templateId, contentElement, destinationElement) {
  var documentFragment = createElements(quantity, templateId, contentElement);
  destinationElement = document.querySelector(destinationElement);
  destinationElement.appendChild(documentFragment);
};

fillElements(GENERATE_QUANTITY, '#pin', '.map__pin', '.map__pins');

