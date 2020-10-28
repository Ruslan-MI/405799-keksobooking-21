"use strict";

(() => {
  const xhrEvents = (method, URL, data, onLoad, onError) => {
    const STATUS_CODE = {
      OK: 200
    };
    const TIMEOUT_IN_MS = 10000;

    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === STATUS_CODE.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, URL);
    xhr.send(data);
  };

  const load = (onLoad, onError) => {
    const URL = `https://21.javascript.pages.academy/keksobooking/data`;

    xhrEvents(`GET`, URL, undefined, onLoad, onError);
  };
  const save = (data, onLoad, onError) => {
    const URL = `https://21.javascript.pages.academy/keksobooking`;

    xhrEvents(`POST`, URL, data, onLoad, onError);
  };

  window.backend = {
    load, save
  };
})();
