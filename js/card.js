"use strict";

(() => {
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

    return newCard;
  };

  const onCardEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      removeCard();
    }
  };

  const removeCard = () => {
    map.querySelector(`.map__card`).remove();
    document.removeEventListener(`keydown`, onCardEscPress);
  };

  const renderCard = (data) => {
    if (map.querySelector(`.map__card`)) {
      removeCard();
    }
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createCard(data));
    map.insertBefore(fragment, map.querySelector(`.map__filters-container`));
  };

  window.card = {
    map, renderCard, removeCard
  };
})();
