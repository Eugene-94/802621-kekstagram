'use strict';

(function () {
  var COMMENTS_SLICE = 5;

  var Image = function () {
    this.open = function () {
      bigPicture.classList.remove('hidden');
    };

    this.close = function () {
      bigPicture.classList.add('hidden');
      loadCommentsBtn.classList.remove('visually-hidden');
      this.clearComments();
    };

    this.render = function (orderNumber) {
      bigPicture.querySelector('.big-picture__img img').src = 'photos/' + orderNumber + '.jpg';
      bigPicture.querySelector('.social__caption').textContent = window.serverData[orderNumber - 1].description;
      bigPicture.querySelector('.likes-count').textContent = window.serverData[orderNumber - 1].likes;
      bigPicture.querySelector('.comments-count').textContent = window.serverData[orderNumber - 1].comments.length;
    };

    this.renderComments = function (orderNumber) {
      this.clearComments();
      this.insertComments(window.serverData[orderNumber - 1].comments, 0);
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
        commentItem.querySelector('.social__picture').src = commentsList[i].avatar;
        commentItem.querySelector('.social__text').textContent = commentsList[i].message;

        currentCommentsList.appendChild(commentItem);
      }

      this.commentsCounter(i, commentsList.length);
    };

    this.clearComments = function () {
      currentCommentsList.innerHTML = '';
    };

    this.commentsCounter = function (currentComment, commentsAmount) {
      bigPicture.querySelector('.social__comment-count').innerHTML = currentComment + ' из <span class="comments-count">' + commentsAmount + '</span> комментариев';
    };
  };

  var bigPicture = document.querySelector('.big-picture');
  var currentCommentsList = bigPicture.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
  var loadCommentsBtn = bigPicture.querySelector('.comments-loader');

  var imagesContainer = document.querySelector('.pictures');
  imagesContainer.addEventListener('click', function (evt) {
    var orderNumber = window.tools.extractNum(evt.target.getAttribute('src'));
    var image = new Image();
    image.open();
    image.render(orderNumber);
    image.renderComments(orderNumber);

    var counter = 1;
    loadCommentsBtn.addEventListener('click', function () {
      var multiplier = Math.ceil((window.serverData[orderNumber - 1].comments.length - COMMENTS_SLICE) / COMMENTS_SLICE);

      if (counter <= multiplier) {
        image.insertComments(window.serverData[orderNumber - 1].comments, counter * COMMENTS_SLICE);
        counter += 1;
      }
    });
  });

  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  bigPictureCancel.addEventListener('click', function () {
    var image = new Image();
    image.close();
  });

  bigPicture.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('overlay')) {
      bigPicture.classList.add('hidden');
      loadCommentsBtn.classList.remove('visually-hidden');
    }
  });

  bigPicture.addEventListener('keydown', function (evt) {
    if (evt.code === 'Escape') {
      var image = new Image();
      image.close();
    }
  });

  imagesContainer.addEventListener('keydown', function (evt) {
    if (evt.code === 'Enter') {
      var orderNumber = window.tools.extractNum(evt.target.querySelector('.picture__img').getAttribute('src'));
      var image = new Image();
      image.open();
      image.render(orderNumber);
      image.renderComments(orderNumber);
    }

    if (evt.code === 'Escape') {
      image = new Image();
      image.close();
    }
  });
})();
