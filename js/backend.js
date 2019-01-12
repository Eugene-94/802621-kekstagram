'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_LIMIT = 10000; // 10s
  var SUCCESS_CODE = 200;

  /**
    *производит ajax-запрос на сервер для скачивания данных
    @function
    @param {function} onSuccess - обрабатывает случай успешной загрузки
    @param {function} onError - обрабатывает случай неуспешной загрузки
  */
  window.downloading = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
        window.serverData = xhr.response;
        document.querySelector('.img-filters').classList.remove('img-filters--inactive');
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_LIMIT;

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  /**
    *производит ajax-запрос для отправки данных пользователя на сервер
    @function
    @param {array} data - отправляемые данные
    @param {function} onSuccess - обрабатывает случай успешной загрузки
    @param {function} onError - обрабатывает случай неуспешной загрузки
  */
  window.uploading = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
        window.serverData = xhr.response;
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };
})();
