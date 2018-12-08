'use strict';

(function () {
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
    @function
    @param {array} commentsArray - исходный массив, включающий в себя все доступные комментарии
    @return {array} commentsList - сгениророванный функцией массив, содеражщий 1 или 2 случайных комментария
  */
  function generateComments(commentsArray) {
    var commentsList = [];
    var commentsAmount = window.tools.getRandom(1, 2);

    do {
      commentsList.push(commentsArray[window.tools.getRandom(0, commentsArray.length - 1)]);
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
    return descriptionArray[window.tools.getRandom(0, descriptionArray.length - 1)];
  }

  /**
    *генерирует случайное количество лайков для фотографии в отрезке [15 200]
    @function
    @return {number} - случайное число из указанного диапазона
  */
  function getLikesAmount() {
    return window.tools.getRandom(15, 200);
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
      description: generateDescription(description),
      id: ordinal
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

  window.photoList = generateObjectsArray(OBJECTS_QUANTITY);
})();
