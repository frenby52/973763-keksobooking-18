'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var price = document.querySelector('#price');
  var offerTypes = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var roomsToGuests = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var updateRoomsToGuestsHandler = function (evt) {
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

  var updateOfferTypeToPriceHandler = function (evt) {
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

  var updateTimeInHandler = function (evt) {
    timeIn.value = evt.target.value;
  };

  var updateTimeOutHandler = function (evt) {
    timeOut.value = evt.target.value;
  };

  roomNumber.addEventListener('change', updateRoomsToGuestsHandler);
  offerTypes.addEventListener('change', updateOfferTypeToPriceHandler);
  timeIn.addEventListener('change', updateTimeOutHandler);
  timeOut.addEventListener('change', updateTimeInHandler);
})();