'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
  }

  var getRandomArray = function (data) {
    var randomArray = [];
    var randomMin = randomInteger(0, data.length - 1);
    var randomMax = randomInteger(0, data.length - 1);
    if (randomMin === randomMax) {
      randomArray[0] = data[randomMin];
    } else {
      if (randomMin > randomMax) {
        var swap = randomMin;
        randomMin = randomMax;
        randomMax = swap;
      }
      var firstValue = randomMin;
      for (var i = 0; i <= randomMax - randomMin; i++) {
        randomArray[i] = data[firstValue];
        firstValue++;
      }
    }

    return randomArray;
  };

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
    randomInteger: randomInteger,
    getRandomArray: getRandomArray,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    setDisabledStatusInputs: setDisabledStatusInputs
  };
})();
