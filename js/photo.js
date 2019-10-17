'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarBlock = document.querySelector('.ad-form-header__upload');
  var avatarUpload = avatarBlock.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = avatarBlock.querySelector('.ad-form-header__preview img');
  var avatarLabel = avatarBlock.querySelector('.ad-form-header__drop-zone');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoUpload = photoContainer.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = photoContainer.querySelector('.ad-form__photo');
  var photosLabel = photoContainer.querySelector('.ad-form__drop-zone');
  var avatarPreviewDefaultSrc = avatarPreview.src;

  var showUploadMessage = function (label, message) {
    label.innerHTML = message;
  };

  var renderPictureUpload = function (file, cb, label) {
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          cb(reader);
          showUploadMessage(label, 'Загрузите или&nbsp;перетащите сюда фото');
        });

        reader.addEventListener('error', function () {
          showUploadMessage(label, 'Произошла ошибка загрузки');
        });

        reader.readAsDataURL(file);
      } else {
        showUploadMessage(label, 'Выберите другой формат&nbsp;файла');
      }
    }
  };

  var addPreviewElement = function (reader) {
    if (!photoPreview.innerHTML) {
      photoPreview.remove();
    }
    var previewBlock = document.createElement('div');
    var previewImage = document.createElement('img');
    previewBlock.classList.add('ad-form__photo');
    previewImage.style.width = '100%';
    previewImage.style.height = '100%';
    previewImage.src = reader.result;
    previewBlock.appendChild(previewImage);
    photoContainer.appendChild(previewBlock);
  };

  var setDefaultPics = function () {
    var photoPreviews = document.querySelectorAll('.ad-form__photo:not(.visually-hidden)');

    photoPreviews.forEach(function (photo) {
      photo.remove();
    });
    photoContainer.appendChild(photoPreview);
    avatarPreview.src = avatarPreviewDefaultSrc;
  };

  var addAvatarSrc = function (reader) {
    avatarPreview.src = reader.result;
  };

  var photoUploadChangeHandler = function () {
    renderPictureUpload(photoUpload.files[0], addPreviewElement, photosLabel);
  };

  var avatarUploadChangeHandler = function () {
    renderPictureUpload(avatarUpload.files[0], addAvatarSrc, avatarLabel);
  };

  photoUpload.addEventListener('change', photoUploadChangeHandler);
  avatarUpload.addEventListener('change', avatarUploadChangeHandler);

  window.photo = {
    setDefault: setDefaultPics
  };
})();
