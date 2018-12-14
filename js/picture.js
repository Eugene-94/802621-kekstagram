'use strict';

(function () {
  /**
    *генерирует набор фото миниатюр
    @function
    @param {object} destinationContainer - адрес размещения изображений
  */
  /*function insertPhotoMiniatures(destinationContainer) {
    for (var j = 0; j < window.photoList.length; j++) {
      var photoItem = photoTemplate.cloneNode(true);
      photoItem.querySelector('.picture__img').src = window.photoList[j].url;
      photoItem.querySelector('.picture__img').id = window.photoList[j].id;
      photoItem.querySelector('.picture__comments').textContent = window.photoList[j].comments.length;
      photoItem.querySelector('.picture__likes').textContent = window.photoList[j].likes;

      destinationContainer.appendChild(photoItem);
    }
  }*/

  var successRender = function (data) {
    for (var j = 0; j < data.length; j++) {
      var photoItem = photoTemplate.cloneNode(true);
      photoItem.querySelector('.picture__img').src = data[j].url;
      photoItem.querySelector('.picture__img').id = data[j].id;
      photoItem.querySelector('.picture__comments').textContent = data[j].comments.length;
      photoItem.querySelector('.picture__likes').textContent = data[j].likes;

      picturesContainer.appendChild(photoItem);
    }
  };

  var errorRender = function (errorMessage) {
    var errorTemplate = document.querySelector('#error');
    var errorMessage = errorTemplate.cloneNode(true);

    //node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  window.downloading(successRender, errorRender);
})();
