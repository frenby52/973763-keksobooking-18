'use strict';

var ELEMENTS_QUANTITY = 8;
var PIN_MIN_X = 0;
var PIN_MAX_X = 1200;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var PIN_GAP_X = 25;
var PIN_GAP_Y = 35;
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var pinTemplateId = document.querySelector('#pin');
var pinTemplate = pinTemplateId.content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var cardTemplateId = document.querySelector('#card');
var cardTemplate = cardTemplateId.content.querySelector('.popup');
var mapFilters = document.querySelector('.map__filters-container');

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
}

var getRandomArray = function (data) {
  var randomArray = [];
  var randomMin = randomInteger(0, data.length - 1);
  var randomMax = randomInteger(0, data.length - 1);
  if (randomMin === randomMax) {
    randomArray[0] = data[randomMin];
  } else {
    if (randomMin > randomMax) {
      var swap = randomMin;
      randomMin = randomMax;
      randomMax = swap;
    }
    var firstValue = randomMin;
    for (var i = 0; i <= randomMax - randomMin; i++) {
      randomArray[i] = data[firstValue];
      firstValue++;
    }
  }

  return randomArray;
};

var getPhotoUrls = function (index) {
  var photos = [];
  for (var i = 0; i < index; i++) {
    photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
  }

  return photos;
};

var PHOTOS = getPhotoUrls(3);

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
      features: getRandomArray(FEATURES),
      photos: getRandomArray(PHOTOS)
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

var createFeatures = function (data) {
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < data.offer.features.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', 'popup__feature--' + data.offer.features[i]);
    documentFragment.appendChild(featureElement);
  }

  return documentFragment;
};

var createPhotos = function (data) {
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < data.offer.photos.length; i++) {
    var photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.src = data.offer.photos[i];
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    documentFragment.appendChild(photoElement);
  }

  return documentFragment;
};

var createCard = function (data) {
  var cardElement = cardTemplate.cloneNode(true);
  var featuresList = cardElement.querySelector('.popup__features');
  var photosList = cardElement.querySelector('.popup__photos');
  cardElement.querySelector('.popup__title').textContent = data.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getOfferType(data);
  cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  featuresList.innerHTML = '';
  featuresList.appendChild(createFeatures(data));
  cardElement.querySelector('.popup__description').textContent = data.offer.description;
  photosList.innerHTML = '';
  photosList.appendChild(createPhotos(data));
  cardElement.querySelector('.popup__avatar').src = data.author.avatar;

  return cardElement;
};

var insertCard = function (data) {
  var cardElement = createCard(data);
  map.insertBefore(cardElement, mapFilters);
};

insertCard(dataAds[0]);
