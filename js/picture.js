'use strict';

(function () {
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
    errorMessage = errorTemplate.cloneNode(true);

    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  window.downloading(successRender, errorRender);
})();
