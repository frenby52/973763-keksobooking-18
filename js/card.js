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

  var createCardElement = function (data) {
    var cardElement = cardTemplate.cloneNode(true);
    var featuresList = cardElement.querySelector('.popup__features');
    var photosList = cardElement.querySelector('.popup__photos');
    var title = cardElement.querySelector('.popup__title');
    var address = cardElement.querySelector('.popup__text--address');
    var price = cardElement.querySelector('.popup__text--price');
    var type = cardElement.querySelector('.popup__type');
    var capacity = cardElement.querySelector('.popup__text--capacity');
    var time = cardElement.querySelector('.popup__text--time');
    var description = cardElement.querySelector('.popup__description');
    var avatar = cardElement.querySelector('.popup__avatar');

    if (data.offer.title !== undefined) {
      title.textContent = data.offer.title;
    } else {
      title.remove();
    }

    if (data.offer.address !== undefined) {
      address.textContent = data.offer.address;
    } else {
      address.remove();
    }

    if (typeof data.offer.price === 'number') {
      price.textContent = data.offer.price + '₽/ночь';
    } else {
      price.remove();
    }

    if (data.offer.type !== undefined) {
      type.textContent = getOfferType(data);
    } else {
      type.remove();
    }

    if (typeof data.offer.rooms === 'number' && typeof data.offer.guests === 'number') {
      capacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    } else {
      capacity.remove();
    }

    if (data.offer.checkin !== undefined && data.offer.checkout !== undefined) {
      time.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    } else {
      time.remove();
    }

    if (data.offer.features !== undefined) {
      featuresList.innerHTML = '';
      featuresList.appendChild(createFeatures(data));
    } else {
      featuresList.remove();
    }

    if (data.offer.description !== undefined) {
      description.textContent = data.offer.description;
    } else {
      description.remove();
    }

    if (data.offer.photos !== undefined) {
      photosList.innerHTML = '';
      photosList.appendChild(createPhotos(data));
    } else {
      photosList.remove();
    }

    if (data.author.avatar !== undefined) {
      avatar.src = data.author.avatar;
    } else {
      avatar.remove();
    }

    return cardElement;
  };

  var createCard = function (data) {
    var cardElement = createCardElement(data);
    var popupClose = cardElement.querySelector('.popup__close');
    var closeCard = function () {
      cardElement.remove();
      document.removeEventListener('keydown', cardEscPressHandler);
    };

    var cardEscPressHandler = function (evt) {
      window.util.isEscEvent(evt, closeCard);
    };

    popupClose.addEventListener('click', function () {
      closeCard();
    });

    document.addEventListener('keydown', cardEscPressHandler);

    return {
      element: cardElement,
      close: closeCard
    };
  };

  window.card = {
    create: createCard
  };
})();
