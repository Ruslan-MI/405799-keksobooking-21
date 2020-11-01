"use strict";

(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_SPIKE_HEIGHT = 16;

  const {
    map, renderCard, removeCard
  } = window.card;

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = map.querySelector(`.map__pins`);

  const createPin = (data) => {
    const newPin = pinTemplate.cloneNode(true);
    newPin.style.left = data.location.x - PIN_WIDTH / 2 + `px`;
    newPin.style.top = data.location.y - PIN_HEIGHT + `px`;
    newPin.children[0].src = data.author.avatar;
    newPin.children[0].alt = data.offer.title;

    newPin.addEventListener(`click`, () => {
      renderCard(data);
      const popupClose = map.querySelector(`.popup__close`);
      popupClose.focus();
      popupClose.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Tab`) {
          evt.preventDefault();
          newPin.focus();
        }
      });
      popupClose.addEventListener(`click`, () => {
        removeCard();
        newPin.focus();
      });
    });

    return newPin;
  };

  const renderPins = (data) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < data.length; i++) {
      fragment.appendChild(createPin(data[i]));
    }
    mapPins.appendChild(fragment);
  };

  const getMainPinCoordinates = (pin, destinationInput) => {
    let totalPinHeight = MAIN_PIN_HEIGHT;
    if (!map.classList.contains(`map--faded`)) {
      totalPinHeight = MAIN_PIN_HEIGHT + MAIN_PIN_SPIKE_HEIGHT;
    }
    destinationInput.value = Math.round(pin.offsetLeft + MAIN_PIN_WIDTH / 2) + `, ` + Math.round(pin.offsetTop + totalPinHeight);
  };

  window.pin = {
    renderPins, getMainPinCoordinates
  };
})();
