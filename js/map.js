'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_TAIL_HEIGHT = 22;
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var card;

  var insertCard = function (data) {
    if (card) {
      card.close();
    }
    card = window.card.createCard(data);
    map.insertBefore(card.element, mapFilters);
  };

  var addPinClickHandler = function (pin, data) {
    pin.addEventListener('click', function () {
      insertCard(data);
    });
  };

  var createPinElements = function (data) {
    var documentFragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var element = window.pin.createPin(data[i]);
      addPinClickHandler(element, data[i]);
      documentFragment.appendChild(element);
    }

    return documentFragment;
  };

  var addPinElements = function (data) {
    var documentFragment = createPinElements(data);
    mapPins.appendChild(documentFragment);
  };

  var isMapActive = function () {
    return map.classList.contains('map--faded');
  };

  var getPinCoords = function () {
    var pinCoords = {};
    pinCoords.x = Math.round(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_WIDTH / 2);
    pinCoords.y = isMapActive() ? Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT / 2) : Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT);

    return pinCoords;
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    window.form.enable();
    window.form.fillAddress(getPinCoords());
    addPinElements(window.data);
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    window.form.disable();
    window.form.fillAddress(getPinCoords());
  };

  mapPinMain.addEventListener('mousedown', function () {
    activateMap();
  });

  var mapPinMainEnterPressHandler = function (evt) {
    window.util.isEnterEvent(evt, activateMap);
  };

  mapPinMain.addEventListener('keydown', mapPinMainEnterPressHandler);

  deactivateMap();
})();
