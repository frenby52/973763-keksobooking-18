'use strict';

var ELEMENTS_QUANTITY = 8;
var PIN_MIN_X = 0;
var PIN_MAX_X = 1200;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var PIN_GAP_X = 25;
var PIN_GAP_Y = 35;
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinTemplateId = document.querySelector('#pin');
var pinTemplate = pinTemplateId.content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var cardTemplateId = document.querySelector('#card');
var cardTemplate = cardTemplateId.content.querySelector('.popup');
var photoTemplate = cardTemplateId.content.querySelector('.popup__photo');
var mapFilters = document.querySelector('.map__filters-container');

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
    },
    offer: {
      title: 'Заголовок',
      type: 'flat',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
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
  map.classList.remove('map--faded');
};

activateMap();

var dataAds = generateData(ELEMENTS_QUANTITY);

var createPin = function (data) {
  var element = pinTemplate.cloneNode(true);
  element.style.left = data.location.x - PIN_GAP_X + 'px';
  element.style.top = data.location.y - PIN_GAP_Y + 'px';
  element.querySelector('img').src = data.author.avatar;
  element.querySelector('img').alt = data.offer.title;

  return element;
};

var createPinElements = function (data) {
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    var element = createPin(data[i]);
    documentFragment.appendChild(element);
  }

  return documentFragment;
};

var addPinElements = function (data) {
  var documentFragment = createPinElements(data);
  mapPins.appendChild(documentFragment);
};

addPinElements(dataAds);

// 2 task


var getOfferType = function (data) {
  var textContent = '';
  if (data.offer.type === 'flat') {
    textContent = 'Квартира';
  } else if (data.offer.type === 'bungalo') {
    textContent = 'Бунгало';
  } else if (data.offer.type === 'house') {
    textContent = 'Дом';
  } else if (data.offer.type === 'palace') {
    textContent = 'Дворец';
  }

  return textContent;
};

var removeUnusedFeatures = function (data, cardElement) {
  for (var i = 0; i < FEATURES.length; i++) {
    var index = data.offer.features.indexOf(FEATURES[i]);
    if (index < 0) {
      var unusedFeature = cardElement.querySelector('.' + 'popup__feature--' + FEATURES[i]);
      unusedFeature.classList.remove('popup__feature');
    }
  }
};

var createPhotosList = function (data, cardElement) {
  var popupPhotos = cardElement.querySelector('.popup__photos');
  for (var i = 0; i < PHOTOS.length; i++) {
    var index = data.offer.photos.indexOf(PHOTOS[i]);
    var photoElement = photoTemplate.cloneNode(true);
    popupPhotos.removeChild(popupPhotos.firstChild);
    if (index >= 0) {
      photoElement.src = PHOTOS[i];
      popupPhotos.appendChild(photoElement);
    }
  }
};

var createCard = function (data) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = data.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getOfferType(data);
  cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  removeUnusedFeatures(data, cardElement);
  cardElement.querySelector('.popup__description').textContent = data.offer.description;
  createPhotosList(data, cardElement);
  cardElement.querySelector('.popup__avatar').src = data.author.avatar;

  return cardElement;
};

var insertCard = function (data) {
  var cardElement = createCard(data);
  map.insertBefore(cardElement, mapFilters);
};

insertCard(dataAds[0]);
