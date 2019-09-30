'use strict';

(function () {
  var cardTemplateId = document.querySelector('#card');
  var cardTemplate = cardTemplateId.content.querySelector('.popup');
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

  window.card = {
    createCard: createCard
  };
})();
