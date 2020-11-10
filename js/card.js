"use strict";

const {
  fillingCardElement, getCardCapacity, getCardTime, getCurrentFeatures, getCardPhotos
} = window.util;

const map = document.querySelector(`.map`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const typeCyrillic = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const createCard = (data) => {
  const newCard = cardTemplate.cloneNode(true);
  fillingCardElement(newCard.querySelector(`.popup__title`), data.offer.title);
  fillingCardElement(newCard.querySelector(`.popup__text--address`), data.offer.address);
  fillingCardElement(newCard.querySelector(`.popup__text--price`), data.offer.price);
  fillingCardElement(newCard.querySelector(`.popup__type`), typeCyrillic[data.offer.type]);
  getCardCapacity(newCard.querySelector(`.popup__text--capacity`), data.offer.rooms, data.offer.guests);
  getCardTime(newCard.querySelector(`.popup__text--time`), data.offer.checkin, data.offer.checkout);
  getCurrentFeatures(newCard.querySelector(`.popup__features`), data.offer.features);
  fillingCardElement(newCard.querySelector(`.popup__description`), data.offer.description);
  getCardPhotos(newCard.querySelector(`.popup__photos`), data.offer.photos);
  fillingCardElement(newCard.querySelector(`.popup__avatar`), data.author.avatar);

  document.addEventListener(`keydown`, onCardEscPress);

  newCard.querySelector(`.popup__close`).addEventListener(`click`, () => {
    removeCard();
    map.querySelector(`.map__pin--active`).focus();
  });

  return newCard;
};

const onCardEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    removeCard();
    map.querySelector(`.map__pin--active`).focus();
  }
};

const removeCard = () => {
  if (map.querySelector(`.map__card`)) {
    map.querySelector(`.map__card`).remove();
    document.removeEventListener(`keydown`, onCardEscPress);
  }
};

const renderCard = (data) => {
  removeCard();
  map.insertBefore(createCard(data), map.querySelector(`.map__filters-container`));
  map.querySelector(`.popup__close`).focus();
  map.querySelector(`.popup__close`).addEventListener(`keydown`, (evt) => {
    if (evt.key === `Tab`) {
      evt.preventDefault();
      map.querySelector(`.map__pin--active`).focus();
    }
  });
};

window.card = {
  renderCard, removeCard
};
