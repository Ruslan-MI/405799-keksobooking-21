"use strict";

const {
  StatusCode, TIMEOUT_IN_MS, Url
} = window.const;

const xhrEvents = (method, URL, data, onLoad, onError) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
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
  xhrEvents(`GET`, Url.DOWNLOAD, undefined, onLoad, onError);
};

const save = (data, onLoad, onError) => {
  xhrEvents(`POST`, Url.UPLOAD, data, onLoad, onError);
};

window.backend = {
  load, save
};
