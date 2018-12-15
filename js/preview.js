'use strict';

(function () {
  /**
    *отвечает за открытие полноэкранного изображения по щелчку мыши
    @function
    @param {object} evt - объект event
  */
  var openImageClick = function (evt) {
    var target = evt.target;

    if (target.classList.contains('picture__img')) {
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.big-picture__img img').src = target.getAttribute('src');
      bigPicture.querySelector('.social__caption').textContent = window.serverData[window.tools.extractNum(target.getAttribute('src')) - 1].description;
      bigPicture.querySelector('.likes-count').textContent = window.serverData[window.tools.extractNum(target.getAttribute('src')) - 1].likes;
      bigPicture.querySelector('.comments-count').textContent = window.serverData[window.tools.extractNum(target.getAttribute('src')) - 1].comments.length;

      insertComments(window.tools.extractNum(target.getAttribute('src')) - 1);
    }
  };

  /**
    *отвечает за закрытие полноэкранного изображения по щелчку мыши
    @function
    @param {object} evt - объект события
  */
  var closeImageClick = function () {
    bigPicture.classList.add('hidden');
  };

  /**
    *отвечает за закрытие полноэкранного изображения по щелчку мыши на оверлей
    @function
    @param {object} evt - объект события
  */
  var closeImageOverlayClick = function (evt) {
    if (evt.target.classList.contains('overlay')) {
      bigPicture.classList.add('hidden');
    }
  };

  /**
    *отвечает за открытие и закрытие полноэкранного изображения при навигации с клавиатуры
    @function
    @param {object} evt - объект event
  */
  var imageHandlerKeydown = function (evt) {
    var target = evt.target;

    if (evt.code === 'Enter') {
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.big-picture__img img').src = target.childNodes[1].getAttribute('src');
      bigPicture.querySelector('.likes-count').textContent = window.photoList[target.childNodes[1].id - 1].likes;
      bigPicture.querySelector('.comments-count').textContent = window.photoList[target.childNodes[1].id - 1].comments.length;

      insertComments(target.childNodes[1].id - 1);
    }

    if (evt.code === 'Escape') {
      bigPicture.classList.add('hidden');
    }
  };

  /**
    *генерирует набор комментариев для полноразмерного фото
    @function
    @param {number} ordinal - индекс массива, из которого берется информация
  */
  function insertComments(ordinal) {
    currentCommentsList.innerHTML = '';

    for (var i = 0; i < window.serverData[ordinal].comments.length; i++) {
      var commentItem = commentTemplate.cloneNode(true);
      commentItem.querySelector('.social__picture').src = window.serverData[ordinal].comments[i].avatar;
      commentItem.querySelector('.social__text').textContent = window.serverData[ordinal].comments[i].message;

      currentCommentsList.appendChild(commentItem);
    }
  }

  var bigPicture = document.querySelector('.big-picture');
  var currentCommentsList = bigPicture.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');

  bigPicture.querySelector('.social__caption').textContent = window.photoList[window.tools.getRandom(0, window.photoList.length - 1)].description;
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

  var imagesContainer = document.querySelector('.pictures');
  imagesContainer.addEventListener('click', openImageClick);

  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  bigPictureCancel.addEventListener('click', closeImageClick);
  bigPicture.addEventListener('click', closeImageOverlayClick);

  imagesContainer.addEventListener('keydown', imageHandlerKeydown);
})();
