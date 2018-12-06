'use strict';

var OBJECTS_QUANTITY = 25;
var INITIAL_FILTER_VALUE = 100;
var MAX_HASHTAG_LENGTH = 20;
var MAX_HASHTAGS_AMOUNT = 5;

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
  *отбирает уникальные элементы массива
  @function
  @param {array} array - исходный массив
  @return {array} uniqueElements - новый массив, содержащий только неповторяющиеся элементы
*/
function uniqueItems(array) {
  var uniqueElements = [];
  array.forEach(function () {
    uniqueElements = array.filter(function (value, index) {
      return array.indexOf(value, index + 1) === -1;
    });
  });

  return uniqueElements;
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

/**
  *генерирует набор фото миниатюр
  @function
  @param {object} destinationContainer - адрес размещения изображений
*/
function insertPhotoMiniatures(destinationContainer) {
  for (var j = 0; j < photoList.length; j++) {
    var photoItem = photoTemplate.cloneNode(true);
    photoItem.querySelector('.picture__img').src = photoList[j].url;
    photoItem.querySelector('.picture__img').id = photoList[j].id;
    photoItem.querySelector('.picture__comments').textContent = photoList[j].comments.length;
    photoItem.querySelector('.picture__likes').textContent = photoList[j].likes;

    destinationContainer.appendChild(photoItem);
  }
}

/**
  *генерирует набор комментариев для полноразмерного фото
  @function
  @param {number} ordinal - индекс массива, из которого берется информация
*/
function insertComments(ordinal) {
  currentCommentsList.innerHTML = '';

  for (var i = 0; i < photoList[ordinal].comments.length; i++) {
    var commentItem = commentTemplate.cloneNode(true);
    commentItem.querySelector('.social__picture').src = 'img/avatar-' + getRandom(1, 6) + '.svg';
    commentItem.querySelector('.social__text').textContent = photoList[ordinal].comments[i];

    currentCommentsList.appendChild(commentItem);
  }
}

var uploadSection = document.querySelector('.img-upload');
var bigPicture = document.querySelector('.big-picture');

/**
  *отвечает за смену фильтров для загруженного изображения
  @function
  @param {object} evt - объект event
*/
var changeFilter = function (evt) {
  var target = evt.target;
  if (evt.target.parentNode.classList.contains('effects__label')) {
    var currentFilter = target.parentNode.getAttribute('for');
    switch (currentFilter) {
      case 'effect-none':
        photoPreview.removeAttribute('class');
        document.querySelector('.img-upload__effect-level').classList.add('hidden');
        break;
      case 'effect-chrome':
        photoPreview.removeAttribute('class');
        photoPreview.removeAttribute('style');
        photoPreview.classList.add('effects__preview--chrome');
        document.querySelector('.img-upload__effect-level').classList.remove('hidden');
        break;
      case 'effect-sepia':
        photoPreview.removeAttribute('class');
        photoPreview.removeAttribute('style');
        photoPreview.classList.add('effects__preview--sepia');
        document.querySelector('.img-upload__effect-level').classList.remove('hidden');
        break;
      case 'effect-marvin':
        photoPreview.removeAttribute('class');
        photoPreview.removeAttribute('style');
        photoPreview.classList.add('effects__preview--marvin');
        document.querySelector('.img-upload__effect-level').classList.remove('hidden');
        break;
      case 'effect-phobos':
        photoPreview.removeAttribute('class');
        photoPreview.removeAttribute('style');
        photoPreview.classList.add('effects__preview--phobos');
        document.querySelector('.img-upload__effect-level').classList.remove('hidden');
        break;
      case 'effect-heat':
        photoPreview.removeAttribute('class');
        photoPreview.removeAttribute('style');
        photoPreview.classList.add('effects__preview--heat');
        document.querySelector('.img-upload__effect-level').classList.remove('hidden');
        break;
    }

    uploadSection.querySelector('.effect-level__value').setAttribute('value', INITIAL_FILTER_VALUE);

    document.querySelector('.effect-level__pin').style.left = INITIAL_FILTER_VALUE + '%';
    document.querySelector('.effect-level__depth').style.width = INITIAL_FILTER_VALUE + '%';
  }
};

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
    bigPicture.querySelector('.likes-count').textContent = photoList[target.id - 1].likes;
    bigPicture.querySelector('.comments-count').textContent = photoList[target.id - 1].comments.length;

    insertComments(target.id - 1);
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
    bigPicture.querySelector('.likes-count').textContent = photoList[target.childNodes[1].id - 1].likes;
    bigPicture.querySelector('.comments-count').textContent = photoList[target.childNodes[1].id - 1].comments.length;

    insertComments(target.childNodes[1].id - 1);
  }

  if (evt.code === 'Escape') {
    bigPicture.classList.add('hidden');
  }
};

/**
  *отвечает за открытие окна наложения фильтра
  @function
*/
var imageEditorHandler = function () {
  changePhoto.classList.remove('hidden');
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
};

/**
  *отвечает за закрытие окна наложения фильтра по клику на кнопку закрытия
  @function
*/
var closeImageEditor = function () {
  changePhoto.classList.add('hidden');
};

/**
  *отвечает за закрытие окна фильтров при навигации с клавиатуры
  @function
  @param {object} evt - объект event
*/
var closeEscImageEditor = function (evt) {
  if (evt.code === 'Escape') {
    changePhoto.classList.add('hidden');
  }
};

/**
  *отвечает за закрытие окна наложения фильтра по клику на оверлей
  @function
  @param {object} evt - объект event
*/
var closeImageEditorOverlay = function (evt) {
  if (evt.target.className === 'img-upload__overlay' || evt.target.className === 'img-upload__cancel') {
    changePhoto.classList.add('hidden');
  }
};

/**
  *производит валидацию формы отправки изображения
  @function
*/
var hashtagInputValidation = function () {
  var hashtagsList = hashtagInput.value.toLowerCase().split(' ');

  if ((hashtagsList.length === 1) && (hashtagsList[0].lastIndexOf('#') !== 0)) {
    hashtagInput.setCustomValidity('Хэш-теги указываются через пробел');
  }

  if (hashtagsList.length > MAX_HASHTAGS_AMOUNT) {
    hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  }

  hashtagsList.forEach(function (value, index) {
    if (hashtagsList[index][0] !== '#') {
      submitBtn.setCustomValidity('Хэш-тег начинается с символа #');
    } else if (hashtagsList[index].length === 1) {
      submitBtn.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
    } else if (hashtagsList[index].length > MAX_HASHTAG_LENGTH) {
      submitBtn.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    } else {
      submitBtn.setCustomValidity('');
    }
  });

  var uniqueElements = uniqueItems(hashtagsList);
  if (uniqueElements.length !== hashtagsList.length) {
    submitBtn.setCustomValidity('Хэш-теги не могут повторяться');
  }
};

/**
  *отменяет закрытие окна фильтров по нажатию esc при фокусе на инпуте
  @function
*/
var escOff = function () {
  document.removeEventListener('keydown', closeEscImageEditor);
};

/**
  *возвращает закрытие окна фильтров по нажатию esc при окончании фокуса на инпуте
  @function
*/
var escOn = function () {
  document.addEventListener('keydown', closeEscImageEditor);
};

/**
  *осуществляет работу с фильтрами при помощи мыши
  @function
  @param {object} evt - объект события
*/
var dragAndDrop = function (evt) {
  var effectLineWidth = evt.target.parentNode.offsetWidth;

  var intitalCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var mouseMoving = function (moveEvt) {
    effectPin.ondragstart = function () {
      return false;
    };

    var coordsShifting = {
      x: intitalCoords.x - moveEvt.clientX,
      y: intitalCoords.y
    };

    intitalCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (effectPin.offsetLeft <= 0) {
      effectPin.style.left = 0;
    }

    if (effectPin.offsetLeft >= effectLineWidth) {
      effectPin.style.left = 100 + '%';
    }

    effectPin.style.left = (effectPin.offsetLeft - coordsShifting.x) + 'px';
    var percentLevel = Math.round((effectPin.offsetLeft) / effectLineWidth * 100);
    uploadSection.querySelector('.effect-level__value').value = percentLevel;
    effectDepth.style.width = percentLevel + '%';

    var chromeSepiaLevel = percentLevel / 100;
    var blurLevel = 5 * percentLevel / 100;
    var brightnessLevel = 3 * percentLevel / 100;
    var currentFilter = document.querySelector('.img-upload__preview img').getAttribute('class');

    if (currentFilter === 'effects__preview--chrome') {
      document.querySelector('.img-upload__preview img').setAttribute('style', 'filter: grayscale(' + chromeSepiaLevel + ');');
    } else if (currentFilter === 'effects__preview--sepia') {
      document.querySelector('.img-upload__preview img').setAttribute('style', 'filter: sepia(' + chromeSepiaLevel + ');');
    } else if (currentFilter === 'effects__preview--marvin') {
      document.querySelector('.img-upload__preview img').setAttribute('style', 'filter: invert(' + percentLevel + '%);');
    } else if (currentFilter === 'effects__preview--phobos') {
      document.querySelector('.img-upload__preview img').setAttribute('style', 'filter: blur(' + blurLevel + 'px);');
    } else if (currentFilter === 'effects__preview--heat') {
      document.querySelector('.img-upload__preview img').setAttribute('style', 'filter: brightness(' + brightnessLevel + ');');
    }
  };

  var mouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', mouseMoving);
    document.removeEventListener('mouseup', mouseUp);
  };

  document.addEventListener('mousemove', mouseMoving);
  document.addEventListener('mouseup', mouseUp);
};

var photoList = generateObjectsArray(OBJECTS_QUANTITY);

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');

insertPhotoMiniatures(picturesContainer);

var currentCommentsList = bigPicture.querySelector('.social__comments');
var commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');

bigPicture.querySelector('.social__caption').textContent = photoList[getRandom(0, photoList.length - 1)].description;
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

var photoLoadingBtn = document.querySelector('#upload-file');
var changePhoto = document.querySelector('.img-upload__overlay');

photoLoadingBtn.addEventListener('change', imageEditorHandler);

var changePhotoClose = document.querySelector('.img-upload__cancel.cancel');

var photoPreview = document.querySelector('.img-upload__preview img');
var effectsFieldset = document.querySelector('.img-upload__effects');

effectsFieldset.addEventListener('click', changeFilter);

changePhotoClose.addEventListener('click', closeImageEditor);
changePhoto.addEventListener('click', closeImageEditorOverlay);
document.addEventListener('keydown', closeEscImageEditor);

var imagesContainer = document.querySelector('.pictures');
imagesContainer.addEventListener('click', openImageClick);

var bigPictureCancel = document.querySelector('.big-picture__cancel');

bigPictureCancel.addEventListener('click', closeImageClick);
bigPicture.addEventListener('click', closeImageOverlayClick);

imagesContainer.addEventListener('keydown', imageHandlerKeydown);

var hashtagInput = uploadSection.querySelector('.text__hashtags');
var submitBtn = uploadSection.querySelector('.img-upload__submit');

submitBtn.addEventListener('click', hashtagInputValidation);
hashtagInput.addEventListener('focus', escOff);
hashtagInput.addEventListener('focusout', escOn);

var commentTextArea = uploadSection.querySelector('.text__description');
commentTextArea.addEventListener('focus', escOff);
commentTextArea.addEventListener('focusout', escOn);

var effectLine = document.querySelector('.effect-level__line');
var effectPin = effectLine.querySelector('.effect-level__pin');
var effectDepth = effectLine.querySelector('.effect-level__depth');

effectPin.addEventListener('mousedown', dragAndDrop);
