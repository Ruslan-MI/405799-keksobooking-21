"use strict";

(() => {
  const {
    getPriceForType
  } = window.util;

  const adForm = document.querySelector(`.ad-form`);
  const roomNumber = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);
  const addressInput = adForm.querySelector(`#address`);
  const type = adForm.querySelector(`#type`);
  const price = adForm.querySelector(`#price`);
  const timein = adForm.querySelector(`#timein`);
  const timeout = adForm.querySelector(`#timeout`);

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
    price.placeholder = getPriceForType(type.value);
    price.min = getPriceForType(type.value);
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
    adForm, addressInput, getStartValidation
  };
})();
