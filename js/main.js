"use strict";

(() => {
  const {
    addDisabledForChildren, removeDisabledForChildren
  } = window.util;
  const {
    renderPins
  } = window.pin;
  const {
    getMainPinCoordinates, getStartValidation
  } = window.form;
  const {
    load
  } = window.backend;
  const {
    getMove
  } = window.move;

  const map = document.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`);
  const mapPinMain = map.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);

  const successHandler = (data) => {
    renderPins(data);
  };

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const onMainPinClick = (evt) => {
    if (evt.button === 0 || evt.key === `Enter`) {
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
      removeDisabledForChildren(adForm);
      removeDisabledForChildren(mapFilters);
      getMainPinCoordinates();
      load(successHandler, errorHandler);
      getStartValidation();
      mapPinMain.removeEventListener(`mousedown`, onMainPinClick);
      mapPinMain.removeEventListener(`keydown`, onMainPinClick);
    }
  };

  addDisabledForChildren(adForm);
  addDisabledForChildren(mapFilters);
  getMainPinCoordinates();
  getMove(mapPinMain, getMainPinCoordinates);

  mapPinMain.addEventListener(`mousedown`, onMainPinClick);
  mapPinMain.addEventListener(`keydown`, onMainPinClick);
})();
