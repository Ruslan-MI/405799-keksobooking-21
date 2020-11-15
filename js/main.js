"use strict";

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
  window.util.removeDisabledForChildren(mapFilters);
  window.filter.saveAds(data);
  window.pin.render(window.filter.start());
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

const getPageSwitchOn = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  window.util.removeDisabledForChildren(adForm);
  window.form.getMainPinCoordinates();
  window.backend.load(onSuccess, onError);
  window.form.startValidation();
  mapPinMain.removeEventListener(`mousedown`, onMainPinClick);
  mapPinMain.removeEventListener(`keydown`, onMainPinKeydown);
};

const onMainPinClick = (evt) => {
  if (window.util.isMainButtonPressed(evt)) {
    getPageSwitchOn();
  }
};

const onMainPinKeydown = (evt) => {
  if (window.util.isEnterPressed(evt)) {
    getPageSwitchOn();
  }
};

const getPageSwitchOff = () => {
  map.classList.add(`map--faded`);
  adForm.reset();
  mapFilters.reset();
  adForm.classList.add(`ad-form--disabled`);
  window.util.addDisabledForChildren(adForm);
  window.util.addDisabledForChildren(mapFilters);
  window.move.setDefaultOffsets(mapPinMain);
  window.form.getMainPinCoordinates();
  window.pin.remove();
  window.card.remove();
  adFormHeaderImg.src = defaultHeaderImg;
  window.util.removeElement(adFormPhoto.querySelector(`img`));
  mapPinMain.addEventListener(`mousedown`, onMainPinClick);
  mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
};

window.util.addDisabledForChildren(adForm);
window.util.addDisabledForChildren(mapFilters);
window.form.getMainPinCoordinates();
window.move.getDefaultOffsets(mapPinMain);
window.move.start(mapPinMain, window.form.getMainPinCoordinates);

mapPinMain.addEventListener(`mousedown`, onMainPinClick);
mapPinMain.addEventListener(`keydown`, onMainPinKeydown);

const onSubmit = (evt) => {
  window.backend.save(new FormData(adForm), () => {
    getPageSwitchOff();
    window.modal.addSuccess();
  }, window.modal.addError);
  evt.preventDefault();
};

adForm.addEventListener(`submit`, onSubmit);

adFormReset.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  adForm.reset();
  mapFilters.reset();
  getPageSwitchOff();
});

const onFilterChange = window.optimize.debounce(() => {
  window.card.remove();
  window.pin.remove();
  window.pin.render(window.filter.start());
});

mapFilters.addEventListener(`change`, onFilterChange);

window.preview.start(adFormHeaderInput, adFormHeaderPreview);
window.preview.start(adFormInput, adFormPhoto);
