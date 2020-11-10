"use strict";

const {
  addDisabledForChildren, removeDisabledForChildren
} = window.util;
const {
  renderPins, removePins
} = window.pin;
const {
  getMainPinCoordinates, getStartValidation
} = window.form;
const {
  load, save
} = window.backend;
const {
  addSuccessModal, addErrorModal
} = window.modal;
const {
  getMove, getDefaultOffsets, setDefaultOffsets
} = window.move;
const {
  removeCard
} = window.card;
const {
  saveAds, getFilter
} = window.filter;
const {
  debounce
} = window.debounce;

const map = document.querySelector(`.map`);
const mapFilters = map.querySelector(`.map__filters`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const adFormReset = adForm.querySelector(`.ad-form__reset`);

const successHandler = (data) => {
  removeDisabledForChildren(mapFilters);
  saveAds(data);
  renderPins(getFilter());
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
    getMainPinCoordinates();
    load(successHandler, errorHandler);
    getStartValidation();
    mapPinMain.removeEventListener(`mousedown`, onMainPinClick);
    mapPinMain.removeEventListener(`keydown`, onMainPinClick);
  }
};

const pageSwitchOff = () => {
  map.classList.add(`map--faded`);
  adForm.reset();
  mapFilters.reset();
  adForm.classList.add(`ad-form--disabled`);
  addDisabledForChildren(adForm);
  addDisabledForChildren(mapFilters);
  setDefaultOffsets(mapPinMain);
  getMainPinCoordinates();
  removePins();
  removeCard();
  mapPinMain.addEventListener(`mousedown`, onMainPinClick);
  mapPinMain.addEventListener(`keydown`, onMainPinClick);
};

addDisabledForChildren(adForm);
addDisabledForChildren(mapFilters);
getMainPinCoordinates();
getDefaultOffsets(mapPinMain);
getMove(mapPinMain, getMainPinCoordinates);

mapPinMain.addEventListener(`mousedown`, onMainPinClick);
mapPinMain.addEventListener(`keydown`, onMainPinClick);

const onSubmit = (evt) => {
  save(new FormData(adForm), () => {
    pageSwitchOff();
    addSuccessModal();
  }, addErrorModal);
  evt.preventDefault();
};

adForm.addEventListener(`submit`, onSubmit);

adFormReset.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  adForm.reset();
  mapFilters.reset();
  pageSwitchOff();
});

const onFilterChange = debounce(() => {
  removeCard();
  removePins();
  renderPins(getFilter());
});

mapFilters.addEventListener(`change`, onFilterChange);
