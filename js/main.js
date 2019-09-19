'use strict';

var ELEMENTS_QUANTITY = 8;
var PIN_MIN_X = 0;
var PIN_MAX_X = 1200;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var PIN_GAP_X = 25;
var PIN_GAP_Y = 35;
var pinTemplateId = document.querySelector('#pin');
var mapPins = document.querySelector('.map__pins');

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
      x: randomInteger(PIN_MIN_X, PIN_MAX_X),
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

var activateMap = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

activateMap();

var dataAds = generateData(ELEMENTS_QUANTITY);

var addPinAttributes = function (data, element) {
  element.style = 'left: ' + (data.location.x - PIN_GAP_X) + 'px; top: ' + (data.location.y - PIN_GAP_Y) + 'px;';
  element.querySelector('img').src = data.author.avatar;
};

var createPin = function () {
  var template = pinTemplateId.content.querySelector('.map__pin');
  var element = template.cloneNode(true);

  return element;
};

var createPinElements = function (data) {
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    var element = createPin();
    addPinAttributes(data[i], element);
    documentFragment.appendChild(element);
  }

  return documentFragment;
};

var addPinElements = function (data) {
  var documentFragment = createPinElements(data);
  mapPins.appendChild(documentFragment);
};

addPinElements(dataAds);


