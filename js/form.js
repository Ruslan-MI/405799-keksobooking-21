"use strict";

(() => {
  const {
    MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, MAIN_PIN_SPIKE_HEIGHT
  } = window.const;

  const adForm = document.querySelector(`.ad-form`);
  const roomNumber = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);
  const addressInput = adForm.querySelector(`#address`);
  const type = adForm.querySelector(`#type`);
  const price = adForm.querySelector(`#price`);
  const timein = adForm.querySelector(`#timein`);
  const timeout = adForm.querySelector(`#timeout`);

  const getMainPinCoordinates = (pin) => {
    let totalPinHeight = MAIN_PIN_HEIGHT;
    if (!document.querySelector(`.map`).classList.contains(`map--faded`)) {
      totalPinHeight = MAIN_PIN_HEIGHT + MAIN_PIN_SPIKE_HEIGHT;
    }
    addressInput.value = Math.round(pin.offsetLeft + MAIN_PIN_WIDTH / 2) + `, ` + Math.round(pin.offsetTop + totalPinHeight);
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

  const typePrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const getValidPrice = () => {
    price.placeholder = typePrice[type.value];
    price.min = typePrice[type.value];
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
})();
