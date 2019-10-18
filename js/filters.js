'use strict';

(function () {
  var QUANTITY_FILTER = 5;
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var housingType = mapFiltersContainer.querySelector('#housing-type');
  var housingPrice = mapFiltersContainer.querySelector('#housing-price');
  var housingRooms = mapFiltersContainer.querySelector('#housing-rooms');
  var housingGuests = mapFiltersContainer.querySelector('#housing-guests');
  var housingFeatures = mapFiltersContainer.querySelector('#housing-features');
  var mapFiltersSelects = mapFiltersContainer.querySelectorAll('select');
  var featureInputs = housingFeatures.querySelectorAll('input');

  var disableFilters = function () {
    window.util.setDisabledStatusInputs(mapFiltersSelects, true);
    window.util.setDisabledStatusInputs(featureInputs, true);
  };

  var enableFilters = function () {
    window.util.setDisabledStatusInputs(mapFiltersSelects, false);
    window.util.setDisabledStatusInputs(featureInputs, false);
  };

  var getData = function (dataCopy) {
    return dataCopy.filter(function (elem) {
      return getSameOfferTypeData(elem) && getDataByOfferPrice(elem) && getDataByOfferRooms(elem) && getDataByOfferGuests(elem) && getDataByOfferFeature(elem, 0) && getDataByOfferFeature(elem, 1) && getDataByOfferFeature(elem, 2) && getDataByOfferFeature(elem, 3) && getDataByOfferFeature(elem, 4) && getDataByOfferFeature(elem, 5);
    }).slice(0, QUANTITY_FILTER);
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

  var getDataByOfferFeature = function (elem, i) {
    var isFeatureChecked = true;
    if (featureInputs[i].checked) {
      isFeatureChecked = false;
      return elem.offer.features.indexOf(featureInputs[i].value) >= 0;
    }
    return isFeatureChecked;
  };

  window.filter = {
    getData: getData,
    disable: disableFilters,
    enable: enableFilters
  };
})();
