'use strict';

(function () {
  var main = document.querySelector('main');

  var showError = function (error) {
    var errorTemplateId = document.querySelector('#error');
    var errorTemplate = errorTemplateId.content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    // var errorButton = errorElement.querySelector('.error__button');
    var errorMessage = errorElement.querySelector('.error__message');
    errorMessage.innerHTML = errorMessage.textContent + '<br>' + error;

    var closeErrorMessage = function () {
      errorElement.remove();
      document.removeEventListener('keydown', errorMessageEscPressHandler);
    };

    // errorButton.addEventListener('click', function () {
    //   closeErrorMessage();
    // });

    errorElement.addEventListener('click', function () {
      closeErrorMessage();
    });

    var errorMessageEscPressHandler = function (evt) {
      window.util.isEscEvent(evt, closeErrorMessage);
    };

    document.addEventListener('keydown', errorMessageEscPressHandler);
    main.appendChild(errorElement);
  };

  var showSuccess = function () {
    var successTemplateId = document.querySelector('#success');
    var successTemplate = successTemplateId.content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);

    var closeSuccessMessage = function () {
      successMessage.remove();
      document.removeEventListener('keydown', successMessageEscPressHandler);
    };

    successMessage.addEventListener('click', function () {
      closeSuccessMessage();
    });

    var successMessageEscPressHandler = function (evt) {
      window.util.isEscEvent(evt, closeSuccessMessage);
    };

    document.addEventListener('keydown', successMessageEscPressHandler);
    main.appendChild(successMessage);
  };

  window.message = {
    showError: showError,
    showSuccess: showSuccess
  };
})();

