'use strict';

(function () {
  var QUANTITY_FILTER = 5;
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapFilter = mapFiltersContainer.querySelector('.map__filters');
  var housingType = mapFiltersContainer.querySelector('#housing-type');
  var housingPrice = mapFiltersContainer.querySelector('#housing-price');
  var housingRooms = mapFiltersContainer.querySelector('#housing-rooms');
  var housingGuests = mapFiltersContainer.querySelector('#housing-guests');
  var housingFeatures = mapFiltersContainer.querySelector('#housing-features');
  var mapFiltersSelects = mapFiltersContainer.querySelectorAll('select');
  var featureInputs = Array.from(housingFeatures.querySelectorAll('input'));
  var changeFilterCallback;

  var disableFilters = function () {
    mapFilter.reset();
    window.util.setDisabledStatusInputs(mapFiltersSelects, true);
    window.util.setDisabledStatusInputs(featureInputs, true);
  };

  var enableFilters = function () {
    window.util.setDisabledStatusInputs(mapFiltersSelects, false);
    window.util.setDisabledStatusInputs(featureInputs, false);
  };

  var getData = function (data) {
    var selectedFeatures = featureInputs.filter(function (input) {
      return input.checked;
    })
      .map(function (input) {
        return input.value;
      });
    return data.filter(function (elem) {
      return getSameOfferTypeData(elem) && getDataByOfferPrice(elem) && getDataByOfferRooms(elem) && getDataByOfferGuests(elem) && getDataByOfferFeature(elem, selectedFeatures);
    }).slice(0, QUANTITY_FILTER);
  };

  var getDataByOfferFeature = function (elem, selectedFeatures) {
    if (!selectedFeatures.length) {
      return true;
    }
    return selectedFeatures.every(function (feature) {
      return elem.offer.features.includes(feature);
    });
  };

  var getSameOfferTypeData = function (elem) {
    return housingType.value === 'any' || elem.offer.type === housingType.value;
  };

  var getDataByOfferPrice = function (elem) {
    if (housingPrice.value === 'low') {
      return elem.offer.price < 10000;
    }

    if (housingPrice.value === 'middle') {
      return elem.offer.price >= 10000 && elem.offer.price < 50000;
    }

    if (housingPrice.value === 'high') {
      return elem.offer.price >= 50000;
    }

    return housingRooms.value === 'any';
  };

  var getDataByOfferRooms = function (elem) {
    return housingRooms.value === 'any' || elem.offer.rooms === parseInt(housingRooms.value, 10);
  };

  var getDataByOfferGuests = function (elem) {
    return housingGuests.value === 'any' || elem.offer.guests === parseInt(housingGuests.value, 10);
  };

  var getValidData = function (data) {
    return data.filter(function (elem) {
      return elem.offer;
    });
  };

  var setFilterChangeCallback = function (data, callback) {
    changeFilterCallback = window.debounce(function () {
      var filteredData = getValidData(getData(data));
      callback(filteredData);
    });
    changeFilterCallback();
  };

  mapFilter.addEventListener('change', function () {
    changeFilterCallback();
  });

  window.filter = {
    getData: getData,
    disable: disableFilters,
    enable: enableFilters,
    getValidData: getValidData,
    setFilterChangeCallback: setFilterChangeCallback
  };
})();
