'use strict';

(function () {
  var INITIAL_FILTER_VALUE = 100;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS_AMOUNT = 5;

  var uploadSection = document.querySelector('.img-upload');

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
    if (hashtagInput.value === '') {
      return;
    }
    var hashtagsList = hashtagInput.value.toLowerCase().split(' ');

    if ((hashtagsList.length === 1) && (hashtagsList[0].lastIndexOf('#') !== 0) && (hashtagsList[0].lastIndexOf('#') !== -1)) {
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

    var uniqueElements = window.tools.uniqueItems(hashtagsList);
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
})();
