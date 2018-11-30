'use strict';

var OBJECTS_QUANTITY = 25;

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var description = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

/**
  *Возвращает целое случайное число в диапазоне [min max]
  @function
  @param {number} min - Нижний предел диапазона
  @param {number} max - Верхний предел диапазона
  @return {number} - Сгенерированное целое число
*/
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
  *генерирует массив с одним или двумя комментариями
  @function
  @param {array} commentsArray - исходный массив, включающий в себя все доступные комментарии
  @return {array} commentsList - сгениророванный функцией массив, содеражщий 1 или 2 случайных комментария
*/
function generateComments(commentsArray) {
  var commentsList = [];
  var commentsAmount = getRandom(1, 2);

  do {
    commentsList.push(commentsArray[getRandom(0, commentsArray.length - 1)]);
  } while (commentsList.length === commentsAmount);

  return commentsList;
}

/**
  *генерирует строку, содержащую описание фото
  @function
  @param {array} descriptionArray - исходный массив, включающий в себя все доступные варианты описаний
  @return {string} - случайно выбранная строка из переданного массива
*/
function generateDescription(descriptionArray) {
  return descriptionArray[getRandom(0, descriptionArray.length - 1)];
}

/**
  *генерирует случайное количество лайков для фотографии в отрезке [15 200]
  @function
  @return {number} - случайное число из указанного диапазона
*/
function getLikesAmount() {
  return getRandom(15, 200);
}

/**
  *создает объект фотокарточки
  @function
  @param {number} ordinal - параметр, определяющий адрес изображения
  @return {object} - сгенерированный объект
*/
function getObject(ordinal) {
  return {
    url: 'photos/' + ordinal + '.jpg',
    likes: getLikesAmount(),
    comments: generateComments(comments),
    description: generateDescription(description)
  };
}

/**
  *генерирует массив объектов фотокарточек
  @function
  @param {number} objectsAmount - параметр, определяющий количество создаваемых объектов
  @return {array} objectsList - сгенерированный массив объектов
*/
function generateObjectsArray(objectsAmount) {
  var objectsList = [];

  for (var i = 1; i <= objectsAmount; i++) {
    var objectItem = getObject(i);
    objectsList.push(objectItem);
  }

  return objectsList;
}

/**
  *генерирует набор фото миниатюр
  @function
  @param {object} destinationContainer - адрес размещения изображений
*/
function insertPhotoMiniatures(destinationContainer) {
  for (var j = 0; j < photoList.length; j++) {
    var photoItem = photoTemplate.cloneNode(true);
    photoItem.querySelector('.picture__img').src = photoList[j].url;
    photoItem.querySelector('.picture__comments').textContent = photoList[j].comments.length;
    photoItem.querySelector('.picture__likes').textContent = photoList[j].likes;

    destinationContainer.appendChild(photoItem);
  }
}

/**
  *генерирует набор комментариев для полноразмерного фото
  @function
  @param {object} destinationContainer - адрес размещения комментариев
*/
function insertComments(destinationContainer) {
  for (var i = 0; i < photoList[0].comments.length; i++) {
    var commentItem = commentTemplate.cloneNode(true);
    commentItem.querySelector('.social__picture').src = 'img/avatar-' + getRandom(1, 6) + '.svg';
    commentItem.querySelector('.social__text').textContent = photoList[0].comments[i];

    destinationContainer.appendChild(commentItem);
  }
}

var photoList = generateObjectsArray(OBJECTS_QUANTITY);

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');

insertPhotoMiniatures(picturesContainer);

var bigPicture = document.querySelector('.big-picture');

var currentCommentsList = bigPicture.querySelector('.social__comments');
var commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');

insertComments(currentCommentsList);

bigPicture.querySelector('.social__caption').textContent = photoList[getRandom(0, photoList.length - 1)].description;

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

var photoLoadingBtn = document.querySelector('#upload-file');
var changePhoto = document.querySelector('.img-upload__overlay');

photoLoadingBtn.addEventListener('change', function () {
  changePhoto.classList.remove('hidden');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      changePhoto.classList.add('hidden');
    }
  });
});

var changePhotoClose = document.querySelector('.img-upload__cancel');
changePhotoClose.addEventListener('click', function () {
  changePhoto.classList.add('hidden');
});

var photoPreview = document.querySelector('.img-upload__preview img');
var effects = document.querySelectorAll('.effects__preview');
var effectsFieldset = document.querySelector('.img-upload__effects');

effectsFieldset.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('effects__preview--none')) {
    photoPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  } else if (evt.target.classList.contains('effects__preview--chrome')) {
    photoPreview.classList.remove('effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    photoPreview.classList.add('effects__preview--chrome');
  } else if (evt.target.classList.contains('effects__preview--sepia')) {
    photoPreview.classList.remove('effects__preview--chrome', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    photoPreview.classList.add('effects__preview--sepia');
  } else if (evt.target.classList.contains('effects__preview--marvin')) {
    photoPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--phobos', 'effects__preview--heat');
    photoPreview.classList.add('effects__preview--marvin');
  } else if (evt.target.classList.contains('effects__preview--phobos')) {
    photoPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--heat');
    photoPreview.classList.add('effects__preview--phobos');
  } else if (evt.target.classList.contains('effects__preview--heat')) {
    photoPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos');
    photoPreview.classList.add('effects__preview--heat');
  }
});

var imagesContainer = document.querySelector('.pictures:not(.img-upload)');
imagesContainer.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('img-upload__input')) {
    return;
  }

  console.log(evt.target.classList);

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = evt.target.getAttribute('src');
  bigPicture.querySelector('.likes-count').textContent = photoList[parseInt(evt.target.getAttribute('src').substr(7), 10) - 1].likes; // 7 - позиция в адресе, с которой начинается нумерация фото
  bigPicture.querySelector('.comments-count').textContent = photoList[parseInt(evt.target.getAttribute('src').substr(7), 10)].comments.length; // отнимаем 1, т.к. нумерация фото с единицы, а массив объектов начинается с 0
});

var bigPictureCancel = document.querySelector('.big-picture__cancel');
bigPictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});
