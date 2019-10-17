'use strict';

(function () {
  var PIN_GAP_X = 25;
  var PIN_GAP_Y = 70;
  var pinTemplateId = document.querySelector('#pin');
  var pinTemplate = pinTemplateId.content.querySelector('.map__pin');

  var createPin = function (data) {
    var element = pinTemplate.cloneNode(true);
    element.style.left = data.location.x - PIN_GAP_X + 'px';
    element.style.top = data.location.y - PIN_GAP_Y + 'px';
    element.querySelector('img').src = data.author.avatar;
    element.querySelector('img').alt = data.offer.title;

    return element;
  };

  window.pin = {
    create: createPin
  };
})();
