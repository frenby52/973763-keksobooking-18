'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var documentInputs = document.querySelectorAll('input');
  var documentSelects = document.querySelectorAll('select');
  var addressInput = adForm.querySelector('#address');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var price = document.querySelector('#price');
  var offerTypes = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');

  var roomsToGuests = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var disable = function () {
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    window.util.setDisabledStatusInputs(documentInputs, true);
    window.util.setDisabledStatusInputs(documentSelects, true);
    adFormSubmitButton.disabled = true;
    adFormResetButton.disabled = true;
  };

  var enable = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.setDisabledStatusInputs(documentInputs, false);
    window.util.setDisabledStatusInputs(documentSelects, false);
    window.util.setDisabledStatusInputs(capacity, true);
    capacity.querySelector('option[selected]').disabled = false;
    adFormSubmitButton.disabled = false;
    adFormResetButton.disabled = false;
  };

  var fillAddress = function (coords) {
    addressInput.value = coords.x + ', ' + coords.y;
  };

  var roomNumberChangeHandler = function (evt) {
    var roomsNumber = evt.target.value;
    var guestsNumberAvailable = roomsToGuests[roomsNumber];
    for (var i = 0; i < capacity.options.length; i++) {
      capacity.options[i].disabled = false;
      var idx = guestsNumberAvailable.indexOf(capacity.options[i].value);
      if (idx === -1) {
        capacity.options[i].disabled = true;
      } else {
        capacity.value = capacity.options[i].value;
      }
    }
  };

  var offerTypesChangeHandler = function (evt) {
    var offerType = evt.target.value;
    if (offerType === 'bungalo') {
      price.min = 0;
      price.placeholder = '0';
    } else if (offerType === 'flat') {
      price.min = 1000;
      price.placeholder = '1000';
    } else if (offerType === 'house') {
      price.min = 5000;
      price.placeholder = '5000';
    } else if (offerType === 'palace') {
      price.min = 10000;
      price.placeholder = '10000';
    }
  };

  var timeOutChangeHandler = function (evt) {
    timeIn.value = evt.target.value;
  };

  var timeInChangeHandler = function (evt) {
    timeOut.value = evt.target.value;
  };

  var setSubmit = function (formSubmitHandler) {
    adForm.addEventListener('submit', formSubmitHandler);
  };

  var setReset = function (formResetClickHandler) {
    adFormResetButton.addEventListener('click', formResetClickHandler);
  };

  roomNumber.addEventListener('change', roomNumberChangeHandler);
  offerTypes.addEventListener('change', offerTypesChangeHandler);
  timeIn.addEventListener('change', timeInChangeHandler);
  timeOut.addEventListener('change', timeOutChangeHandler);

  window.form = {
    fillAddress: fillAddress,
    disable: disable,
    enable: enable,
    setSubmit: setSubmit,
    setReset: setReset
  };
})();
