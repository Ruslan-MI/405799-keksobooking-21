"use strict";

const adForm = document.querySelector(`.ad-form`);
const roomNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);
const addressInput = adForm.querySelector(`#address`);
const type = adForm.querySelector(`#type`);
const price = adForm.querySelector(`#price`);
const timein = adForm.querySelector(`#timein`);
const timeout = adForm.querySelector(`#timeout`);
const map = document.querySelector(`.map`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const priceTypeMap = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const halfMainPinWidth = window.const.MainPinSize.WIDTH / 2;
const halfMainPinHeight = window.const.MainPinSize.HEIGHT / 2;

const getMainPinCoordinates = () => {
  let mainPinHeightCorrection = halfMainPinHeight;
  if (!map.classList.contains(`map--faded`)) {
    mainPinHeightCorrection = window.const.MainPinSize.HEIGHT + window.const.MainPinSize.SPIKE_HEIGHT;
  }
  addressInput.value = Math.floor(mapPinMain.offsetLeft + halfMainPinWidth) + `, ` + Math.floor(mapPinMain.offsetTop + mainPinHeightCorrection);
  return {
    x: halfMainPinWidth,
    y: mainPinHeightCorrection
  };
};

const getValidCapacity = () => {
  if (roomNumber.value === window.const.PalaceProperty.ROOM_NUMBER) {
    capacity.value = window.const.PalaceProperty.CAPACITY;
  } else if (roomNumber.value !== window.const.PalaceProperty.ROOM_NUMBER && capacity.value === window.const.PalaceProperty.CAPACITY) {
    capacity.value = roomNumber.value;
  } else if (roomNumber.value < capacity.value) {
    capacity.value = roomNumber.value;
  }
};

const getValidRoomNumber = () => {
  if (capacity.value === window.const.PalaceProperty.CAPACITY) {
    roomNumber.value = window.const.PalaceProperty.ROOM_NUMBER;
  } else if (capacity.value !== window.const.PalaceProperty.CAPACITY && roomNumber.value === window.const.PalaceProperty.ROOM_NUMBER) {
    roomNumber.value = capacity.value;
  } else if (capacity.value > roomNumber.value) {
    roomNumber.value = capacity.value;
  }
};

roomNumber.addEventListener(`change`, () => {
  getValidCapacity();
});

capacity.addEventListener(`change`, () => {
  getValidRoomNumber();
});

const getValidPrice = () => {
  price.placeholder = priceTypeMap[type.value];
  price.min = priceTypeMap[type.value];
};

type.addEventListener(`change`, () => {
  getValidPrice();
});

const getValidTimeout = () => {
  timeout.value = timein.value;
};

const getValidTimein = () => {
  timein.value = timeout.value;
};

timein.addEventListener(`change`, () => {
  getValidTimeout();
});

timeout.addEventListener(`change`, () => {
  getValidTimein();
});

const startValidation = () => {
  getValidCapacity();
  getValidPrice();
  getValidTimeout();
};

window.form = {
  getMainPinCoordinates,
  startValidation
};
