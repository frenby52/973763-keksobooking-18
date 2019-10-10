'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters-container');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var mapFiltersSelects = mapFilters.querySelectorAll('select');
  var featureInputs = housingFeatures.querySelectorAll('input');
  var QUANTITY_FILTER = 5;

  var disableFilters = function () {
    window.util.setDisabledStatusInputs(mapFiltersSelects, true);
    window.util.setDisabledStatusInputs(featureInputs, true);
  };

  var enableFilters = function () {
    window.util.setDisabledStatusInputs(mapFiltersSelects, false);
    window.util.setDisabledStatusInputs(featureInputs, false);
  };

  var getData = function (dataCopy) {
    var dataFiltered = getSameOfferTypeData(dataCopy);
    dataFiltered = getDataByOfferPrice(dataFiltered);
    dataFiltered = getDataByOfferRooms(dataFiltered);
    dataFiltered = getDataByOfferGuests(dataFiltered);
    dataFiltered = getDataByOfferFeature(dataFiltered, 0);
    dataFiltered = getDataByOfferFeature(dataFiltered, 1);
    dataFiltered = getDataByOfferFeature(dataFiltered, 2);
    dataFiltered = getDataByOfferFeature(dataFiltered, 3);
    dataFiltered = getDataByOfferFeature(dataFiltered, 4);
    dataFiltered = getDataByOfferFeature(dataFiltered, 5);

    return dataFiltered.slice(0, QUANTITY_FILTER);
  };

  var getSameOfferTypeData = function (data) {
    var dataByOfferType = data;
    if (housingType.value !== 'any') {
      dataByOfferType = data.filter(function (elem) {
        return elem.offer.type === housingType.value;
      });
    }

    return dataByOfferType;
  };

  var getDataByOfferPrice = function (data) {
    var dataByOfferPrice = data;
    if (housingPrice.value === 'low') {
      dataByOfferPrice = data.filter(function (elem) {
        return elem.offer.price < 10000;
      });
    }

    if (housingPrice.value === 'middle') {
      dataByOfferPrice = data.filter(function (elem) {
        return elem.offer.price >= 10000 && elem.offer.price < 50000;
      });
    }

    if (housingPrice.value === 'high') {
      dataByOfferPrice = data.filter(function (elem) {
        return elem.offer.price >= 50000;
      });
    }

    return dataByOfferPrice;
  };

  var getDataByOfferRooms = function (data) {
    var dataByOfferRooms = data;
    if (housingRooms.value !== 'any') {
      dataByOfferRooms = data.filter(function (elem) {
        return elem.offer.rooms === parseInt(housingRooms.value, 10);
      });
    }

    return dataByOfferRooms;
  };

  var getDataByOfferGuests = function (data) {
    var dataByOfferGuests = data;
    if (housingGuests.value !== 'any') {
      dataByOfferGuests = data.filter(function (elem) {
        return elem.offer.guests === parseInt(housingGuests.value, 10);
      });
    }

    return dataByOfferGuests;
  };

  var getDataByOfferFeature = function (data, i) {
    var dataByOfferFeatures = data;
    if (featureInputs[i].checked) {
      dataByOfferFeatures = data.filter(function (elem) {
        return elem.offer.features.indexOf(featureInputs[i].value) >= 0;
      });
    }

    return dataByOfferFeatures;
  };


  var filterChangeHandler = function () {
    window.map.updatePins();
  };

  var addFeaturesHandlers = function () {
    featureInputs.forEach(function (elem) {
      elem.addEventListener('change', filterChangeHandler);
    });
  };

  addFeaturesHandlers();
  housingType.addEventListener('change', filterChangeHandler);
  housingPrice.addEventListener('change', filterChangeHandler);
  housingRooms.addEventListener('change', filterChangeHandler);
  housingGuests.addEventListener('change', filterChangeHandler);

  window.filter = {
    getData: getData,
    disableFilters: disableFilters,
    enableFilters: enableFilters
  };

})();
