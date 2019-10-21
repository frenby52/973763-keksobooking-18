'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var elements = [];

  var typeText = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var getOfferType = function (type) {
    return typeText[type];
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

  var getCardElementsData = function (data) {
    elements = [
      {
        isValid: data.offer.title,
        cb: function (elem) {
          elem.textContent = data.offer.title;
        },
        elem: '.popup__title'
      },
      {
        isValid: data.offer.address,
        cb: function (elem) {
          elem.textContent = data.offer.address;
        },
        elem: '.popup__text--address'
      },
      {
        isValid: data.offer.price,
        cb: function (elem) {
          elem.textContent = data.offer.price + '₽/ночь';
        },
        elem: '.popup__text--price'
      },
      {
        isValid: data.offer.type,
        cb: function (elem) {
          elem.textContent = getOfferType(data.offer.type);
        },
        elem: '.popup__type'
      },
      {
        isValid: typeof data.offer.rooms === 'number' && typeof data.offer.guests === 'number',
        cb: function (elem) {
          elem.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
        },
        elem: '.popup__text--capacity'
      },
      {
        isValid: data.offer.checkin && data.offer.checkout,
        cb: function (elem) {
          elem.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
        },
        elem: '.popup__text--time'
      },
      {
        isValid: data.offer.features,
        cb: function (elem) {
          elem.innerHTML = '';
          elem.appendChild(createFeatures(data));
        },
        elem: '.popup__features'
      },
      {
        isValid: data.offer.description,
        cb: function (elem) {
          elem.textContent = data.offer.description;
        },
        elem: '.popup__description'
      },
      {
        isValid: data.offer.photos,
        cb: function (elem) {
          elem.innerHTML = '';
          elem.appendChild(createPhotos(data));
        },
        elem: '.popup__photos'
      },
      {
        isValid: data.author.avatar,
        cb: function (elem) {
          elem.src = data.author.avatar;
        },
        elem: '.popup__avatar'
      },
    ];

    return elements;
  };

  var createCardElement = function (data) {
    var card = cardTemplate.cloneNode(true);
    var cardElementsData = getCardElementsData(data);
    cardElementsData.forEach(function (cardElementData) {
      var cardChild = card.querySelector(cardElementData.elem);
      if (cardElementData.isValid) {
        cardElementData.cb(cardChild);
      } else {
        cardChild.remove();
      }
    });

    return card;
  };

  var createCard = function (data, cb) {
    var cardElement = createCardElement(data);
    var popupClose = cardElement.querySelector('.popup__close');
    var closeCard = function () {
      cardElement.remove();
      document.removeEventListener('keydown', cardEscPressHandler);
      cb();
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

  window.createCard = createCard;
})();
