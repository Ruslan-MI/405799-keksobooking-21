"use strict";

(() => {
  const {
    DEBOUNCE_INTERVAL
  } = window.const;

  const debounce = (cb) => {
    let lastTimeout = null;
    return (parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = {
    debounce
  };
})();
