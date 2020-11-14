"use strict";

const TIMEOUT_IN_MS = 10000;
const MAX_PINS_QUANTITY = 5;
const DEBOUNCE_INTERVAL = 500;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70,
};

const MainPinSize = {
  WIDTH: 65,
  HEIGHT: 65,
  SPIKE_HEIGHT: 16
};

const StatusCode = {
  OK: 200
};

const Url = {
  DOWNLOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking`
};

const CoordsLimit = {
  MIN_X: 0,
  MIN_Y: 130,
  MAX_Y: 630
};

window.const = {
  PinSize, MainPinSize, StatusCode, TIMEOUT_IN_MS, Url,
  CoordsLimit, MAX_PINS_QUANTITY, DEBOUNCE_INTERVAL, FILE_TYPES
};
