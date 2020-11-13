"use strict";

const {
  PinSize
} = window.const;
const {
  renderCard
} = window.card;

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);

const createPin = (data) => {
  const newPin = pinTemplate.cloneNode(true);
  newPin.style.left = data.location.x - PinSize.WIDTH / 2 + `px`;
  newPin.style.top = data.location.y - PinSize.HEIGHT + `px`;
  newPin.children[0].src = data.author.avatar;
  newPin.children[0].alt = data.offer.title;

  newPin.addEventListener(`click`, () => {
    const mapPinActive = mapPins.querySelector(`.map__pin--active`);

    if (mapPinActive) {
      mapPinActive.classList.remove(`map__pin--active`);
    }
    newPin.classList.add(`map__pin--active`);
    renderCard(data);
  });

  return newPin;
};

const renderPins = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    fragment.appendChild(createPin(element));
  });

  mapPins.appendChild(fragment);
};

const removePins = () => {
  const pins = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  pins.forEach((pin) => {
    pin.remove();
  });
};

window.pin = {
  renderPins, removePins
};
