"use strict";

const map = document.querySelector(`.map`);
const mapFiltersContainer = map.querySelector(`.map__filters-container`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const сyrillicTypeMap = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const createCard = (data) => {
  const newCard = cardTemplate.cloneNode(true);
  const popupClose = newCard.querySelector(`.popup__close`);

  window.util.fillingCardElement(newCard.querySelector(`.popup__title`), data.offer.title);
  window.util.fillingCardElement(newCard.querySelector(`.popup__text--address`), data.offer.address);
  window.util.fillingCardElement(newCard.querySelector(`.popup__text--price`), data.offer.price);
  window.util.fillingCardElement(newCard.querySelector(`.popup__type`), сyrillicTypeMap[data.offer.type]);
  window.util.getCardCapacity(newCard.querySelector(`.popup__text--capacity`), data.offer.rooms, data.offer.guests);
  window.util.getCardTime(newCard.querySelector(`.popup__text--time`), data.offer.checkin, data.offer.checkout);
  window.util.getCurrentFeatures(newCard.querySelector(`.popup__features`), data.offer.features);
  window.util.fillingCardElement(newCard.querySelector(`.popup__description`), data.offer.description);
  window.util.getCardPhotos(newCard.querySelector(`.popup__photos`), data.offer.photos);
  window.util.fillingCardElement(newCard.querySelector(`.popup__avatar`), data.author.avatar);

  document.addEventListener(`keydown`, onCardEscPress);

  popupClose.addEventListener(`click`, () => {
    removeCard();
  });

  popupClose.addEventListener(`keydown`, (evt) => {
    if (window.util.isTabPressed(evt)) {
      evt.preventDefault();
      map.querySelector(`.map__pin--active`).focus();
    }
  });

  return newCard;
};

const onCardEscPress = (evt) => {
  if (window.util.isEscapePressed(evt)) {
    evt.preventDefault();
    removeCard();
  }
};

const removeCard = () => {
  const mapCard = map.querySelector(`.map__card`);
  const mapPinActive = map.querySelector(`.map__pin--active`);

  if (mapCard) {
    mapCard.remove();
    document.removeEventListener(`keydown`, onCardEscPress);
    mapPinActive.focus();
    mapPinActive.classList.remove(`map__pin--active`);
  }
};

const renderCard = (data) => {
  removeCard();
  map.insertBefore(createCard(data), mapFiltersContainer);
  map.querySelector(`.popup__close`).focus();
};

window.card = {
  render: renderCard,
  remove: removeCard
};
