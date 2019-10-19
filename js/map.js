'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_TAIL_HEIGHT = 22;
  var PIN_MIN_X = 0;
  var PIN_MAX_X = 1200;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var card;
  var mapPinMainDefaultCoords = {
    x: mapPinMain.style.left,
    y: mapPinMain.style.top
  };

  var closeCard = function () {
    if (card) {
      card.close();
    }
  };

  var insertCard = function (data) {
    closeCard();
    card = window.createCard(data);
    map.insertBefore(card.element, mapFiltersContainer);
  };

  var createPinElements = function (data) {
    var documentFragment = document.createDocumentFragment();
    data.forEach(function (info) {
      var element = window.createPin(info, function () {
        insertCard(info);
      });
      documentFragment.appendChild(element);
    });

    return documentFragment;
  };

  var addPinElements = function (data) {
    var documentFragment = createPinElements(data);
    mapPins.appendChild(documentFragment);
  };

  var isMapDisabled = function () {
    return map.classList.contains('map--faded');
  };

  var getPinCoords = function () {
    var pinCoords = {};
    pinCoords.x = Math.round(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_WIDTH / 2);
    pinCoords.y = isMapDisabled() ? Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT / 2) : Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT);

    return pinCoords;
  };

  var removePins = function () {
    var mapPinsAdded = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPinsAdded.length; i++) {
      mapPinsAdded[i].remove();
    }
  };

  var updatePins = function (dataCopy) {
    removePins();
    closeCard();
    addPinElements(window.filter.getData(dataCopy));
  };

  var resetMapPinMainCoords = function () {
    mapPinMain.style.left = mapPinMainDefaultCoords.x;
    mapPinMain.style.top = mapPinMainDefaultCoords.y;
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
  };

  var deactivateMap = function () {
    var mapPinsAdded = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    removePins(mapPinsAdded);
    closeCard();
    map.classList.add('map--faded');
    resetMapPinMainCoords();
  };

  var mapPinMainMoveMousedownHandler = function (evt) {
    evt.preventDefault();
    if (isMapDisabled() && pinMainPressCallback) {
      pinMainPressCallback();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentY = mapPinMain.offsetTop - shift.y;
      var currentX = mapPinMain.offsetLeft - shift.x;

      if (currentY >= PIN_MIN_Y - MAIN_PIN_HEIGHT - MAIN_PIN_TAIL_HEIGHT && currentY <= PIN_MAX_Y - MAIN_PIN_HEIGHT - MAIN_PIN_TAIL_HEIGHT) {
        mapPinMain.style.top = currentY + 'px';
      }

      if (currentX >= PIN_MIN_X - MAIN_PIN_WIDTH / 2 && currentX <= PIN_MAX_X - MAIN_PIN_WIDTH / 2) {
        mapPinMain.style.left = currentX + 'px';
      }
      window.form.fillAddress(getPinCoords());
      if (pinMainMoveCallback) {
        pinMainMoveCallback();
      }
    };

    var mouseupHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mousemoveHandler);
      document.removeEventListener('mouseup', mouseupHandler);
    };

    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);
  };

  var pinMainPressCallback;
  var pinMainMoveCallback;

  var mapPinMainEnterPressHandler = function (evt) {
    if (pinMainPressCallback) {
      window.util.isEnterEvent(evt, pinMainPressCallback);
    }
  };

  mapPinMain.addEventListener('keydown', mapPinMainEnterPressHandler);
  mapPinMain.addEventListener('mousedown', mapPinMainMoveMousedownHandler);

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    getPinCoords: getPinCoords,
    updatePins: updatePins,
    setPinMainPressCallback: function (callback) {
      pinMainPressCallback = callback;
    },
    setPinMainMoveCallback: function (callback) {
      pinMainMoveCallback = callback;
    }
  };
})();
