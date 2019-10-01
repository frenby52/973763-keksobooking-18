'use strict';

(function () {
  var ELEMENTS_QUANTITY = 8;
  var PIN_MIN_X = 0;
  var PIN_MAX_X = 1200;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var getPhotoUrls = function (index) {
    var photos = [];
    for (var i = 0; i < index; i++) {
      photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
    }

    return photos;
  };

  var PHOTOS = getPhotoUrls(3);

  var getAvatar = function (quantity) {
    var avatarArray = [];
    for (var i = 0; i < quantity; i++) {
      avatarArray[i] = 'img/avatars/user0' + (i + 1) + '.png';
    }

    return avatarArray;
  };

  var createAdInfo = function (avatar) {
    var adInfo = {
      author: {
        avatar: avatar
      },
      location: {
        x: window.util.randomInteger(PIN_MIN_X, PIN_MAX_X),
        y: window.util.randomInteger(PIN_MIN_Y, PIN_MAX_Y)
      },
      offer: {
        title: 'Заголовок',
        type: 'flat',
        features: window.util.getRandomArray(FEATURES),
        photos: window.util.getRandomArray(PHOTOS)
      }
    };

    return adInfo;
  };

  var generateData = function (quantity) {
    var avatars = getAvatar(quantity);
    var dataAds = [];
    for (var i = 0; i < quantity; i++) {
      dataAds[i] = createAdInfo(avatars[i]);
    }

    return dataAds;
  };

  var dataAds = generateData(ELEMENTS_QUANTITY);

  window.data = dataAds;
})();
