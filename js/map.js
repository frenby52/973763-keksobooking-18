'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_TAIL_HEIGHT = 22;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var documentInputs = document.querySelectorAll('input');
  var documentSelects = document.querySelectorAll('select');
  var capacity = adForm.querySelector('#capacity');
  var addressInput = adForm.querySelector('#address');


  var isMapActive = function () {
    return map.classList.contains('map--faded');
  };

  var setDisabledStatusInputs = function (inputs, isDisabled) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].disabled = isDisabled;
    }
  };

  var getPinCoords = function () {
    var pinCoords = {};
    pinCoords.x = Math.round(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_WIDTH / 2);
    pinCoords.y = isMapActive() ? Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT / 2) : Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT);

    return pinCoords;
  };

  var fillAddress = function (coords) {
    addressInput.value = coords.x + ', ' + coords.y;
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setDisabledStatusInputs(documentInputs, false);
    setDisabledStatusInputs(documentSelects, false);
    setDisabledStatusInputs(capacity, true);
    fillAddress(getPinCoords());
    window.pin.addPinElements(window.data.dataAds);
  };

  var deactivateMap = function () {
    setDisabledStatusInputs(documentInputs, true);
    setDisabledStatusInputs(documentSelects, true);
    fillAddress(getPinCoords());
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
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
