'use strict';

(function () {

  var dataCopy = [];

  var activatePage = function () {
    window.backend.load(loadSuccessHandler, loadErrorHandler);
  };

  var deactivatePage = function () {
    window.map.deactivate();
    window.form.disable();
    window.filter.disable();
    window.form.fillAddress(window.map.getPinCoords());
  };

  var loadSuccessHandler = function (data) {
    dataCopy = window.filter.getValidData(data);
    window.map.activate();
    window.form.enable();
    window.filter.enable();
    window.form.fillAddress(window.map.getPinCoords());
    window.map.updatePins(dataCopy);
  };

  var loadErrorHandler = function (error) {
    window.message.showError(error);
  };

  var formUploadSuccessHandler = function () {
    window.message.showSuccess();
    window.photo.setDefault();
    deactivatePage();
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      window.backend.upload(new FormData(evt.target), formUploadSuccessHandler, loadErrorHandler);
    }
  };

  var formResetClickHandler = function () {
    window.photo.setDefault();
    deactivatePage();
  };

  var filterChangeHandler = window.debounce(function () {
    window.map.updatePins(dataCopy);
  });

  deactivatePage();
  window.form.setSubmit(formSubmitHandler);
  window.form.setReset(formResetClickHandler);
  window.map.setMainPinEnterPressHandler(function (evt) {
    window.util.isEnterEvent(evt, activatePage);
  });

  window.map.setMapPinMainMoveMousedownHandler(function (evt) {
    window.map.mapPinMainMoveMousedownHandler(evt, activatePage);
  });

  window.filter.setFilterChangeHandler(filterChangeHandler);
})();
