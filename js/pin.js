'use strict';

(function () {
  var PIN_GAP_X = 25;
  var PIN_GAP_Y = 35;
  var mapPins = document.querySelector('.map__pins');
  var pinTemplateId = document.querySelector('#pin');
  var pinTemplate = pinTemplateId.content.querySelector('.map__pin');

  var createPin = function (data) {
    var element = pinTemplate.cloneNode(true);
    element.style.left = data.location.x - PIN_GAP_X + 'px';
    element.style.top = data.location.y - PIN_GAP_Y + 'px';
    element.querySelector('img').src = data.author.avatar;
    element.querySelector('img').alt = data.offer.title;
    addPinClickHandler(element, data);

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

  var addPinClickHandler = function (pin, dataAd) {
    pin.addEventListener('click', function () {
      window.card.insertCard(dataAd);
    });
  };

  window.pin = {
    addPinElements: addPinElements
  };
})();
