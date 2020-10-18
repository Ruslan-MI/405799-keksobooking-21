"use strict";

(() => {
  const {
    addDisabledForChildren, removeDisabledForChildren
  } = window.util;
  const {
    getMocksArray
  } = window.data;
  const {
    renderPins, getMainPinCoordinates
  } = window.pin;
  const {
    adForm, addressInput, getValidCapacity
  } = window.form;

  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mapPinMain = map.querySelector(`.map__pin--main`);

  const mocksArray = getMocksArray(map);

  const onMainPinClick = (evt) => {
    if (evt.button === 0 || evt.key === `Enter`) {
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
      removeDisabledForChildren(adForm);
      removeDisabledForChildren(mapFilters);
      getMainPinCoordinates(map, mapPinMain, addressInput);
      renderPins(mocksArray, mapPins);
      getValidCapacity();
    }
  };

  addDisabledForChildren(adForm);
  addDisabledForChildren(mapFilters);
  getMainPinCoordinates(map, mapPinMain, addressInput);

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    onMainPinClick(evt);
  });
  mapPinMain.addEventListener(`keydown`, (evt) => {
    onMainPinClick(evt);
  });
})();
