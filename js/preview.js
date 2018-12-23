'use strict';

(function () {
  var COMMENTS_SLICE = 5;
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

      clearComments();
      var photoItem = window.serverData[window.tools.extractNum(target.getAttribute('src')) - 1];
      insertComments(photoItem.comments, 0);

      var multiplier = Math.ceil((photoItem.comments.length - COMMENTS_SLICE) / COMMENTS_SLICE);
      var counter = 1;

      loadCommentsBtn.addEventListener('click', function () {
        if (counter <= multiplier) {
          //debugger;
          insertComments(photoItem.comments, counter * COMMENTS_SLICE);
          counter += 1;
        }
      });
    }
  };

  /**
    *отвечает за закрытие полноэкранного изображения по щелчку мыши
    @function
    @param {object} evt - объект события
  */
  var closeImageClick = function () {
    bigPicture.classList.add('hidden');
    loadCommentsBtn.classList.remove('visually-hidden');
  };

  /**
    *отвечает за закрытие полноэкранного изображения по щелчку мыши на оверлей
    @function
    @param {object} evt - объект события
  */
  var closeImageOverlayClick = function (evt) {
    if (evt.target.classList.contains('overlay')) {
      bigPicture.classList.add('hidden');
      loadCommentsBtn.classList.remove('visually-hidden');
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

  function clearComments() {
    currentCommentsList.innerHTML = '';
  }

  function insertComments(commentsList, initialComment) {
    for (var i = initialComment; i < initialComment + COMMENTS_SLICE; i++) {
      if (i > commentsList.length - 1) {
        loadCommentsBtn.classList.add('visually-hidden');
        commentsCounter(i, commentsList.length);
        return;
      }
      var commentItem = commentTemplate.cloneNode(true);
      commentItem.querySelector('.social__picture').src = commentsList[i].avatar;
      commentItem.querySelector('.social__text').textContent = commentsList[i].message;

      currentCommentsList.appendChild(commentItem);
    }

    commentsCounter(i, commentsList.length);
  }

  function commentsCounter(currentComment, commentsAmount) {
    //debugger;
    bigPicture.querySelector('.social__comment-count').innerHTML = currentComment + ' из <span class="comments-count">' + commentsAmount + '</span> комментариев';
  }

  var bigPicture = document.querySelector('.big-picture');
  var currentCommentsList = bigPicture.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
  var loadCommentsBtn = bigPicture.querySelector('.comments-loader');

  var imagesContainer = document.querySelector('.pictures');
  imagesContainer.addEventListener('click', openImageClick);

  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  bigPictureCancel.addEventListener('click', closeImageClick);
  bigPicture.addEventListener('click', closeImageOverlayClick);

  imagesContainer.addEventListener('keydown', imageHandlerKeydown);
})();
