"use strict";

(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_SPIKE_HEIGHT = 16;

  const STATUS_CODE = {
    OK: 200
  };

  const TIMEOUT_IN_MS = 10000;
  const URL_DOWNLOAD = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;

  const MIN_X_COORDS = 0;
  const MIN_Y_COORDS = 130;
  const MAX_Y_COORDS = 630;

  window.const = {
    PIN_WIDTH, PIN_HEIGHT, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, MAIN_PIN_SPIKE_HEIGHT,
    STATUS_CODE, TIMEOUT_IN_MS, URL_DOWNLOAD, URL_UPLOAD, MIN_X_COORDS,
    MIN_Y_COORDS, MAX_Y_COORDS
  };
})();
