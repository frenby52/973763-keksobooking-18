'use strict';

(function () {
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
    window.map.activate();
    window.form.enable();
    window.filter.enable();
    window.filter.setFilterChangeCallback(data, function (filteredData) {
      window.map.updatePins(filteredData);
    });
    window.form.fillAddress(window.map.getPinCoords());
  };

  var loadErrorHandler = function (error) {
    window.message.showError(error);
  };

  var formUploadSuccessHandler = function () {
    window.message.showSuccess();
    window.resetPics();
    deactivatePage();
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      window.backend.upload(new FormData(evt.target), formUploadSuccessHandler, loadErrorHandler);
    }
  };

  var formResetClickHandler = function () {
    window.resetPics();
    deactivatePage();
  };

  deactivatePage();
  window.form.setSubmit(formSubmitHandler);
  window.form.setReset(formResetClickHandler);
  window.map.setPinMainPressCallback(activatePage);
  window.map.setPinMainMoveCallback(function () {
    window.form.fillAddress(window.map.getPinCoords());
  });
})();
