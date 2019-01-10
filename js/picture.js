'use strict';

(function () {
  var successRender = function (data) {
    standartRender(data);
    var flitersForm = document.querySelector('.img-filters__form');
    var buttonPopular = flitersForm.querySelector('#filter-popular');
    var buttonNew = flitersForm.querySelector('#filter-new');
    var buttonDiscussed = flitersForm.querySelector('#filter-discussed');

    buttonDiscussed.addEventListener('click', function () {
      var photosData = data.slice(0);
      var photos = picturesContainer.querySelectorAll('.picture');
      photos.forEach(function (value, index) {
        picturesContainer.removeChild(photos[index]);
      });

      photosData.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });

      standartRender(photosData);

      buttonDiscussed.classList.add('img-filters__button--active');
      buttonPopular.classList.remove('img-filters__button--active');
      buttonNew.classList.remove('img-filters__button--active');
    });

    buttonNew.addEventListener('click', function () {
      var photosData = data.slice(0);
      var photos = picturesContainer.querySelectorAll('.picture');
      buttonNew.classList.add('img-filters__button--active');
      buttonPopular.classList.remove('img-filters__button--active');
      buttonDiscussed.classList.remove('img-filters__button--active');

      photos.forEach(function (value, index) {
        picturesContainer.removeChild(photos[index]);
      });

      standartRender(window.tools.shuffle(photosData));
    });

    buttonPopular.addEventListener('click', function () {
      var photos = picturesContainer.querySelectorAll('.picture');
      buttonPopular.classList.add('img-filters__button--active');
      buttonNew.classList.remove('img-filters__button--active');
      buttonDiscussed.classList.remove('img-filters__button--active');

      photos.forEach(function (value, index) {
        picturesContainer.removeChild(photos[index]);
      });

      var photosData = data.slice(0);
      standartRender(photosData);
    });
  };

  var errorRender = function (errorMessage) {
    var errorTemplate = document.querySelector('#error');
    errorMessage = errorTemplate.cloneNode(true);

    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

  function standartRender(dataArray) {
    dataArray.forEach(function (value, i) {
      var photoItem = photoTemplate.cloneNode(true);
      photoItem.querySelector('.picture__img').src = dataArray[i].url;
      photoItem.querySelector('.picture__img').id = i;
      photoItem.querySelector('.picture__comments').textContent = dataArray[i].comments.length;
      photoItem.querySelector('.picture__likes').textContent = dataArray[i].likes;

      picturesContainer.appendChild(photoItem);
    });
  }

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  window.downloading(successRender, errorRender);
})();
