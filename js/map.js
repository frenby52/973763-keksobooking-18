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

  var isMapDisabled = function () {
    return map.classList.contains('map--faded');
  };

  var getPinCoords = function () {
    var pinCoords = {};
    pinCoords.x = Math.round(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_WIDTH / 2);
    pinCoords.y = isMapDisabled() ? Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT / 2) : Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT);

    return pinCoords;
  };

  var loadSuccessHandler = function (data) {
    addPinElements(data);
  };

  var loadErrorHandler = function (error) {
    var errorTemplateId = document.querySelector('#error');
    var errorTemplate = errorTemplateId.content.querySelector('.error');
    var main = document.querySelector('main');
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    errorMessage.textContent = error;
    main.appendChild(errorElement);
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    window.form.enable();
    window.form.fillAddress(getPinCoords());
    window.loadData(loadSuccessHandler, loadErrorHandler);
    // addPinElements(window.data);
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    window.form.disable();
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

  mapPinMain.addEventListener('mousedown', pinMainMoveMousedownHandler);

  var mapPinMainEnterPressHandler = function (evt) {
    window.util.isEnterEvent(evt, activateMap);
  };

  mapPinMain.addEventListener('keydown', mapPinMainEnterPressHandler);

  deactivateMap();
})();
