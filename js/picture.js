'use strict';

(function () {
  var successRender = function (data) {
    standartRender(data);
    var flitersForm = document.querySelector('.img-filters__form');
    var buttonPopular = flitersForm.querySelector('#filter-popular');
    var buttonNew = flitersForm.querySelector('#filter-new');
    var buttonDiscussed = flitersForm.querySelector('#filter-discussed');

    buttonDiscussed.addEventListener('click', function () {
      var photoItem = photoTemplate.cloneNode(true);
      var photos = picturesContainer.querySelectorAll('.picture');
      photos.forEach(function (value, index) {
        picturesContainer.removeChild(photos[index]);
      });

      window.serverData.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });

      window.serverData.forEach(function (value, index) {
        photoItem = photoTemplate.cloneNode(true);
        photoItem.querySelector('.picture__img').src = window.serverData[index].url;
        photoItem.querySelector('.picture__img').id = window.serverData[index].id;
        photoItem.querySelector('.picture__comments').textContent = window.serverData[index].comments.length;
        photoItem.querySelector('.picture__likes').textContent = window.serverData[index].likes;

        picturesContainer.appendChild(photoItem);
      });

      buttonDiscussed.classList.add('img-filters__button--active');
      buttonPopular.classList.remove('img-filters__button--active');
      buttonNew.classList.remove('img-filters__button--active');
    });

    buttonNew.addEventListener('click', function () {
      var photoItem = photoTemplate.cloneNode(true);
      var photos = picturesContainer.querySelectorAll('.picture');
      buttonNew.classList.add('img-filters__button--active');
      buttonPopular.classList.remove('img-filters__button--active');
      buttonDiscussed.classList.remove('img-filters__button--active');

      photos.forEach(function (value, index) {
        picturesContainer.removeChild(photos[index]);
      });

      window.tools.shuffle(window.serverData);

      for (var i = 0; i < 10; i++) {
        photoItem = photoTemplate.cloneNode(true);
        photoItem.querySelector('.picture__img').src = window.serverData[i].url;
        photoItem.querySelector('.picture__img').id = window.serverData[i].id;
        photoItem.querySelector('.picture__comments').textContent = window.serverData[i].comments.length;
        photoItem.querySelector('.picture__likes').textContent = window.serverData[i].likes;

        picturesContainer.appendChild(photoItem);
      }
    });

    buttonPopular.addEventListener('click', function () {
      var photos = picturesContainer.querySelectorAll('.picture');
      buttonPopular.classList.add('img-filters__button--active');
      buttonNew.classList.remove('img-filters__button--active');
      buttonDiscussed.classList.remove('img-filters__button--active');

      photos.forEach(function (value, index) {
        picturesContainer.removeChild(photos[index]);
      });

      standartRender(data);
    });
  };

  var errorRender = function (errorMessage) {
    var errorTemplate = document.querySelector('#error');
    errorMessage = errorTemplate.cloneNode(true);

    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

  function standartRender(dataArray) {
    for (var j = 0; j < dataArray.length; j++) {
      var photoItem = photoTemplate.cloneNode(true);
      photoItem.querySelector('.picture__img').src = dataArray[j].url;
      photoItem.querySelector('.picture__img').id = j;
      photoItem.querySelector('.picture__comments').textContent = dataArray[j].comments.length;
      photoItem.querySelector('.picture__likes').textContent = dataArray[j].likes;

      picturesContainer.appendChild(photoItem);
    }
  }

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  window.downloading(successRender, errorRender);
})();
