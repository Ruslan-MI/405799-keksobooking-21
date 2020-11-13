"use strict";

const {
  MainPinSize
} = window.const;

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

const getMainPinCoordinates = () => {
  const halfPinWidth = MainPinSize.WIDTH / 2;
  let totalPinHeight = MainPinSize.HEIGHT / 2;

  if (!map.classList.contains(`map--faded`)) {
    totalPinHeight = MainPinSize.HEIGHT + MainPinSize.SPIKE_HEIGHT;
  }
  addressInput.value = Math.floor(mapPinMain.offsetLeft + halfPinWidth) + `, ` + Math.floor(mapPinMain.offsetTop + totalPinHeight);
  return {
    x: halfPinWidth,
    y: totalPinHeight
  };
};

const getValidCapacity = () => {
  if (roomNumber.value === `100`) {
    capacity.value = `0`;
  } else if (roomNumber.value !== `100` && capacity.value === `0`) {
    capacity.value = roomNumber.value;
  } else if (roomNumber.value < capacity.value) {
    capacity.value = roomNumber.value;
  }
};

const getValidRoomNumber = () => {
  if (capacity.value === `0`) {
    roomNumber.value = `100`;
  } else if (capacity.value !== `0` && roomNumber.value === `100`) {
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

const getStartValidation = () => {
  getValidCapacity();
  getValidPrice();
  getValidTimeout();
};

window.form = {
  getMainPinCoordinates, getStartValidation
};
