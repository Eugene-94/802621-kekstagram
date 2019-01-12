'use strict';

(function () {
  /**
    *Осуществляет рендер миниатюр и фильтры рендеринга при успешной загрузке данных с сервера
    @function
    @param {array} data - Массив данных, загруженных с сервера
  */
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

  /**
    *Отображает сообщение об ошибке при неудачной загрузке данных
    @function
    @param {node} errorMessage - шаблон сообщения
  */
  var errorRender = function (errorMessage) {
    var errorTemplate = document.querySelector('#error');
    errorMessage = errorTemplate.cloneNode(true);

    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

  /**
    *Осуществляет рендер миниатюр в поряде расположения в массиве с сервера
    @function
    @param {array} pictures - Массив данных, загруженных с сервера
  */
  function standartRender(pictures) {
    pictures.forEach(function (value, i) {
      var photoItem = photoTemplate.cloneNode(true);
      photoItem.querySelector('.picture__img').src = pictures[i].url;
      photoItem.querySelector('.picture__img').id = i;
      photoItem.querySelector('.picture__comments').textContent = pictures[i].comments.length;
      photoItem.querySelector('.picture__likes').textContent = pictures[i].likes;

      picturesContainer.appendChild(photoItem);
    });
  }

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  window.downloading(successRender, errorRender);
})();
