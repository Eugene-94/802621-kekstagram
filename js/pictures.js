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
bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img img').src = photoList[0].url;
bigPicture.querySelector('.likes-count').textContent = photoList[0].likes;
bigPicture.querySelector('.comments-count').textContent = photoList[0].comments.length;

var currentCommentsList = bigPicture.querySelector('.social__comments');
var commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');

insertComments(currentCommentsList);

bigPicture.querySelector('.social__caption').textContent = photoList[0].description;

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
