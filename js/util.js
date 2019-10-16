'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var setDisabledStatusInputs = function (inputs, isDisabled) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].disabled = isDisabled;
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    setDisabledStatusInputs: setDisabledStatusInputs
  };
})();
