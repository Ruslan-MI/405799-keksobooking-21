"use strict";

const {
  fillingCardElement, getCardCapacity, getCardTime, getCurrentFeatures, getCardPhotos,
  isEscapePressed, isTabPressed
} = window.util;

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
  const mapPinActive = map.querySelector(`.map__pin--active`);

  fillingCardElement(newCard.querySelector(`.popup__title`), data.offer.title);
  fillingCardElement(newCard.querySelector(`.popup__text--address`), data.offer.address);
  fillingCardElement(newCard.querySelector(`.popup__text--price`), data.offer.price);
  fillingCardElement(newCard.querySelector(`.popup__type`), сyrillicTypeMap[data.offer.type]);
  getCardCapacity(newCard.querySelector(`.popup__text--capacity`), data.offer.rooms, data.offer.guests);
  getCardTime(newCard.querySelector(`.popup__text--time`), data.offer.checkin, data.offer.checkout);
  getCurrentFeatures(newCard.querySelector(`.popup__features`), data.offer.features);
  fillingCardElement(newCard.querySelector(`.popup__description`), data.offer.description);
  getCardPhotos(newCard.querySelector(`.popup__photos`), data.offer.photos);
  fillingCardElement(newCard.querySelector(`.popup__avatar`), data.author.avatar);

  document.addEventListener(`keydown`, onCardEscPress);

  popupClose.addEventListener(`click`, () => {
    removeCard();
    mapPinActive.focus();
  });

  popupClose.addEventListener(`keydown`, (evt) => {
    if (isTabPressed(evt)) {
      evt.preventDefault();
      mapPinActive.focus();
    }
  });

  return newCard;
};

const onCardEscPress = (evt) => {
  if (isEscapePressed(evt)) {
    evt.preventDefault();
    removeCard();
    map.querySelector(`.map__pin--active`).focus();
  }
};

const removeCard = () => {
  const mapCard = map.querySelector(`.map__card`);

  if (mapCard) {
    mapCard.remove();
    document.removeEventListener(`keydown`, onCardEscPress);
  }
};

const renderCard = (data) => {
  removeCard();
  map.insertBefore(createCard(data), mapFiltersContainer);
  map.querySelector(`.popup__close`).focus();
};

window.card = {
  renderCard, removeCard
};
