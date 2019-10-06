'use strict';

(function () {
  var showError = function (error) {
    var errorTemplateId = document.querySelector('#error');
    var errorTemplate = errorTemplateId.content.querySelector('.error');
    var main = document.querySelector('main');
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    errorMessage.textContent = error;
    main.appendChild(errorElement);
  };

  window.message = {
    showError: showError
    // showSuccess: showSuccess
  };
})();

