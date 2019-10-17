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
  var mapFilters = document.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var card;
  var dataCopy = [];
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
    card = window.card.create(data);
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
      var element = window.pin.create(data[i]);
      addPinClickHandler(element, data[i]);
      documentFragment.appendChild(element);
    }

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

  var getValidData = function (data) {
    return data.filter(function (elem) {
      return elem.offer;
    });
  };

  var loadSuccessHandler = function (data) {
    dataCopy = getValidData(data);
    map.classList.remove('map--faded');
    window.form.enable();
    window.filter.enable();
    window.form.fillAddress(getPinCoords());
    updatePins();
  };

  var updatePins = function () {
    var mapPinsAdded = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    removePins(mapPinsAdded);
    closeCard();
    addPinElements(window.filter.getData(dataCopy));
  };

  var loadErrorHandler = function (error) {
    window.message.showError(error);
  };

  var removePins = function (pins) {
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var resetMapPinMainCoords = function () {
    mapPinMain.style.left = mapPinMainDefaultCoords.x;
    mapPinMain.style.top = mapPinMainDefaultCoords.y;
  };

  var formUploadSuccessHandler = function () {
    window.message.showSuccess();
    window.form.reset();
    deactivateMap();
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      window.backend.upload(new FormData(evt.target), formUploadSuccessHandler, loadErrorHandler);
    }
  };

  var activateMap = function () {
    window.backend.load(loadSuccessHandler, loadErrorHandler);
  };

  var deactivateMap = function () {
    var mapPinsAdded = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    removePins(mapPinsAdded);
    closeCard();
    map.classList.add('map--faded');
    window.form.disable();
    window.filter.disable();
    resetMapPinMainCoords();
    window.form.fillAddress(getPinCoords());
  };

  var pinMainMoveMousedownHandler = function (evt) {
    evt.preventDefault();
    if (isMapDisabled()) {
      activateMap();
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
    };

    var mouseupHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mousemoveHandler);
      document.removeEventListener('mouseup', mouseupHandler);
    };

    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);
  };

  var mapPinMainEnterPressHandler = function (evt) {
    window.util.isEnterEvent(evt, activateMap);
  };


  deactivateMap();
  window.form.setSubmit(formSubmitHandler);
  mapPinMain.addEventListener('mousedown', pinMainMoveMousedownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainEnterPressHandler);

  window.map = {
    updatePins: updatePins,
    deactivate: deactivateMap
  };
})();
