'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var showError = function (error) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    errorMessage.innerHTML = errorMessage.textContent + '<br>' + error;

    var closeErrorMessage = function () {
      errorElement.remove();
      document.removeEventListener('keydown', errorMessageEscPressHandler);
    };

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

