"use strict";

const {
  addDisabledForChildren, removeDisabledForChildren, isEnterPressed,
  isMainButtonPressed
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
const {
  getPreview
} = window.preview;

const map = document.querySelector(`.map`);
const mapFilters = map.querySelector(`.map__filters`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const adFormReset = adForm.querySelector(`.ad-form__reset`);
const adFormHeaderInput = adForm.querySelector(`.ad-form-header__input`);
const adFormHeaderPreview = adForm.querySelector(`.ad-form-header__preview`);
const adFormHeaderImg = adFormHeaderPreview.querySelector(`img`);
const adFormInput = adForm.querySelector(`.ad-form__input`);
const adFormPhoto = adForm.querySelector(`.ad-form__photo`);

const defaultHeaderImg = adFormHeaderImg.src;

const onSuccess = (data) => {
  removeDisabledForChildren(mapFilters);
  saveAds(data);
  renderPins(getFilter());
};

const onError = (errorMessage) => {
  const node = document.createElement(`div`);

  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const pageSwitchOn = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  removeDisabledForChildren(adForm);
  getMainPinCoordinates();
  load(onSuccess, onError);
  getStartValidation();
  mapPinMain.removeEventListener(`mousedown`, onMainPinClick);
  mapPinMain.removeEventListener(`keydown`, onMainPinKeydown);
};

const onMainPinClick = (evt) => {
  if (isMainButtonPressed(evt)) {
    pageSwitchOn();
  }
};

const onMainPinKeydown = (evt) => {
  if (isEnterPressed(evt)) {
    pageSwitchOn();
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
  adFormHeaderImg.src = defaultHeaderImg;
  adFormPhoto.querySelector(`img`).remove();
  mapPinMain.addEventListener(`mousedown`, onMainPinClick);
  mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
};

addDisabledForChildren(adForm);
addDisabledForChildren(mapFilters);
getMainPinCoordinates();
getDefaultOffsets(mapPinMain);
getMove(mapPinMain, getMainPinCoordinates);

mapPinMain.addEventListener(`mousedown`, onMainPinClick);
mapPinMain.addEventListener(`keydown`, onMainPinKeydown);

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

getPreview(adFormHeaderInput, adFormHeaderPreview);
getPreview(adFormInput, adFormPhoto);
