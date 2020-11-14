"use strict";

const debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, window.const.DEBOUNCE_INTERVAL);
  };
};

window.optimize = {
  debounce
};
