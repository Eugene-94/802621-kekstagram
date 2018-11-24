'use strict';

/**
  *Возвращает целое случайное число в диапазоне [min max]
  @param {number} min - Нижний предел диапазона
  @param {number} max - Верхний предел диапазона
  @return {number} - Сгенерированное целое число
*/
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
  *генерирует массив с одним или двумя комментариями
  @param {array} commentsArray - исходный массив, включающий в себя все доступные комментарии
  @return {array} commentsList - сгениророванный функцией массив, содеражщий 1 или 2 случайных комментария
*/
function generateComments(commentsArray) { // генерирует массив с комментариями
  var commentsList = [];
  var commentsAmount = getRandom(1, 2);

  do {
    commentsList.push(commentsArray[getRandom(0, commentsArray.length - 1)]);
  } while (commentsList.length === commentsAmount);

  return commentsList;
}

/**
  *генерирует строку, содержащую описание фото
  @param {array} descriptionArray - исходный массив, включающий в себя все доступные варианты описаний
  @return {string} - случайно выбранная строка из переданного массива
*/
function generateDescription(descriptionArray) {
  return descriptionArray[getRandom(0, descriptionArray.length - 1)];
}

/**
  *генерирует случайное количество лайков для фотографии в отрезке [15 200]
  @return {number} - случайное число из указанного диапазона
*/
function getLikesAmount() {
  return getRandom(15, 200);
}

/**
  *создает объект фотокарточки
  @param {number} ordinal - параметр, определяющий адрес изображения
  @return {object} - сгениророванный объект
*/
function getObject(ordinal) { // создаем объект
  var post = {
    url: 'photos/' + ordinal + '.jpg',
    likes: getLikesAmount(),
    comments: generateComments(comments),
    description: generateDescription(description)
  };

  return post;
}

/**
  *генерирует массив объектов
  @param {number} objectsAmount - параметр, определяющий количество создаваемых объектов
  @return {array} objectsList - сгениророванный массив объектов
*/
function generateObjectsArray(objectsAmount) { // генерируем массив объектов
  var objectsList = [];

  for (var i = 1; i <= objectsAmount; i++) {
    var objectItem = getObject(i);
    objectsList.push(objectItem);
  }

  return objectsList;
}

var photoList = generateObjectsArray(OBJECTS_QUANTITY);

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture'); // получаем доступ к шаблону
var picturesContainer = document.querySelector('.pictures'); // здесь будут размещаться фото пользователей

for (var j = 0; j < photoList.length; j++) { // через цикл наполняем разметку миниатюрами изображений
  var photoItem = photoTemplate.cloneNode(true); // копируем шаблон разметки
  photoItem.querySelector('.picture__img').src = photoList[j].url; // прописываем адрес изображения
  photoItem.querySelector('.picture__comments').textContent = photoList[j].comments.length; // прописываем количество комментариев
  photoItem.querySelector('.picture__likes').textContent = photoList[j].likes; // и количество лайков

  picturesContainer.appendChild(photoItem); // затем добавляем картинки в .pictures
}

var bigPicture = document.querySelector('.big-picture'); // доступ к полноэкранному фото
bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img img').src = photoList[0].url;
bigPicture.querySelector('.likes-count').textContent = photoList[0].likes;
bigPicture.querySelector('.comments-count').textContent = photoList[0].comments.length;

var photoComments = bigPicture.querySelectorAll('.social__comment'); // наполняем фото комментариямиы
var currentCommentsList = bigPicture.querySelector('.social__comments');
var commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');

for (j = 0; i < photoComments.length; i++) {
  currentCommentsList.removeChild(photoComments[i]);
}

while (currentCommentsList.lastChild) { // удаляем существующие комментарии перед вставкой новых
  currentCommentsList.removeChild(currentCommentsList.lastChild);
}

for (var i = 0; i < photoList[0].comments.length; i++) {
  var commentItem = commentTemplate.cloneNode(true);
  commentItem.querySelector('.social__picture').src = 'img/avatar-' + getRandom(1, 6) + '.svg';
  commentItem.querySelector('.social__text').textContent = photoList[0].comments[i];

  currentCommentsList.appendChild(commentItem);
}

bigPicture.querySelector('.social__caption').textContent = photoList[0].description; // добавляем описание фото

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
