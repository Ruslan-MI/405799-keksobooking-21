"use strict";

(() => {
  const {
    addDisabledForChildren, removeDisabledForChildren
  } = window.util;
  const {
    renderPins, getMainPinCoordinates
  } = window.pin;
  const {
    adForm, addressInput, getValidCapacity
  } = window.form;
  const {
    load
  } = window.backend;
  const {
    renderCards
  } = window.card;

  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mapPinMain = map.querySelector(`.map__pin--main`);

  const successHandler = (data) => {
    renderPins(data, mapPins);
    renderCards(data, map);
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
      getMainPinCoordinates(map, mapPinMain, addressInput);
      load(successHandler, errorHandler);
      getValidCapacity();
      mapPinMain.removeEventListener(`mousedown`, onMainPinClick);
      mapPinMain.removeEventListener(`keydown`, onMainPinClick);
    }
  };

  addDisabledForChildren(adForm);
  addDisabledForChildren(mapFilters);
  getMainPinCoordinates(map, mapPinMain, addressInput);

  mapPinMain.addEventListener(`mousedown`, onMainPinClick);
  mapPinMain.addEventListener(`keydown`, onMainPinClick);
})();
