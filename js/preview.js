'use strict';

(function () {
  var COMMENTS_SLICE = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var bigImage = bigPicture.querySelector('.big-picture__img img');
  var imageDescription = bigPicture.querySelector('.social__caption');
  var imageLikesAmount = bigPicture.querySelector('.likes-count');
  var imageCommentsAmount = bigPicture.querySelector('.comments-count');

  var commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');

  /**
    *Функция конструктор для взаимодействия с полноразмерными фото
    @function
    @constructor
  */
  var Image = function () {
    this.state = 1;

    this.open = function () {
      bigPicture.classList.remove('hidden');
    };

    this.close = function () {
      bigPicture.classList.add('hidden');
      loadCommentsBtn.classList.remove('visually-hidden');

      currentCommentsList.innerHTML = '';
    };

    this.render = function (orderNumber) {
      bigImage.src = 'photos/' + (orderNumber + 1) + '.jpg';
      imageDescription.textContent = window.serverData[orderNumber].description;
      imageLikesAmount.textContent = window.serverData[orderNumber].likes;
      imageCommentsAmount.textContent = window.serverData[orderNumber].comments.length;
    };

    this.renderComments = function (orderNumber) {
      currentCommentsList.innerHTML = '';
      this.insertComments(window.serverData[orderNumber].comments, 0);
    };

    this.insertComments = function (commentsList, initialComment) {
      for (var i = initialComment; i < initialComment + COMMENTS_SLICE; i++) {
        if (i > commentsList.length - 1) {
          loadCommentsBtn.classList.add('visually-hidden');
          this.commentsCounter(i, commentsList.length);
          return;
        }

        if (i === commentsList.length - 1) {
          loadCommentsBtn.classList.add('visually-hidden');
        }

        var commentItem = commentTemplate.cloneNode(true);
        var userAvatar = commentItem.querySelector('.social__picture');
        var userComment = commentItem.querySelector('.social__text');
        userAvatar.src = commentsList[i].avatar;
        userComment.textContent = commentsList[i].message;

        currentCommentsList.appendChild(commentItem);
      }

      this.commentsCounter(i, commentsList.length);
    };

    this.commentsCounter = function (currentComment, commentsAmount) {
      bigPicture.querySelector('.social__comment-count').childNodes[0].textContent = currentComment + ' из ';
      bigPicture.querySelector('.comments-count').textContent = commentsAmount;
    };
  };

  /**
    *Предназначена для открытия большого фото при клике по миниатюре
    @function
    @param {number} order - Порядковый номер изображения
  */
  function openImage(order) {
    var image = new Image();
    image.open();
    image.render(order);
    image.renderComments(order);

    window.loadComments = function () {
      var multiplier = Math.ceil((window.serverData[order].comments.length - COMMENTS_SLICE) / COMMENTS_SLICE);

      if (image.state <= multiplier) {
        image.insertComments(window.serverData[order].comments, image.state * COMMENTS_SLICE);
        image.state += 1;
      }
    };
  }

  /**
    *Предназначена для закрытия большого фото
    @function
  */
  function closeImage() {
    var image = new Image();
    image.close();
  }

  var currentCommentsList = bigPicture.querySelector('.social__comments');
  var loadCommentsBtn = bigPicture.querySelector('.comments-loader');

  var imagesContainer = document.querySelector('.pictures');
  imagesContainer.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      var orderNumber = window.tools.extractNum(evt.target.getAttribute('src')) - 1;
      openImage(orderNumber);

      loadCommentsBtn.addEventListener('click', window.loadComments);
    }
  });

  bigPictureCancel.addEventListener('click', function () {
    closeImage();

    loadCommentsBtn.removeEventListener('click', window.loadComments);
  });

  bigPicture.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('overlay')) {
      bigPicture.classList.add('hidden');
      loadCommentsBtn.classList.remove('visually-hidden');
    }
  });

  bigPicture.addEventListener('keydown', function (evt) {
    if (evt.code === 'Escape') {
      closeImage();

      loadCommentsBtn.removeEventListener('click', window.loadComments);
    }
  });

  imagesContainer.addEventListener('keydown', function (evt) {
    if (evt.code === 'Enter') {
      var orderNumber = window.tools.extractNum(evt.target.querySelector('.picture__img').getAttribute('src'));
      openImage(orderNumber);

      loadCommentsBtn.addEventListener('click', window.loadComments);
    }

    if (evt.code === 'Escape') {
      closeImage();
    }
  });
})();
