'use strict';

(function () {
  /**
    *генерирует набор фото миниатюр
    @function
    @param {object} destinationContainer - адрес размещения изображений
  */
  function insertPhotoMiniatures(destinationContainer) {
    for (var j = 0; j < window.photoList.length; j++) {
      var photoItem = photoTemplate.cloneNode(true);
      photoItem.querySelector('.picture__img').src = window.photoList[j].url;
      photoItem.querySelector('.picture__img').id = window.photoList[j].id;
      photoItem.querySelector('.picture__comments').textContent = window.photoList[j].comments.length;
      photoItem.querySelector('.picture__likes').textContent = window.photoList[j].likes;

      destinationContainer.appendChild(photoItem);
    }
  }

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  insertPhotoMiniatures(picturesContainer);
})();
