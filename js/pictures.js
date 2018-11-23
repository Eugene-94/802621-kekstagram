'use strict';

function getRandom(min, max) { // Используем готовую функцию для генерации случайного числа в пределах [min max]
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

function generateComments(commentsArray) { // генерирует массив с комментариями
  var commentsList = [];
  var commentsAmount = getRandom(1, 2);

  do {
    commentsList.push(commentsArray[getRandom(0, commentsArray.length - 1)]);
  } while (commentsList.length === commentsAmount);

  return commentsList;
}

function generateDescription(descriptionArray) { // генерируем случайное описание для фото
  return description[getRandom(0, descriptionArray.length - 1)];
}

function getLikesAmount() { // генерируем случайное количество лайков
  return getRandom(15, 200);
}

function getObject(ordinal) { // создаем объект
  var post = {
    url: 'photos/' + ordinal + '.jpg',
    likes: getLikesAmount(),
    comments: generateComments(comments),
    description: generateDescription(description)
  };

  return post;
}

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
for (var i = 0; i < photoComments.length; i++) {
  photoComments[i].querySelector('.social__picture').src = 'img/avatar-' + getRandom(1, 6) + '.svg';
  photoComments[i].querySelector('.social__text').textContent = photoList[0].comments[i];
}

bigPicture.querySelector('.social__caption').textContent = photoList[0].description;

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');
