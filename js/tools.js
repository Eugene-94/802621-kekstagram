'use strict';

(function () {

  var NEW_IMAGES_AMOUNT = 10;

  window.tools = {
    /**
      *Возвращает целое случайное число в диапазоне [min max]
      @function
      @param {number} min - Нижний предел диапазона
      @param {number} max - Верхний предел диапазона
      @return {number} - Сгенерированное целое число
    */
    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
      *отбирает уникальные элементы массива
      @function
      @param {array} array - исходный массив
      @return {array} uniqueElements - новый массив, содержащий только неповторяющиеся элементы
    */
    uniqueItems: function (array) {
      var uniqueElements = [];
      array.forEach(function () {
        uniqueElements = array.filter(function (value, index) {
          return array.indexOf(value, index + 1) === -1;
        });
      });

      return uniqueElements;
    },

    /**
      *извлекает порядковый номер элемента из строки с url
      @function
      @param {string} string - исходная строка
      @return {number} num - извлеченное число
    */
    extractNum: function (string) {
      for (var i = 0; i < string.length; i++) {
        if (!isNaN(string[i])) {
          var num = parseInt(string.substring(i), 10);
          break;
        }
      }
      return num;
    },

    /**
      *осуществляет перемешивание массива
      @function
      @param {array} arr - исходная строка
      @return {array}
    */
    shuffle: function (arr) {
      for (var i = arr.length - 1; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr.slice(0, NEW_IMAGES_AMOUNT);
    }
  };
})();
