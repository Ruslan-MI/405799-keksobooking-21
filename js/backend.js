"use strict";

const xhrEvents = (method, URL, data, onLoad, onError) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === window.const.StatusCode.OK) {
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

  xhr.timeout = window.const.TIMEOUT_IN_MS;

  xhr.open(method, URL);
  xhr.send(data);
};

const load = (onLoad, onError) => {
  xhrEvents(`GET`, window.const.Url.DOWNLOAD, undefined, onLoad, onError);
};

const save = (data, onLoad, onError) => {
  xhrEvents(`POST`, window.const.Url.UPLOAD, data, onLoad, onError);
};

window.backend = {
  load,
  save
};
